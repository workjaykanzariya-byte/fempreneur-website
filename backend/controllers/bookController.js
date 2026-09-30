import { query } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createBookOrder = async (req, res, next) => {
  try {
    const { customerName, email, phone, quantity, deliveryAddress } = req.body;

    if (!customerName || !email || !phone || !deliveryAddress) {
      return errorResponse(res, 'Customer name, email, phone, and delivery address are required.', 400);
    }

    const qty = parseInt(quantity, 10) || 1;
    const unitPrice = 2999;
    const totalPrice = qty * unitPrice;

    const result = await query(`
      INSERT INTO book_orders (customer_name, email, phone, quantity, unit_price, total_price, delivery_address)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [customerName.trim(), email.toLowerCase().trim(), phone.trim(), qty, unitPrice, totalPrice, deliveryAddress.trim()]);

    return successResponse(res, result.rows[0], 'Coffee Table Book pre-order reserved successfully.', 201);
  } catch (err) {
    next(err);
  }
};

export const getBookOrders = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM book_orders ORDER BY created_at DESC');
    return successResponse(res, result.rows, 'Book orders retrieved.');
  } catch (err) {
    next(err);
  }
};
