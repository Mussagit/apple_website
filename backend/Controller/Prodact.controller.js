import dbPool from "../config/pool.js";
import {
	createProducts,
	createProduct,
	updateProductById,
	getProduct,
	deleteProductById,
	createMultipleProducts,
	getFullProducts,
	getFullProductByIdOrUrl,
	deleteFullProductById,
} from "../Modules/Prodact.module.js";
import { createDescriptionWithConnection } from "../Modules/Discription.Module.js";
import { createProductPriceWithConnection } from "../Modules/Price.Module.js";
import { createOrderWithConnection } from "../Modules/Order.Module.js";

// ! Insert Single or Multiple Products
export async function insertProducts(req, res) {
	try {
		const body = req.body;

		if (Array.isArray(body)) {
			const productValues = body.map((p) => [p.product_name, p.product_url]);
			const result = await createMultipleProducts(productValues);

			return res.status(200).json({
				message: "Products created successfully",
				result,
			});
		}

		const { product_name, product_url } = body;
		const product = await createProducts(product_name, product_url);

		res.status(200).json({
			message: "Product created successfully",
			product,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to create product(s)",
		});
	}
}

// ! Insert Full Product (Transaction using dedicated modules)
export async function insertFullProduct(req, res) {
	const connection = await dbPool.getConnection();
	try {
		const body = req.body || {};
		console.log("==> insertFullProduct received req.body:", body);
		const product_name = body.product_name || body.productName || body.title;
		const product_url = body.product_url || body.productUrl || (product_name ? product_name.toLowerCase().replace(/\s+/g, "-") : "");
		const product_brief_description = body.product_brief_description || body.brief_description || body.brief || "";
		const product_description = body.product_description || body.full_description || body.description || "";
		const product_img = body.product_img || body.image_url || body.img || body.image || "";
		const product_link = body.product_link || body.productLink || body.link || product_url || "";
		const starting_price = body.starting_price || body.startingPrice || body.price || "";
		const price_range = body.price_range || body.priceRange || "";
		const user_id = body.user_id || body.userId;

		// Backend Validation Check
		if (!product_name || !starting_price) {
			console.log("==> Validation failed. product_name:", product_name, "starting_price:", starting_price);
			return res.status(400).json({
				message: "Validation Error: Product name and starting price are required.",
			});
		}

		await connection.beginTransaction();

		// 1. Create Product
		const product_id = await createProduct(
			connection,
			product_url,
			product_name,
		);

		// 2. Create Description via module
		await createDescriptionWithConnection(
			connection,
			product_id,
			product_brief_description,
			product_description,
			product_img,
			product_link,
		);

		// 3. Create Price via module
		await createProductPriceWithConnection(
			connection,
			product_id,
			starting_price,
			price_range,
		);

		// 4. Create Order via module (optional check if user_id is provided)
		if (user_id) {
			await createOrderWithConnection(connection, product_id, user_id);
		}

		await connection.commit();

		res.status(200).json({
			message: "Full product created successfully!",
			product_id,
		});
	} catch (error) {
		await connection.rollback();
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to create full product insertion",
		});
	} finally {
		connection.release();
	}
}

// ! Fetch All Full Products
export async function fetchFullProducts(req, res) {
	try {
		const fullProducts = await getFullProducts();

		res.status(200).json({
			message: "Full products retrieved successfully",
			products: fullProducts,
			data: fullProducts,
			fullProducts,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve full products",
		});
	}
}

// ! Fetch Single Product by ID or URL / Slug
export async function fetchSingleProduct(req, res) {
	try {
		const id = req.params.id || req.params.product_id || req.params.slug;
		const product = await getFullProductByIdOrUrl(id);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
				product: null,
				data: null,
			});
		}

		res.status(200).json({
			message: "Product retrieved successfully",
			product: product,
			data: product,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve product",
		});
	}
}

// ! Fetch All Products (simple list)
export async function fetchProducts(req, res) {
	try {
		const products = await getProduct();

		res.status(200).json({
			message: "Products retrieved successfully",
			products,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve products",
		});
	}
}

// ! Update Product
export async function updateProdact(req, res) {
	try {
		const { product_id } = req.params;
		const { product_name, product_url } = req.body;

		const result = await updateProductById(
			product_id,
			product_name,
			product_url,
		);

		res.status(200).json({
			Message: "Product Updated successfully",
			result,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			Message: "Failed to update product",
		});
	}
}

// ! Delete Full Product (Transaction)
export async function deleteFullProduct(req, res) {
	const connection = await dbPool.getConnection();
	try {
		const { product_id } = req.params;

		await connection.beginTransaction();

		const result = await deleteFullProductById(connection, product_id);

		await connection.commit();

		res.status(200).json({
			message: "Full product and its details deleted successfully!",
			result,
		});
	} catch (error) {
		await connection.rollback();
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to delete full product",
		});
	} finally {
		connection.release();
	}
}

// ! Delete Product
export async function deleteProduct(req, res) {
	try {
		const { product_id } = req.params;
		const result = await deleteProductById(product_id);
		res.status(200).json({
			message: "Product deleted successfully",
			result,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed delete Product",
		});
	}
}
