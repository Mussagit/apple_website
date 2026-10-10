import bcrypt from "bcryptjs";
import {
	createUser,
	updateUserById,
	getUsers,
	getUserById,
	getUserByUsername,
	deleteUserById,
} from "../Modules/User.Module.js";

export async function loginUser(req, res) {
	try {
		const { user_name, user_password } = req.body;

		if (!user_name || !user_password) {
			return res.status(400).json({
				message: "Username and password are required.",
			});
		}

		// Try exact username or variations like @mussa / mussa
		let user = await getUserByUsername(user_name);
		if (!user) {
			const altName = user_name.startsWith("@")
				? user_name.substring(1)
				: `@${user_name}`;
			user = await getUserByUsername(altName);
		}

		if (!user) {
			return res.status(401).json({
				message: "Invalid admin credentials.",
			});
		}

		// Verify hashed password with bcrypt
		let isMatch = false;
		if (user.user_password && user.user_password.startsWith("$2")) {
			isMatch = await bcrypt.compare(user_password, user.user_password);
		} else {
			isMatch = user.user_password === user_password;
		}

		if (!isMatch) {
			return res.status(401).json({
				message: "Invalid admin password.",
			});
		}

		res.status(200).json({
			message: "Admin authentication successful",
			user: {
				user_id: user.user_id,
				user_name: user.user_name,
			},
		});
	} catch (error) {
		console.log("Error during login:", error);
		res.status(500).json({
			message: "Failed to authenticate user",
		});
	}
}

// ! Reset Password (with Authentication Verification)
export async function resetPassword(req, res) {
	try {
		const {
			user_name,
			current_password,
			admin_security_key,
			new_password,
			confirm_password,
		} = req.body;

		if (!user_name || !new_password) {
			return res.status(400).json({
				message: "Username and new password are required.",
			});
		}

		if (!current_password && !admin_security_key) {
			return res.status(400).json({
				message:
					"Authentication required: Please provide current password or admin security key.",
			});
		}

		if (confirm_password && new_password !== confirm_password) {
			return res.status(400).json({
				message: "New passwords do not match. Please re-enter.",
			});
		}

		if (new_password.length < 4) {
			return res.status(400).json({
				message: "New password must be at least 4 characters long.",
			});
		}

		// Look up user by username (support @mussa and mussa)
		let user = await getUserByUsername(user_name);
		if (!user) {
			const altName = user_name.startsWith("@")
				? user_name.substring(1)
				: `@${user_name}`;
			user = await getUserByUsername(altName);
		}

		if (!user) {
			return res.status(404).json({
				message: `Admin user '${user_name}' not found.`,
			});
		}

		// AUTHENTICATION CHECK: Verify current password or admin security key
		let isAuthorized = false;

		// 1. Check admin security key (master key)
		if (admin_security_key && admin_security_key === "APPLE-ADMIN-2026") {
			isAuthorized = true;
		}

		// 2. Check current password against bcrypt hash or plain fallback
		if (!isAuthorized && current_password) {
			if (user.user_password && user.user_password.startsWith("$2")) {
				isAuthorized = await bcrypt.compare(
					current_password,
					user.user_password,
				);
			} else {
				isAuthorized = user.user_password === current_password;
			}
		}

		if (!isAuthorized) {
			return res.status(401).json({
				message:
					"Authentication Failed: Current password or security key is incorrect.",
			});
		}

		// Hash new password using bcrypt
		const hashedPassword = await bcrypt.hash(new_password, 10);

		// Update in database
		await updateUserById(user.user_id, user.user_name, hashedPassword);

		res.status(200).json({
			message: `Authentication verified! Password reset successfully for admin '${user.user_name}'.`,
			user_id: user.user_id,
			user_name: user.user_name,
		});
	} catch (error) {
		console.log("Error during password reset:", error);
		res.status(500).json({
			message: "Failed to reset password. Please try again.",
		});
	}
}

export async function insertUser(req, res) {
	try {
		const { user_name, user_password } = req.body;

		if (!user_name || !user_password) {
			return res.status(400).json({
				message: "Username and password are required.",
			});
		}

		// Hash password before saving to DB
		const hashedPassword = await bcrypt.hash(user_password, 10);
		const user = await createUser(user_name, hashedPassword);

		res.status(200).json({
			message: "User created successfully with hashed password",
			user,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to create user",
		});
	}
}

export async function fetchUsers(req, res) {
	try {
		const users = await getUsers();

		res.status(200).json({
			message: "Users retrieved successfully",
			users,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve users",
		});
	}
}

export async function fetchUserById(req, res) {
	try {
		const { user_id } = req.params;
		const user = await getUserById(user_id);

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		res.status(200).json({
			message: "User retrieved successfully",
			user,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve user",
		});
	}
}

// ! Update User
export async function updateUser(req, res) {
	try {
		const { user_id } = req.params;
		const { user_name, user_password } = req.body;

		const result = await updateUserById(user_id, user_name, user_password);

		res.status(200).json({
			message: "User updated successfully",
			result,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to update user",
		});
	}
}

//! Delete User
export async function deleteUser(req, res) {
	try {
		const { user_id } = req.params;
		const result = await deleteUserById(user_id);

		res.status(200).json({
			message: "User deleted successfully",
			result,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to delete user",
		});
	}
}
