import {
	createOrder,
	createMultipleOrders,
	getOrders,
	getOrdersByUserId,
	updateOrderById,
	deleteOrderById,
} from "../Modules/Order.Module.js";

// ! Insert Order(s)
export async function insertOrders(req, res) {
	try {
		const body = req.body;

		// ! Check if the incoming request is an array (multiple orders)
		if (Array.isArray(body)) {
			const orderValues = body.map((o) => [o.product_id, o.user_id]);
			const result = await createMultipleOrders(orderValues);

			return res.status(200).json({
				message: "Orders created successfully",
				result,
			});
		}

		// ! Otherwise, handle it as a single order insertion
		const { product_id, user_id } = body;
		const order = await createOrder(product_id, user_id);

		res.status(200).json({
			message: "Order created successfully",
			order,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to create order(s)",
		});
	}
}

// ! Fetch All Orders
export async function fetchOrders(req, res) {
	try {
		const orders = await getOrders();

		res.status(200).json({
			message: "Orders retrieved successfully",
			orders,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve orders",
		});
	}
}

// ! Fetch Orders By User ID
export async function fetchOrdersByUserId(req, res) {
	try {
		const { user_id } = req.params;
		const orders = await getOrdersByUserId(user_id);

		res.status(200).json({
			message: "Orders retrieved successfully",
			orders,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve orders",
		});
	}
}

// ! Update Order
export async function updateOrder(req, res) {
	try {
		const { order_id } = req.params;
		const { product_id, user_id } = req.body;
		const result = await updateOrderById(order_id, product_id, user_id);
		res.status(200).json({
			message: "Order updated successfully",
			result,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to update order",
		});
	}
}

//! Delete Order
export async function deleteOrder(req, res) {
	try {
		const { order_id } = req.params;
		const result = await deleteOrderById(order_id);
		res.status(200).json({
			message: "Order deleted successfully",
			result,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to delete order",
		});
	}
}
