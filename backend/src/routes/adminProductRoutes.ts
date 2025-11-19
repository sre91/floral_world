import express from "express";
import Product from "../models/Product";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// GET all products
router.get("/", verifyAdmin, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST create product
router.post("/", verifyAdmin, async (req, res) => {
  const { name, price, image, description } = req.body;
  const product = new Product({ name, price, image, description });
  await product.save();
  res.status(201).json(product);
});

// PUT update product
router.put("/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
});

// DELETE product
router.delete("/:id", verifyAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
