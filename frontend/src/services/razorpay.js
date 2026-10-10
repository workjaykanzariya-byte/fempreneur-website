/**
 * Fempreneur Real Razorpay Gateway Service (Test Mode Enabled)
 * 
 * Exclusively uses official Razorpay Checkout Gateway SDK (https://checkout.razorpay.com/v1/checkout.js).
 * Strict flow:
 * 1. Creates genuine Razorpay order on backend (/api/payment/create-order)
 * 2. Opens official Razorpay modal (window.Razorpay)
 * 3. On successful payment, sends signature to backend (/api/payment/verify)
 * 4. Verifies HMAC SHA-256 signature before confirming completion
 * 5. Rejects on dismissal or failure to prevent unverified registrations
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Dynamically loads the official Razorpay checkout script if not already present.
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load official Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Initiates official Razorpay Checkout payment.
 */
export const initiateRazorpayPayment = async ({
  amount,
  module = 'general',
  recordId = null,
  title = 'Fempreneur 2027',
  description = 'Payment Transaction',
  prefill = {},
  notes = {},
}) => {
  // 1. Create order on backend
  let orderRes;
  try {
    orderRes = await fetch(`${API_BASE}/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Number(amount),
        module,
        recordId,
        notes: {
          ...notes,
          description,
        },
      }),
    });
  } catch (netErr) {
    throw new Error('Unable to connect to the backend server. Please ensure the backend is running.');
  }

  let orderData;
  try {
    orderData = await orderRes.json();
  } catch {
    const errText = await orderRes.text().catch(() => '');
    throw new Error(`Payment server error: ${errText.slice(0, 100) || orderRes.statusText || 'Unable to connect'}`);
  }

  if (!orderData.success || !orderData.order) {
    throw new Error(orderData.message || 'Failed to create payment order on Razorpay server.');
  }

  const { order, key_id, currency, test_mode, charged_amount_inr } = orderData;

  // 2. Load official Razorpay SDK script
  const isScriptLoaded = await loadRazorpayScript();
  if (!isScriptLoaded) {
    throw new Error('Could not load Razorpay payment gateway. Please check your internet connection.');
  }

  return new Promise((resolve, reject) => {
    const options = {
      key: key_id,
      amount: order.amount, // Exactly 100 paise (₹1) in test mode
      currency: currency || 'INR',
      name: 'Fempreneur 2027',
      description: `${description} ${test_mode ? '(₹1 Test Mode)' : ''}`,
      image: '/fempreneur-logo.png',
      order_id: order.id,
      prefill: {
        name: prefill.name || '',
        email: prefill.email || '',
        contact: prefill.phone || prefill.contact || '',
      },
      notes: {
        module,
        recordId: String(recordId || ''),
        originalAmount: String(amount),
        chargedAmount: String(charged_amount_inr),
      },
      theme: {
        color: '#8A24BA', // Fempreneur Signature Royal Purple
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment cancelled by user. Registration remains pending.'));
        },
      },
      handler: async (response) => {
        try {
          if (!response.razorpay_payment_id || !response.razorpay_signature) {
            reject(new Error('Incomplete payment response received from Razorpay.'));
            return;
          }

          // 3. Strict Signature Verification on backend
          const verifyRes = await fetch(`${API_BASE}/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id || order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              module,
              record_id: recordId,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            resolve({
              success: true,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id || order.id,
              amountPaid: charged_amount_inr || 1,
              testMode: test_mode,
              message: 'Payment verified successfully by Razorpay!',
            });
          } else {
            reject(new Error(verifyData.message || 'Payment signature verification failed.'));
          }
        } catch (vErr) {
          reject(vErr);
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', (resp) => {
      console.error('[Razorpay Payment Failed]:', resp.error);
      const reason = resp.error?.description || resp.error?.reason || 'Payment transaction failed.';
      reject(new Error(`Razorpay Payment Failed: ${reason}`));
    });

    rzp.open();
  });
};
