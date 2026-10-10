import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import pool, { query } from '../config/db.js';

const router = express.Router();

// Helper to initialize Razorpay instance with dynamic env reload & fallback
const getRazorpayInstance = () => {
  try {
    dotenv.config({ override: true });
  } catch (e) {}

  const keyId = (process.env.RAZORPAY_KEY_ID || 'rzp_live_S4Z79D9OR4XfXY')?.trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || 'NVINWtrWJr3abLtnorn475q9')?.trim();

  if (!keyId || !keySecret) {
    throw new Error('Razorpay API Key ID or Secret is missing.');
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
      key_id: (process.env.RAZORPAY_KEY_ID || 'rzp_live_S4Z79D9OR4XfXY')?.trim(),
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

    try {
      dotenv.config({ override: true });
    } catch (e) {}

    const secret = (process.env.RAZORPAY_KEY_SECRET || 'NVINWtrWJr3abLtnorn475q9')?.trim();
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

    // Update or ensure database record only after verified signature
    if (module) {
      const recId = record_id ? (parseInt(record_id, 10) || record_id) : null;
      const attendeePrefill = req.body.prefill || {};
      const orderNotes = req.body.notes || {};
      const contactEmail = (attendeePrefill.email || orderNotes.email || '')?.toLowerCase()?.trim();
      const contactName = attendeePrefill.name || orderNotes.attendeeName || orderNotes.name || 'Delegate';
      const contactPhone = attendeePrefill.contact || attendeePrefill.phone || orderNotes.phone || '';

      try {
        switch (module) {
          case 'events':
          case 'event': {
            let isUpdated = false;
            if (recId) {
              const resUpd = await query(
                `UPDATE web_event_registrations SET payment_status = 'paid', payment_ref = $1, status = 'confirmed' WHERE id = $2 RETURNING *`,
                [razorpay_payment_id, recId]
              );
              if (resUpd && resUpd.rowCount > 0) isUpdated = true;
            }
            if (!isUpdated && contactEmail) {
              const cityHub = orderNotes.cityHub || orderNotes.city || 'Ahmedabad';
              const passTier = orderNotes.passTier || 'Delegate (With Dinner)';
              const org = orderNotes.attendeeSegment || orderNotes.organization || 'General';
              await query(`
                INSERT INTO web_event_registrations (
                  name, email, phone, organization, city_hub, pass_type, pass_amount, city, payment_status, payment_ref, status
                ) VALUES ($1, $2, $3, $4, $5, $6, 1, $7, 'paid', $8, 'confirmed')
                RETURNING *
              `, [
                contactName, contactEmail, contactPhone, org, cityHub,
                passTier.toLowerCase().includes('vip') ? 'vip' : 'general',
                cityHub, razorpay_payment_id
              ]);
            }
            break;
          }

          case 'community':
          case 'membership': {
            let isUpdated = false;
            if (recId) {
              const resUpd = await query(
                `UPDATE web_community_applications SET payment_status = 'paid', payment_ref = $1, status = 'confirmed' WHERE id = $2 RETURNING *`,
                [razorpay_payment_id, recId]
              );
              if (resUpd && resUpd.rowCount > 0) isUpdated = true;
            }
            if (!isUpdated && contactEmail) {
              const tier = orderNotes.tier || 'Pro Member';
              await query(`
                INSERT INTO web_community_applications (
                  name, email, phone, tier, annual_fee, company, city, sector, interest, why_join, payment_status, payment_ref, status
                ) VALUES ($1, $2, $3, $4, 1, $5, $6, 'General', 'Community Membership', 'Platform Registration', 'paid', $7, 'confirmed')
                RETURNING *
              `, [
                contactName, contactEmail, contactPhone,
                tier.toLowerCase().includes('elite') ? 'elite' : 'pro',
                orderNotes.company || 'Venture', orderNotes.city || 'India', razorpay_payment_id
              ]);
            }
            break;
          }

          case 'coffee-book':
          case 'book': {
            let isUpdated = false;
            if (recId) {
              const resUpd = await query(
                `UPDATE web_coffee_table_book_orders SET payment_status = 'paid', payment_ref = $1, status = 'confirmed' WHERE id = $2 RETURNING *`,
                [razorpay_payment_id, recId]
              );
              if (resUpd && resUpd.rowCount > 0) isUpdated = true;
            }
            if (!isUpdated && contactEmail) {
              await query(`
                INSERT INTO web_coffee_table_book_orders (
                  name, email, phone, company, quantity, package_price, total_amount, delivery_address, payment_status, payment_ref, status
                ) VALUES ($1, $2, $3, $4, 1, 1, 1, $5, 'paid', $6, 'confirmed')
                RETURNING *
              `, [
                contactName, contactEmail, contactPhone,
                orderNotes.company || 'Venture', orderNotes.deliveryAddress || 'India', razorpay_payment_id
              ]);
            }
            break;
          }

          case 'sponsorships':
          case 'sponsorship': {
            if (recId) {
              await query(
                `UPDATE web_sponsorships SET payment_received = 1, payment_ref = $1, status = 'confirmed' WHERE id = $2`,
                [razorpay_payment_id, recId]
              );
            }
            break;
          }

          case 'nominations':
          case 'nomination': {
            if (recId) {
              await query(
                `UPDATE web_nominations SET payment_status = 'paid', payment_ref = $1 WHERE id = $2`,
                [razorpay_payment_id, recId]
              );
            }
            break;
          }

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
