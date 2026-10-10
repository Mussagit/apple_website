import express from "express";
import {
	loginUser,
	resetPassword,
	insertUser,
	fetchUsers,
	fetchUserById,
	updateUser,
	deleteUser,
} from "../Controller/User.Controller.js";

const router = express.Router();

// ! Route to authenticate admin user
router.post("/login", loginUser);

// ! Route to reset admin password
router.post("/reset-password", resetPassword);

// ! Route to create a user
router.post("/", insertUser);

// ! Route to fetch all users
router.get("/", fetchUsers);

// ! Route to fetch a user by user ID
router.get("/:user_id", fetchUserById);

// ! Route to update a user by user ID
router.put("/:user_id", updateUser);

// ! Route to delete a user by user ID
router.delete("/:user_id", deleteUser);

export default router;
