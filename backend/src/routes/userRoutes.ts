import express from "express";
import { getAllUsers, deleteUser } from "../controllers/userController";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
