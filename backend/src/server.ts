import express from "express";
import cors from "cors";
import dotenv from "dotenv";
<<<<<<< HEAD
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";
import adminRoutes from "./routes/adminRoutes";
import adminProductRoutes from "./routes/adminProductRoutes";
import testRoutes from "./routes/testRoutes";
import aiRoutes from "./routes/aiRoutes";
=======
import authRoutes from "./routes/authRoutes";
import mongoose from "mongoose";
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96

dotenv.config();

const app = express();

<<<<<<< HEAD
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/test", testRoutes);
app.use("/api/ai", aiRoutes);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
=======
// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("🌸 Floral World Backend is running!");
});
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
