import dbPool from "../config/pool.js";

// ! Create Order
export async function createOrder(product_id, user_id) {
	const query = `INSERT INTO orders_table (product_id, user_id) VALUES (?, ?)`;
	const [result] = await dbPool.query(query, [product_id, user_id]);
	return result;
}


// ! Create Order (Used inside Transactions with a shared connection)
export async function createOrderWithConnection(connection, product_id, user_id) {
    const query = `INSERT INTO orders_table (product_id, user_id) VALUES (?, ?)`;
    const [result] = await connection.query(query, [product_id, user_id]);
    return result;
}

// ! Create Multiple Orders
export async function createMultipleOrders(orderValues) {
	const query = `INSERT INTO orders_table (product_id, user_id) VALUES ?`;
	const [result] = await dbPool.query(query, [orderValues]);
	return result;
}

// ! Get All Orders
export async function getOrders() {
	const query = `SELECT * FROM orders_table`;
	const [result] = await dbPool.query(query);
	return result;
}

// ! Get Orders by User ID
export async function getOrdersByUserId(user_id) {
	const query = `SELECT * FROM orders_table WHERE user_id = ?`;
	const [result] = await dbPool.query(query, [user_id]);
	return result;
}

// ! Update Order by ID
export async function updateOrderById(order_id, product_id, user_id) {
	const query = `UPDATE orders_table SET product_id = ?, user_id = ? WHERE order_id = ?`;
	const [result] = await dbPool.query(query, [product_id, user_id, order_id]);
	return result;
}

//! Delete Order by ID
export async function deleteOrderById(order_id) {
	const query = `DELETE FROM orders_table WHERE order_id = ?`;
	const [result] = await dbPool.query(query, [order_id]);
	return result;
}
