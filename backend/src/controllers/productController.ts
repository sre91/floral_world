import { Request, Response } from "express";
import Product from "../models/Product";

// Add new product (Admin only)
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, category } = req.body;
    console.log("➡️ Add Product Request Body:", req.body);

    if (!name || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({ name, price, description, image, category });
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("❌ Add Product Error:", error);
    res.status(500).json({ message: "Error adding product", error });
  }
};

//Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

//Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: updated });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error while updating product" });
  }
};
