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
 * Helper to sync successful payment details to database across all modules
 */
export const syncPaymentToDatabase = async ({
  module,
  recordId = null,
  paymentId,
  orderId = '',
  prefill = {},
  notes = {},
}) => {
  const recId = recordId ? (parseInt(recordId, 10) || recordId) : null;
  const contactEmail = (prefill.email || notes.email || '')?.toLowerCase()?.trim();
  const contactName = prefill.name || notes.attendeeName || notes.name || 'Delegate';
  const contactPhone = prefill.contact || prefill.phone || notes.phone || '';

  let isUpdated = false;
  let updatedRecord = null;

  switch (module) {
    case 'events':
    case 'event': {
      const cityHub = notes.cityHub || notes.city || 'Ahmedabad, Gujarat';
      const passTier = notes.passTier || 'Delegate (With Dinner)';
      const org = notes.attendeeSegment || notes.organization || 'Women Entrepreneur';
      const passAmount = notes.originalAmount || notes.amount || (passTier.toLowerCase().includes('dinner') ? 1500 : 750);

      // 1. Try update by recId
      if (recId) {
        try {
          const resUpd = await query(
            `UPDATE web_event_registrations 
             SET payment_status = 'paid', payment_ref = $1, order_id = COALESCE(order_id, $2), status = 'confirmed',
                 pass_type = COALESCE(pass_type, $3),
                 pass_amount = COALESCE(pass_amount, $4)
             WHERE id = $5 RETURNING *`,
            [paymentId, orderId, passTier, passAmount, recId]
          );
          if (resUpd && resUpd.rowCount > 0) {
            isUpdated = true;
            updatedRecord = resUpd.rows[0];
          }
        } catch (errUpd) {
          console.warn('[Sync] Update web_event_registrations by id warning:', errUpd.message);
        }
      }

      // 2. Fallback: match most recent pending registration by email or phone
      if (!isUpdated && (contactEmail || contactPhone)) {
        try {
          const resUpdEmail = await query(
            `UPDATE web_event_registrations
             SET payment_status = 'paid', payment_ref = $1, order_id = COALESCE(order_id, $2), status = 'confirmed',
                 pass_type = COALESCE(pass_type, $3),
                 pass_amount = COALESCE(pass_amount, $4)
             WHERE id = (
               SELECT id FROM web_event_registrations
               WHERE (LOWER(email) = LOWER($5) OR phone = $6)
                 AND (payment_status IS NULL OR payment_status != 'paid')
               ORDER BY created_at DESC LIMIT 1
             ) RETURNING *`,
            [paymentId, orderId, passTier, passAmount, contactEmail, contactPhone]
          );
          if (resUpdEmail && resUpdEmail.rowCount > 0) {
            isUpdated = true;
            updatedRecord = resUpdEmail.rows[0];
          }
        } catch (errEmailUpd) {
          console.warn('[Sync] Update web_event_registrations by email warning:', errEmailUpd.message);
        }
      }

      // 3. Fallback: insert fresh confirmed registration
      if (!isUpdated && (contactEmail || contactName)) {
        try {
          const insRes = await query(`
            INSERT INTO web_event_registrations (
              name, email, phone, organization, attendee_segment, city_hub, city, pass_type, pass_amount, event_date, event_venue, payment_status, payment_ref, order_id, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, '2027-03-08 18:30:00+00', 'Renaissance by Marriott, S.G. Highway, Ahmedabad', 'paid', $10, $11, 'confirmed')
            RETURNING *
          `, [
            contactName, contactEmail, contactPhone, org, org, cityHub, cityHub,
            passTier, passAmount, paymentId, orderId
          ]);
          if (insRes && insRes.rowCount > 0) {
            isUpdated = true;
            updatedRecord = insRes.rows[0];
          }
        } catch (errIns1) {
          try {
            const insRes2 = await query(`
              INSERT INTO web_event_registrations (
                name, email, phone, organization, city_hub, pass_type, pass_amount, city, payment_status, payment_ref, order_id, status
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'paid', $9, $10, 'confirmed')
              RETURNING *
            `, [
              contactName, contactEmail, contactPhone, org, cityHub,
              passTier, passAmount, cityHub, paymentId, orderId
            ]);
            if (insRes2 && insRes2.rowCount > 0) {
              isUpdated = true;
              updatedRecord = insRes2.rows[0];
            }
          } catch (errIns2) {
            console.error('[Sync] Insert fallback error:', errIns2.message);
          }
        }
      }
      break;
    }

    case 'community':
    case 'membership': {
      if (recId) {
        try {
          const resUpd = await query(
            `UPDATE web_community_applications SET payment_status = 'paid', payment_ref = $1, status = 'confirmed' WHERE id = $2 RETURNING *`,
            [paymentId, recId]
          );
          if (resUpd && resUpd.rowCount > 0) {
            isUpdated = true;
            updatedRecord = resUpd.rows[0];
          }
        } catch (e) {}
      }
      if (!isUpdated && contactEmail) {
        try {
          const resEmail = await query(
            `UPDATE web_community_applications SET payment_status = 'paid', payment_ref = $1, status = 'confirmed'
             WHERE id = (SELECT id FROM web_community_applications WHERE LOWER(email) = LOWER($2) ORDER BY created_at DESC LIMIT 1) RETURNING *`,
            [paymentId, contactEmail]
          );
          if (resEmail && resEmail.rowCount > 0) {
            isUpdated = true;
            updatedRecord = resEmail.rows[0];
          }
        } catch (e) {}
      }
      if (!isUpdated && contactEmail) {
        try {
          const tier = notes.tier || 'Pro Member';
          const insRes = await query(`
            INSERT INTO web_community_applications (
              name, email, phone, tier, annual_fee, company, city, sector, interest, why_join, payment_status, payment_ref, status
            ) VALUES ($1, $2, $3, $4, 1, $5, $6, 'General', 'Community Membership', 'Platform Registration', 'paid', $7, 'confirmed')
            RETURNING *
          `, [
            contactName, contactEmail, contactPhone,
            tier.toLowerCase().includes('elite') ? 'elite' : 'pro',
            notes.company || 'Venture', notes.city || 'India', paymentId
          ]);
          if (insRes && insRes.rowCount > 0) {
            isUpdated = true;
            updatedRecord = insRes.rows[0];
          }
        } catch (e) {}
      }
      break;
    }

    case 'coffee-book':
    case 'book': {
      if (recId) {
        try {
          const resUpd = await query(
            `UPDATE web_coffee_table_book_orders SET payment_status = 'paid', payment_ref = $1, status = 'confirmed' WHERE id = $2 RETURNING *`,
            [paymentId, recId]
          );
          if (resUpd && resUpd.rowCount > 0) {
            isUpdated = true;
            updatedRecord = resUpd.rows[0];
          }
        } catch (e) {}
      }
      if (!isUpdated && contactEmail) {
        try {
          const resEmail = await query(
            `UPDATE web_coffee_table_book_orders SET payment_status = 'paid', payment_ref = $1, status = 'confirmed'
             WHERE id = (SELECT id FROM web_coffee_table_book_orders WHERE LOWER(email) = LOWER($2) ORDER BY created_at DESC LIMIT 1) RETURNING *`,
            [paymentId, contactEmail]
          );
          if (resEmail && resEmail.rowCount > 0) {
            isUpdated = true;
            updatedRecord = resEmail.rows[0];
          }
        } catch (e) {}
      }
      if (!isUpdated && contactEmail) {
        try {
          const insRes = await query(`
            INSERT INTO web_coffee_table_book_orders (
              name, email, phone, company, quantity, package_price, total_amount, delivery_address, payment_status, payment_ref, status
            ) VALUES ($1, $2, $3, $4, 1, 1, 1, $5, 'paid', $6, 'confirmed')
            RETURNING *
          `, [
            contactName, contactEmail, contactPhone,
            notes.company || 'Venture', notes.deliveryAddress || 'India', paymentId
          ]);
          if (insRes && insRes.rowCount > 0) {
            isUpdated = true;
            updatedRecord = insRes.rows[0];
          }
        } catch (e) {}
      }
      break;
    }

    case 'sponsorships':
    case 'sponsorship': {
      if (recId) {
        try {
          await query(
            `UPDATE web_sponsorships SET payment_received = 1, payment_ref = $1, status = 'confirmed' WHERE id = $2`,
            [paymentId, recId]
          );
          isUpdated = true;
        } catch (e) {}
      }
      break;
    }

    case 'nominations':
    case 'nomination': {
      if (recId) {
        try {
          await query(
            `UPDATE web_nominations SET payment_status = 'paid', payment_ref = $1 WHERE id = $2`,
            [paymentId, recId]
          );
          isUpdated = true;
        } catch (e) {}
      }
      break;
    }

    default:
      break;
  }

  return { isUpdated, updatedRecord };
};

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

    // Update database record immediately upon verified signature
    let syncResult = { isUpdated: false, updatedRecord: null };
    if (module) {
      syncResult = await syncPaymentToDatabase({
        module,
        recordId: record_id,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        prefill: req.body.prefill || {},
        notes: req.body.notes || {},
      });
    }

    return res.json({
      success: true,
      message: syncResult.isUpdated
        ? 'Payment verified and saved to database successfully.'
        : 'Payment signature verified.',
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      db_synced: syncResult.isUpdated,
      data: syncResult.updatedRecord,
    });
  } catch (error) {
    console.error('[Razorpay Verify Error]:', error);
    res.status(500).json({ success: false, message: 'Payment signature verification process failed.' });
  }
});

