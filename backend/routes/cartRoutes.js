const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} = require("../controllers/cartController");

router.get("/", protect, getCart);
router.post("/add/", protect, addToCart);
router.patch("/items/:id/", protect, updateCartItem);
router.delete("/items/:id/", protect, removeCartItem);

module.exports = router;