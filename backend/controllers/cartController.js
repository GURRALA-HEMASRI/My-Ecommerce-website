const db = require("../config/db");

const getCart = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT 
      cart.id,
      cart.quantity,
      products.id AS product_id,
      products.title,
      products.price,
      products.image
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch cart"
      });
    }

    res.json(results);
  });
};

const addToCart = (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  db.query(
    "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
    [userId, product_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (results.length > 0) {
        db.query(
          "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
          [quantity || 1, userId, product_id],
          (err) => {
            if (err) {
              return res.status(500).json({
                message: "Failed to update cart"
              });
            }

            res.json({
              message: "Cart updated"
            });
          }
        );
      } else {
        db.query(
          "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
          [userId, product_id, quantity || 1],
          (err) => {
            if (err) {
              return res.status(500).json({
                message: "Failed to add to cart"
              });
            }

            res.json({
              message: "Added to cart"
            });
          }
        );
      }
    }
  );
};

const updateCartItem = (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.id;
  const { quantity } = req.body;

  db.query(
    "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?",
    [quantity, cartId, userId],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to update cart"
        });
      }

      res.json({
        message: "Cart updated"
      });
    }
  );
};

const removeCartItem = (req, res) => {
  const cartId = req.params.id;
  const userId = req.user.id;

  db.query(
    "DELETE FROM cart WHERE id = ? AND user_id = ?",
    [cartId, userId],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to remove cart item"
        });
      }

      res.json({
        message: "Cart item removed"
      });
    }
  );
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
};