import dbPool from "../config/pool.js";

// ! Create Product Description
export async function createDescription(
	product_id,
	product_brief_description,
	product_description,
	product_img,
	product_link,
) {
	const query = `
        INSERT INTO product_description_table 
        (product_id, product_brief_description, product_description, product_img, product_link) 
        VALUES (?, ?, ?, ?, ?)
    `;
	const [result] = await dbPool.query(query, [
		product_id,
		product_brief_description,
		product_description,
		product_img,
		product_link,
	]);
	return result;
}

// ! Create Product Description (Used inside Transactions with a shared connection)
export async function createDescriptionWithConnection(
	connection,
	product_id,
	product_brief_description,
	product_description,
	product_img,
	product_link,
) {
	const query = `
        INSERT INTO product_description_table 
        (product_id, product_brief_description, product_description, product_img, product_link) 
        VALUES (?, ?, ?, ?, ?)
    `;
	const [result] = await connection.query(query, [
		product_id,
		product_brief_description,
		product_description,
		product_img,
		product_link,
	]);
	return result;
}

// ! Create Multiple Descriptions
export async function createMultipleDescriptions(descriptionValues) {
	const query = `
        INSERT INTO product_description_table 
        (product_id, product_brief_description, product_description, product_img, product_link) 
        VALUES ?
    `;
	const [result] = await dbPool.query(query, [descriptionValues]);
	return result;
}

// ! Get All Descriptions
export async function getDescriptions() {
	const query = `SELECT * FROM product_description_table`;
	const [result] = await dbPool.query(query);
	return result;
}

// ! Get Description by Product ID (useful for fetching a specific product's details)
export async function getDescriptionByProductId(product_id) {
	const query = `SELECT * FROM product_description_table WHERE product_id = ?`;
	const [result] = await dbPool.query(query, [product_id]);
	return result;
}

// ! Update Description by ID
export async function updateDescriptionById(
	description_id,
	product_id,
	product_brief_description,
	product_description,
	product_img,
	product_link,
) {
	const query = `
        UPDATE product_description_table 
        SET product_id = ?, 
            product_brief_description = ?, 
            product_description = ?, 
            product_img = ?, 
            product_link = ? 
        WHERE description_id = ?
    `;
	const [result] = await dbPool.query(query, [
		product_id,
		product_brief_description,
		product_description,
		product_img,
		product_link,
		description_id,
	]);
	return result;
}

// ! Delete Description by ID
export async function deleteDescriptionById(description_id) {
	const query = `DELETE FROM product_description_table WHERE description_id = ?`;
	const [result] = await dbPool.query(query, [description_id]);
	return result;
}
