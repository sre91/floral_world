import express from "express";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/productController";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// Admin can add products
router.post("/", verifyToken, verifyAdmin, addProduct);

// Anyone can view products
router.get("/", getAllProducts);

router.put("/:id", verifyToken, verifyAdmin, updateProduct);

router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;
