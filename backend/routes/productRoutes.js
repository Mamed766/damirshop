import express from "express";
import Product from "../models/productModel.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById);

export default router;
