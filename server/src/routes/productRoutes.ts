import { Router } from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController";

const router = Router();

router.get("/", getProduct); // Get all products
router.post("/", createProduct); // Create a product
router.put("/", updateProduct); // Update a product
router.delete("/", deleteProduct); // Delete a product

export default router;
