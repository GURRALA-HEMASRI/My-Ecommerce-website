const db = require("../config/db");

const getProducts = (req, res) => {
  const { category, search } = req.query;

  let query = "SELECT * FROM products";
  let params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  if (search) {
    query += category
      ? " AND title LIKE ?"
      : " WHERE title LIKE ?";
    params.push(`%${search}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch products"
      });
    }

    res.json(results);
  });
};

const getProductById = (req, res) => {
  const productId = req.params.id;

  db.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.json(results[0]);
    }
  );
};

module.exports = {
  getProducts,
  getProductById
};