const db = require("../config/db");

const createOrder = (req, res) => {
  const userId = req.user.id;
  const { items, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  db.query(
    "INSERT INTO orders (user_id, total) VALUES (?, ?)",
    [userId, total],
    (err, orderResult) => {
      if (err) {
        return res.status(500).json({ message: "Failed to create order" });
      }

      const orderId = orderResult.insertId;

      const orderItemsValues = items.map((item) => [
        orderId,
        item.id,
        item.quantity
      ]);

      db.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ?",
        [orderItemsValues],
        (err) => {
          if (err) {
            return res.status(500).json({
              message: "Failed to save order items"
            });
          }

          res.json({
            id: orderId,
            total,
            message: "Order placed successfully"
          });
        }
      );
    }
  );
};

const getOrders = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT
      orders.id,
      orders.total,
      orders.created_at,
      order_items.quantity,
      products.title,
      products.price,
      products.image
    FROM orders
    INNER JOIN order_items ON orders.id = order_items.order_id
    INNER JOIN products ON order_items.product_id = products.id
    WHERE orders.user_id = ?
    ORDER BY orders.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch orders" });
    }

    res.json(results);
  });
};

module.exports = {
  createOrder,
  getOrders
};