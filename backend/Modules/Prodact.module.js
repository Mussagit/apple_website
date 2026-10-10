import dbPool from "../config/pool.js";

// ! Create Single Product (Standalone)
export async function createProducts(product_name, product_url) {
	const query = `INSERT INTO product_table(product_name, product_url) VALUES (?, ?)`;
	const [result] = await dbPool.query(query, [product_name, product_url]);
	return result;
}

// ! Create Product with Connection (Required for Transactions)
export async function createProduct(connection, product_url, product_name) {
	const query = `INSERT INTO product_table (product_url, product_name) VALUES (?, ?)`;
	const [result] = await connection.query(query, [product_url, product_name]);
	return result.insertId;
}

// ! Create Multiple Products
export async function createMultipleProducts(productValues) {
	const query = `INSERT INTO product_table (product_name, product_url) VALUES ?`;
	const [result] = await dbPool.query(query, [productValues]);
	return result;
}

// ! Get All Full Products (with description and price details)
export async function getFullProducts() {
	const query = `
        SELECT 
            p.product_id, 
            p.product_name, 
            p.product_url, 
            pd.product_brief_description, 
            pd.product_description,
            pd.product_img,
            pd.product_link,
            pp.starting_price, 
            pp.price_range
        FROM product_table p
        LEFT JOIN product_description_table pd ON p.product_id = pd.product_id
        LEFT JOIN product_price_table pp ON p.product_id = pp.product_id
        ORDER BY p.product_id ASC
    `;
	const [result] = await dbPool.query(query);
	return result;
}

// ! Get Single Full Product by ID or URL / Slug
export async function getFullProductByIdOrUrl(idOrUrl) {
	if (!idOrUrl) return null;

	const isNumeric = !isNaN(idOrUrl) && !isNaN(parseFloat(idOrUrl));

	if (isNumeric) {
		const query = `
			SELECT 
				p.product_id, 
				p.product_name, 
				p.product_url, 
				pd.product_brief_description, 
				pd.product_description,
				pd.product_img,
				pd.product_link,
				pp.starting_price, 
				pp.price_range
			FROM product_table p
			LEFT JOIN product_description_table pd ON p.product_id = pd.product_id
			LEFT JOIN product_price_table pp ON p.product_id = pp.product_id
			WHERE p.product_id = ?
		`;
		const [result] = await dbPool.query(query, [Number(idOrUrl)]);
		return result[0] || null;
	}

	const cleanSlug = String(idOrUrl).toLowerCase().replace(/[^a-z0-9]/g, "");

	const query = `
		SELECT 
			p.product_id, 
			p.product_name, 
			p.product_url, 
			pd.product_brief_description, 
			pd.product_description,
			pd.product_img,
			pd.product_link,
			pp.starting_price, 
			pp.price_range
		FROM product_table p
		LEFT JOIN product_description_table pd ON p.product_id = pd.product_id
		LEFT JOIN product_price_table pp ON p.product_id = pp.product_id
		WHERE LOWER(REPLACE(REPLACE(REPLACE(p.product_name, ' ', ''), '-', ''), '_', '')) = ?
		   OR LOWER(REPLACE(REPLACE(REPLACE(p.product_url, ' ', ''), '-', ''), '_', '')) LIKE ?
		   OR LOWER(p.product_url) = ?
	`;
	const [result] = await dbPool.query(query, [
		cleanSlug,
		`%${cleanSlug}%`,
		idOrUrl,
	]);
	return result[0] || null;
}

// ! Get All Products (basic)
export async function getProduct() {
	const query = `SELECT * FROM product_table`;
	const [result] = await dbPool.query(query);
	return result;
}

// ! Update Product by ID
export async function updateProductById(product_id, product_name, product_url) {
	const query = `UPDATE product_table SET product_name = ?, product_url = ? WHERE product_id = ?`;
	const [result] = await dbPool.query(query, [
		product_name,
		product_url,
		product_id,
	]);
	return result;
}

// ! Delete Full Product with Connection (Transaction)
export async function deleteFullProductById(connection, product_id) {
	// 1. Delete from child tables first
	await connection.query(`DELETE FROM orders_table WHERE product_id = ?`, [
		product_id,
	]);
	await connection.query(
		`DELETE FROM product_price_table WHERE product_id = ?`,
		[product_id],
	);
	await connection.query(
		`DELETE FROM product_description_table WHERE product_id = ?`,
		[product_id],
	);

	// 2. Delete from parent product table
	const [result] = await connection.query(
		`DELETE FROM product_table WHERE product_id = ?`,
		[product_id],
	);
	return result;
}

// ! Delete Product by ID
export async function deleteProductById(product_id) {
	const query = `DELETE FROM product_table WHERE product_id = ?`;
	const [result] = await dbPool.query(query, [product_id]);
	return result;
}
