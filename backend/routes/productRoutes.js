import express from "express";
import Product from "../models/productModel.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
