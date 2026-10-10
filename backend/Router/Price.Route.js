import express from "express";
import {
	insertProductPrices,
	fetchProductPrices,
	fetchProductPriceByProductId,
	updateProductPrice,
	deleteProductPrice,
} from "../Controller/Price.Controller.js";

const router = express.Router();

router.post("/", insertProductPrices);
router.get("/", fetchProductPrices);
router.get("/:product_id", fetchProductPriceByProductId);
router.put("/:price_id", updateProductPrice);
router.delete("/:price_id", deleteProductPrice);

export default router;
