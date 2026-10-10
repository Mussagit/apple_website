import dbPool from "../config/pool.js";

// ! Create Product Price
export async function createProductPrice(
	product_id,
	starting_price,
	price_range,
) {
	const query = `INSERT INTO product_price_table (product_id, starting_price, price_range) VALUES (?, ?, ?)`;
	const [result] = await dbPool.query(query, [
		product_id,
		starting_price,
		price_range,
	]);
	return result;
}

// ! Create Product Price (Used inside Transactions with a shared connection)
export async function createProductPriceWithConnection(
	connection,
	product_id,
	starting_price,
	price_range,
) {
	const query = `INSERT INTO product_price_table (product_id, starting_price, price_range) VALUES (?, ?, ?)`;
	const [result] = await connection.query(query, [
		product_id,
		starting_price,
		price_range,
	]);
	return result;
}

// ! Create Multiple Prices
export async function createMultipleProductPrices(priceValues) {
	const query = `INSERT INTO product_price_table (product_id, starting_price, price_range) VALUES ?`;
	const [result] = await dbPool.query(query, [priceValues]);
	return result;
}

// ! Get All Prices
export async function getProductPrices() {
	const query = `SELECT * FROM product_price_table`;
	const [result] = await dbPool.query(query);
	return result;
}

// ! Get Price by Product ID
export async function getProductPriceByProductId(product_id) {
	const query = `SELECT * FROM product_price_table WHERE product_id = ?`;
	const [result] = await dbPool.query(query, [product_id]);
	return result;
}

// ! Update Price by ID
export async function updateProductPriceById(
	price_id,
	product_id,
	starting_price,
	price_range,
) {
	const query = `UPDATE product_price_table SET product_id = ?, starting_price = ?, price_range = ? WHERE price_id = ?`;
	const [result] = await dbPool.query(query, [
		product_id,
		starting_price,
		price_range,
		price_id,
	]);
	return result;
}

//! Delete Price by ID
export async function deleteProductPriceById(price_id) {
	const query = `DELETE FROM product_price_table WHERE price_id = ?`;
	const [result] = await dbPool.query(query, [price_id]);
	return result;
}
