import express from "express";
import {
	insertProducts,
	insertFullProduct,
	fetchProducts,
	updateProdact,
	deleteProduct,
	fetchFullProducts,
	fetchSingleProduct,
	deleteFullProduct,
} from "../Controller/Prodact.controller.js";

const router = express.Router();

// ! Route to fetch all full products
router.get("/full-products", fetchFullProducts);
router.get("/products", fetchFullProducts);
router.get("/", fetchFullProducts);

// ! Route to fetch a single product by ID or Slug/URL
router.get("/full-product/:id", fetchSingleProduct);
router.get("/products/:id", fetchSingleProduct);
router.get("/:id", fetchSingleProduct);

// ! Route to insert a single product or multiple products (Array)
router.post("/products", insertProducts);

// ! Route to insert a full product with transaction
router.post("/full-product", insertFullProduct);
router.post("/add-product", insertFullProduct);

// ! Route to update a product by ID
router.put("/products/:product_id", updateProdact);
router.put("/:product_id", updateProdact);

// ! Route to delete a full product by ID
router.delete("/full-product/:product_id", deleteFullProduct);

// ! Route to delete a product by ID
router.delete("/products/:product_id", deleteProduct);
router.delete("/:product_id", deleteProduct);

export default router;