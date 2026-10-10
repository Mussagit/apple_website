import {
	createProductPrice,
	updateProductPriceById,
	getProductPrices,
	deleteProductPriceById,
	createMultipleProductPrices,
	getProductPriceByProductId,
} from "../Modules/Price.Module.js";

export async function insertProductPrices(req, res) {
	try {
		const body = req.body;

		// ! Check if the incoming request is an array (multiple prices)
		if (Array.isArray(body)) {
			const priceValues = body.map((p) => [
				p.product_id,
				p.starting_price,
				p.price_range,
			]);
			const result = await createMultipleProductPrices(priceValues);

			return res.status(200).json({
				message: "Prices created successfully",
				result,
			});
		}

		// ! Otherwise, handle it as a single price insertion
		const { product_id, starting_price, price_range } = body;
		const price = await createProductPrice(
			product_id,
			starting_price,
			price_range,
		);

		res.status(200).json({
			message: "Price created successfully",
			price,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to create price(s)",
		});
	}
}

export async function fetchProductPrices(req, res) {
	try {
		const prices = await getProductPrices();

		res.status(200).json({
			message: "Prices retrieved successfully",
			prices,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve prices",
		});
	}
}

export async function fetchProductPriceByProductId(req, res) {
	try {
		const { product_id } = req.params;
		const prices = await getProductPriceByProductId(product_id);

		res.status(200).json({
			message: "Price retrieved successfully",
			prices,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve price",
		});
	}
}

// ! Update Price
export async function updateProductPrice(req, res) {
	try {
		const { price_id } = req.params;
		const { product_id, starting_price, price_range } = req.body;
		const result = await updateProductPriceById(
			price_id,
			product_id,
			starting_price,
			price_range,
		);
		res.status(200).json({
			message: "Price updated successfully",
			result,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to update price",
		});
	}
}

//! Delete Price
export async function deleteProductPrice(req, res) {
	try {
		const { price_id } = req.params;
		const result = await deleteProductPriceById(price_id);
		res.status(200).json({
			message: "Price deleted successfully",
			result,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to delete price",
		});
	}
}
