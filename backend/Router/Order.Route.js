import express from "express";
import {
	insertOrders,
	fetchOrders,
	fetchOrdersByUserId,
	updateOrder,
	deleteOrder,
} from "../Controller/Order.Controller.js";
const router = express.Router();
router.post("/", insertOrders);
router.get("/", fetchOrders);
router.get("/:user_id", fetchOrdersByUserId);
router.put("/:order_id", updateOrder);
router.delete("/:order_id", deleteOrder);

export default router;
