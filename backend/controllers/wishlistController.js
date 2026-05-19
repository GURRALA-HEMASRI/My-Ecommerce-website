const db = require("../config/db");

const getWishlist = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT
      wishlist.id,
      products.id AS product_id,
      products.title,
      products.price,
      products.image
    FROM wishlist
    JOIN products ON wishlist.product_id = products.id
    WHERE wishlist.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

const toggleWishlist = (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.body;

  db.query(
    "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?",
    [userId, product_id],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (results.length > 0) {
        db.query(
          "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?",
          [userId, product_id],
          (err) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              message: "Removed from wishlist"
            });
          }
        );
      } else {
        db.query(
          "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
          [userId, product_id],
          (err) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              message: "Added to wishlist"
            });
          }
        );
      }
    }
  );
};

module.exports = {
  getWishlist,
  toggleWishlist
};