import paypalClient from "../config/paypal.js";
import db from "../config/db.js";

export const createOrder = async (req, res) => {
  const { total, items } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{ amount: { value: total, currency_code: "USD" } }],
  });

  const order = await paypalClient.execute(request);
  res.json({ id: order.result.id });
};

export const captureOrder = async (req, res) => {
  const { orderID } = req.body;
  const capture = await paypalClient.execute(
    new paypal.orders.OrdersCaptureRequest(orderID)
  );

  const [result] = await db.query(
    "INSERT INTO orders (user_id, total, date) VALUES (?, ?, ?)",
    [req.user.id, capture.result.purchase_units[0].amount.value, new Date()]
  );

  res.json({ message: "Payment successful", orderID: result.insertId });
};