/**
 * POST /api/payment/webhook
 * Server-to-server Razorpay webhook listener for asynchronous event capture
 */
router.post('/webhook', async (req, res) => {
  try {
    const webhookSecret = (process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET || 'NVINWtrWJr3abLtnorn475q9')?.trim();
    const signature = req.headers['x-razorpay-signature'];

    if (signature && webhookSecret) {
      const shasum = crypto.createHmac('sha256', webhookSecret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest('hex');
      if (digest !== signature) {
        console.warn('[Razorpay Webhook Signature Mismatch]');
        return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
      }
    }

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payment?.entity || {};
      const orderNotes = paymentEntity.notes || payload.order?.entity?.notes || {};
      const paymentId = paymentEntity.id;
      const orderId = paymentEntity.order_id;
      const moduleName = orderNotes.module || 'events';
      const recordId = orderNotes.recordId || null;

      await syncPaymentToDatabase({
        module: moduleName,
        recordId,
        paymentId,
        orderId,
        prefill: {
          email: paymentEntity.email,
          contact: paymentEntity.contact,
          name: orderNotes.attendeeName || orderNotes.name,
        },
        notes: orderNotes,
      });
    }

    return res.status(200).json({ status: 'ok' });
  } catch (webhookErr) {
    console.error('[Razorpay Webhook Error]:', webhookErr.message);
    return res.status(500).json({ status: 'error', message: webhookErr.message });
  }
});

export default router;
