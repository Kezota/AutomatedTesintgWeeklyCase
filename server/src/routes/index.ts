import { Router } from "express";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// API Welcome Message
router.get("/", (_, response) => {
  response.send({
    message: "My-API-Name v0.0.1",
  });
});

/**
 * Insert your router here
 * @example router.use("/example", exampleRouter)
 */

// Auth routes
router.use("/", authRoutes);

// Product routes
router.use("/", authMiddleware, productRoutes);

export default router;
