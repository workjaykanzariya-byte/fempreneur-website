import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import pool, { query } from '../config/db.js';

const router = express.Router();

// Helper to initialize Razorpay instance with dynamic env reload
const getRazorpayInstance = () => {
  dotenv.config({ override: true });
  const keyId = process.env.RAZORPAY_KEY_ID?.trim();
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

  if (!keyId || !keySecret) {
    throw new Error('Razorpay API Key ID or Secret is missing in backend/.env');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

/**
 * POST /api/payment/create-order
 * Request Body: { amount: number, receipt?: string, notes?: object, module?: string, recordId?: string|number }
 */
router.post('/create-order', async (req, res) => {
  try {
    const { amount, receipt, notes = {}, module = 'general', recordId = null } = req.body;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount is required.' });
    }

    const rzp = getRazorpayInstance();
    const isTestMode = process.env.RAZORPAY_TEST_MODE !== 'false';
    // In Test Mode, charge exactly ₹1 (100 paise) for testing payments while preserving real amount in notes
    const finalAmountInPaise = isTestMode ? 100 : Math.round(Number(amount) * 100);
    const orderReceipt = receipt || `rcpt_fem_${Date.now()}`;

    const orderOptions = {
      amount: finalAmountInPaise,
      currency: process.env.RAZORPAY_CURRENCY || 'INR',
      receipt: orderReceipt,
      notes: {
        ...notes,
        project: 'Fempreneur 2027',
        module,
        recordId: recordId ? String(recordId) : '',
        originalAmount: String(amount),
        isTestMode: isTestMode ? 'true' : 'false',
      },
    };

    const order = await rzp.orders.create(orderOptions);

    return res.status(201).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID?.trim(),
      currency: process.env.RAZORPAY_CURRENCY || 'INR',
      test_mode: isTestMode,
      charged_amount_inr: isTestMode ? 1 : Number(amount),
    });
  } catch (error) {
    console.error('[Razorpay Order Creation Failed]:', error);
    let errorDesc = error.error?.description || error.message || 'Failed to create Razorpay payment order.';
    if (error.statusCode === 401 || errorDesc.includes('Authentication failed')) {
      errorDesc = 'Razorpay Authentication Failed: Please check your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env.';
    }
    return res.status(500).json({
      success: false,
      message: errorDesc,
      raw_error: error.error || error.message,
    });
  }
});

/**
 * POST /api/payment/verify
 * Request Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, module, record_id }
 */
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      module,
      record_id,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing Razorpay verification parameters (order_id, payment_id, signature).' });
    }

    dotenv.config({ override: true });
    const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
    if (!secret) {
      return res.status(500).json({ success: false, message: 'Razorpay secret key not configured on server.' });
    }

    // Strict HMAC SHA-256 signature verification
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      console.warn('[Signature Mismatch]:', { generated_signature, received: razorpay_signature });
      return res.status(400).json({ success: false, message: 'Payment verification failed: Invalid Razorpay signature.' });
    }

    // Update database record only after verified signature
    if (record_id && module) {
      const recId = parseInt(record_id, 10) || record_id;

      try {
        switch (module) {
          case 'coffee-book':
          case 'book':
            try {
              await query(
                `UPDATE web_coffee_table_book_orders SET payment_status = 'paid', payment_ref = $1 WHERE id = $2`,
                [razorpay_payment_id, recId]
              );
            } catch (e) {
              await query(
                `UPDATE coffee_table_book_orders SET payment_status = 'paid', payment_ref = $1 WHERE id = $2`,
                [razorpay_payment_id, recId]
              ).catch(() => {});
            }
            break;

          case 'community':
          case 'membership':
            try {
              await query(
                `UPDATE web_community_applications SET payment_status = 'paid', payment_ref = $1 WHERE id = $2`,
                [razorpay_payment_id, recId]
              );
            } catch (e) {
              await query(
                `UPDATE community_applications SET payment_status = 'paid', payment_ref = $1 WHERE id = $2`,
                [razorpay_payment_id, recId]
              ).catch(() => {});
            }
            break;

          case 'events':
          case 'event':
            try {
              await query(
                `UPDATE web_event_registrations SET payment_status = 'paid', payment_ref = $1 WHERE id = $2`,
                [razorpay_payment_id, recId]
              );
            } catch (e) {
              await query(
                `UPDATE event_registrations SET payment_status = 'paid', payment_ref = $1 WHERE id = $2`,
                [razorpay_payment_id, recId]
              ).catch(() => {});
            }
            break;

          case 'sponsorships':
          case 'sponsorship':
            try {
              await query(
                `UPDATE web_sponsorships SET payment_received = 1, payment_ref = $1, status = 'confirmed' WHERE id = $2`,
                [razorpay_payment_id, recId]
              );
            } catch (e) {
              await query(
                `UPDATE sponsorships SET payment_received = 1, payment_ref = $1, status = 'confirmed' WHERE id = $2`,
                [razorpay_payment_id, recId]
              ).catch(() => {});
            }
            break;

          case 'nominations':
          case 'nomination':
            try {
              await query(
                `UPDATE web_nominations SET payment_status = 'paid', payment_ref = $1 WHERE id = $2`,
                [razorpay_payment_id, recId]
              );
            } catch (e) {
              await query(
                `UPDATE nominations SET payment_status = 'paid', payment_ref = $1 WHERE id = $2`,
                [razorpay_payment_id, recId]
              ).catch(() => {});
            }
            break;

          default:
            break;
        }
      } catch (dbErr) {
        console.error('[Payment DB Update Warning]:', dbErr.message);
      }
    }

    return res.json({
      success: true,
      message: 'Payment verified and status updated to paid.',
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
    });
  } catch (error) {
    console.error('[Razorpay Verify Error]:', error);
    res.status(500).json({ success: false, message: 'Payment signature verification process failed.' });
  }
});

export default router;
