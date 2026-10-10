import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function AddProduct() {
	const [adminUser, setAdminUser] = useState(() => {
		const saved = localStorage.getItem("admin_user");
		return saved ? JSON.parse(saved) : null;
	});

	// Login & Reset State (starts empty, user enters credentials)
	const [credentials, setCredentials] = useState({
		user_name: "",
		user_password: "",
	});
	const [isResetMode, setIsResetMode] = useState(false);
	const [resetData, setResetData] = useState({
		user_name: "",
		current_password: "",
		new_password: "",
		confirm_password: "",
	});

	// Show / Hide Password Toggles
	const [showLoginPassword, setShowLoginPassword] = useState(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [loginLoading, setLoginLoading] = useState(false);
	const [loginError, setLoginError] = useState("");
	const [resetSuccess, setResetSuccess] = useState("");

	// Product Form State
	const [formData, setFormData] = useState({
		product_name: "",
		product_url: "",
		product_brief_description: "",
		product_description: "",
		product_img: "",
		product_link: "",
		starting_price: "",
		price_range: "",
	});

	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState({ type: "", message: "" });

	useEffect(() => {
		const checkAuth = () => {
			const saved = localStorage.getItem("admin_user");
			setAdminUser(saved ? JSON.parse(saved) : null);
		};
		window.addEventListener("storage", checkAuth);
		window.addEventListener("admin_auth_change", checkAuth);
		return () => {
			window.removeEventListener("storage", checkAuth);
			window.removeEventListener("admin_auth_change", checkAuth);
		};
	}, []);

	// Handle Admin Login
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoginLoading(true);
		setLoginError("");
		setResetSuccess("");

		try {
			const res = await api.post("/users/login", credentials);
			const userData = res.data?.user || {
				user_id: 1,
				user_name: credentials.user_name,
			};

			localStorage.setItem("admin_user", JSON.stringify(userData));
			setAdminUser(userData);
			window.dispatchEvent(new Event("admin_auth_change"));
		} catch (err) {
			console.error("Login failed:", err);
			// Fallback check if default admin credentials match
			if (
				(credentials.user_name === "@mussa" || credentials.user_name === "mussa" || credentials.user_name === "abebe") &&
				(credentials.user_password === "123456" || credentials.user_password === "$%6y&*@!9")
			) {
				const fallbackUser = { user_id: 1, user_name: credentials.user_name };
				localStorage.setItem("admin_user", JSON.stringify(fallbackUser));
				setAdminUser(fallbackUser);
				window.dispatchEvent(new Event("admin_auth_change"));
			} else {
				setLoginError(err.response?.data?.message || "Invalid Admin username or password.");
			}
		} finally {
			setLoginLoading(false);
		}
	};

	// Handle Authenticated Password Reset
	const handleResetPassword = async (e) => {
		e.preventDefault();
		setLoginLoading(true);
		setLoginError("");
		setResetSuccess("");

		if (!resetData.current_password) {
			setLoginError("Authentication required: Please enter current password or master key.");
			setLoginLoading(false);
			return;
		}

		if (resetData.new_password !== resetData.confirm_password) {
			setLoginError("New passwords do not match. Please re-enter.");
			setLoginLoading(false);
			return;
		}

		if (resetData.new_password.length < 4) {
			setLoginError("New password must be at least 4 characters long.");
			setLoginLoading(false);
			return;
		}

		try {
			const res = await api.post("/users/reset-password", {
				user_name: resetData.user_name,
				current_password: resetData.current_password,
				new_password: resetData.new_password,
				confirm_password: resetData.confirm_password,
			});

			setResetSuccess(`✅ ${res.data?.message || "Password updated successfully!"}`);
			setCredentials({
				user_name: resetData.user_name,
				user_password: resetData.new_password,
			});
			setResetData({
				user_name: resetData.user_name,
				current_password: "",
				new_password: "",
				confirm_password: "",
			});

			setTimeout(() => {
				setIsResetMode(false);
			}, 1800);
		} catch (err) {
			console.error("Password reset error:", err);
			setLoginError(err.response?.data?.message || "Failed to reset password. Check current password.");
		} finally {
			setLoginLoading(false);
		}
	};

	// Handle Admin Logout
	const handleLogout = () => {
		localStorage.removeItem("admin_user");
		setAdminUser(null);
		window.dispatchEvent(new Event("admin_auth_change"));
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setStatus({ type: "", message: "" });

		try {
			const payload = {
				...formData,
				user_id: adminUser?.user_id || 1,
			};

			const res = await api.post("/add-product", payload);
			setStatus({
				type: "success",
				message: `✅ Product "${formData.product_name}" added successfully to database! (Product ID: ${
					res.data.product_id || "OK"
				})`,
			});
			setFormData({
				product_name: "",
				product_url: "",
				product_brief_description: "",
				product_description: "",
				product_img: "",
				product_link: "",
				starting_price: "",
				price_range: "",
			});
		} catch (err) {
			console.error("Error inserting product:", err);
			setStatus({
				type: "danger",
				message:
					err.response?.data?.message ||
					"❌ Failed to insert product. Please check backend connection.",
			});
		} finally {
			setLoading(false);
		}
	};

	// IF NOT LOGGED IN AS ADMIN: RENDER ADMIN LOGIN / RESET PASSWORD GATE
	if (!adminUser) {
		return (
			<div className="container py-5 my-5" style={{ minHeight: "80vh", paddingTop: "80px" }}>
				<div className="row justify-content-center">
					<div className="col-12 col-md-7 col-lg-5">
						<div
							className="card shadow-lg p-4 p-md-5"
							style={{
								borderRadius: "24px",
								background: "#ffffff",
								border: "1px solid #e5e5ea",
							}}
						>
							<div className="text-center mb-4">
								<div style={{ fontSize: "40px", marginBottom: "8px" }}>
									{isResetMode ? "🔑" : "🔐"}
								</div>
								<h2 className="fw-bold text-dark">
									{isResetMode ? "Reset Admin Password" : "Apple Internal Admin"}
								</h2>
								<p className="text-muted small">
									{isResetMode
										? "Authentication required. Enter current credentials to set new password."
										: "Only internal administrators can add or manage products."}
								</p>
							</div>

							{loginError && (
								<div className="alert alert-danger text-center small py-2" role="alert">
									{loginError}
								</div>
							)}

							{resetSuccess && (
								<div className="alert alert-success text-center small py-2" role="alert">
									{resetSuccess}
								</div>
							)}

							{isResetMode ? (
								/* AUTHENTICATED RESET PASSWORD FORM */
								<form onSubmit={handleResetPassword}>
									{/* Admin Username */}
									<div className="mb-3">
										<label className="form-label fw-semibold small text-muted">Admin Username</label>
										<input
											type="text"
											className="form-control py-2"
											value={resetData.user_name}
											onChange={(e) =>
												setResetData({ ...resetData, user_name: e.target.value })
											}
											required
											placeholder="e.g. @mussa"
										/>
									</div>

									{/* Authentication: Current Password or Master Key */}
									<div className="mb-3">
										<div className="d-flex justify-content-between align-items-center mb-1">
											<label className="form-label fw-semibold small text-muted mb-0">
												Current Password or Master Key *
											</label>
										</div>
										<div className="input-group">
											<input
												type={showCurrentPassword ? "text" : "password"}
												className="form-control py-2 border-end-0"
												value={resetData.current_password}
												onChange={(e) =>
													setResetData({ ...resetData, current_password: e.target.value })
												}
												required
												placeholder="Enter current password or master key"
											/>
											<button
												type="button"
												className="btn btn-outline-secondary border-start-0 bg-white"
												onClick={() => setShowCurrentPassword(!showCurrentPassword)}
												title={showCurrentPassword ? "Hide password" : "Show password"}
											>
												{showCurrentPassword ? "🙈" : "👁️"}
											</button>
										</div>
										<small className="text-muted" style={{ fontSize: "11px" }}>
											Master key fallback: <code>APPLE-ADMIN-2026</code>
										</small>
									</div>

									{/* New Password */}
									<div className="mb-3">
										<label className="form-label fw-semibold small text-muted">New Password *</label>
										<div className="input-group">
											<input
												type={showNewPassword ? "text" : "password"}
												className="form-control py-2 border-end-0"
												value={resetData.new_password}
												onChange={(e) =>
													setResetData({ ...resetData, new_password: e.target.value })
												}
												required
												placeholder="Enter new password"
											/>
											<button
												type="button"
												className="btn btn-outline-secondary border-start-0 bg-white"
												onClick={() => setShowNewPassword(!showNewPassword)}
												title={showNewPassword ? "Hide password" : "Show password"}
											>
												{showNewPassword ? "🙈" : "👁️"}
											</button>
										</div>
									</div>

									{/* Confirm New Password */}
									<div className="mb-4">
										<label className="form-label fw-semibold small text-muted">
											Confirm New Password *
										</label>
										<div className="input-group">
											<input
												type={showConfirmPassword ? "text" : "password"}
												className="form-control py-2 border-end-0"
												value={resetData.confirm_password}
												onChange={(e) =>
													setResetData({ ...resetData, confirm_password: e.target.value })
												}
												required
												placeholder="Confirm new password"
											/>
											<button
												type="button"
												className="btn btn-outline-secondary border-start-0 bg-white"
												onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												title={showConfirmPassword ? "Hide password" : "Show password"}
											>
												{showConfirmPassword ? "🙈" : "👁️"}
											</button>
										</div>
									</div>

									<button
										type="submit"
										disabled={loginLoading}
										className="btn btn-primary w-100 py-2 rounded-pill fw-semibold mb-3"
										style={{ background: "#0071e3", borderColor: "#0071e3" }}
									>
										{loginLoading ? "Verifying & Updating..." : "Verify & Update Password"}
									</button>

									<button
										type="button"
										className="btn btn-outline-secondary w-100 py-2 rounded-pill fw-semibold small"
										onClick={() => {
											setIsResetMode(false);
											setLoginError("");
										}}
									>
										&larr; Back to Sign In
									</button>
								</form>
							) : (
								/* LOGIN FORM WITH SHOW/HIDE PASSWORD TOGGLE */
								<form onSubmit={handleLogin}>
									<div className="mb-3">
										<label className="form-label fw-semibold small text-muted">Admin Username</label>
										<input
											type="text"
											className="form-control py-2"
											value={credentials.user_name}
											onChange={(e) =>
												setCredentials({ ...credentials, user_name: e.target.value })
											}
											required
											placeholder="e.g. @mussa"
										/>
									</div>

									<div className="mb-4">
										<div className="d-flex justify-content-between align-items-center mb-1">
											<label className="form-label fw-semibold small text-muted mb-0">
												Admin Password
											</label>
											<button
												type="button"
												className="btn btn-link p-0 text-decoration-none small"
												style={{ color: "#0071e3", fontSize: "12px" }}
												onClick={() => {
													setIsResetMode(true);
													setLoginError("");
												}}
											>
												Reset Password?
											</button>
										</div>
										<div className="input-group">
											<input
												type={showLoginPassword ? "text" : "password"}
												className="form-control py-2 border-end-0"
												value={credentials.user_password}
												onChange={(e) =>
													setCredentials({ ...credentials, user_password: e.target.value })
												}
												required
												placeholder="Password"
											/>
											<button
												type="button"
												className="btn btn-outline-secondary border-start-0 bg-white"
												onClick={() => setShowLoginPassword(!showLoginPassword)}
												title={showLoginPassword ? "Hide password" : "Show password"}
											>
												{showLoginPassword ? "🙈" : "👁️"}
											</button>
										</div>
									</div>

									<button
										type="submit"
										disabled={loginLoading}
										className="btn btn-primary w-100 py-2 rounded-pill fw-semibold"
										style={{ background: "#0071e3", borderColor: "#0071e3" }}
									>
										{loginLoading ? "Authenticating..." : "Sign in as Admin"}
									</button>

									<div className="text-center mt-4">
										<Link to="/" className="text-muted small text-decoration-none">
											&larr; Return to Customer Store
										</Link>
									</div>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	// IF LOGGED IN: RENDER ADD PRODUCT FORM
	return (
		<div className="container py-5 my-5" style={{ minHeight: "80vh", paddingTop: "80px" }}>
			<div className="row justify-content-center">
				<div className="col-12 col-md-9 col-lg-7">
					<div
						className="card shadow-lg p-4 p-md-5"
						style={{
							borderRadius: "24px",
							background: "#ffffff",
							border: "1px solid #e5e5ea",
						}}
					>
						{/* Admin Status Bar */}
						<div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
							<div>
								<span className="badge bg-success-subtle text-success me-2">● Admin Active</span>
								<span className="text-muted small">
									Logged in: <strong className="text-dark">{adminUser.user_name}</strong> (ID:{" "}
									{adminUser.user_id})
								</span>
							</div>
							<button
								onClick={handleLogout}
								className="btn btn-sm btn-outline-danger rounded-pill px-3"
								style={{ fontSize: "12px" }}
							>
								Log Out
							</button>
						</div>

						<h2 className="text-center mb-2 font-weight-bold" style={{ fontWeight: "700" }}>
							Add New Product
						</h2>
						<p className="text-center text-muted small mb-4">
							Insert records into MySQL product, description, and price tables.
						</p>

						{status.message && (
							<div className={`alert alert-${status.type} text-center`} role="alert">
								{status.message}
							</div>
						)}

						<form onSubmit={handleSubmit}>
							{/* Product Name */}
							<div className="mb-3">
								<label className="form-label fw-semibold">Product Name *</label>
								<input
									type="text"
									name="product_name"
									value={formData.product_name}
									onChange={handleChange}
									className="form-control"
									placeholder="e.g. iPhone 16 Pro Max"
									required
								/>
							</div>

							{/* Product URL / Slug */}
							<div className="mb-3">
								<label className="form-label fw-semibold">Product URL / Slug</label>
								<input
									type="text"
									name="product_url"
									value={formData.product_url}
									onChange={handleChange}
									className="form-control"
									placeholder="e.g. iphone-16-pro-max"
								/>
							</div>

							{/* Brief Description */}
							<div className="mb-3">
								<label className="form-label fw-semibold">Brief Description</label>
								<input
									type="text"
									name="product_brief_description"
									value={formData.product_brief_description}
									onChange={handleChange}
									className="form-control"
									placeholder="e.g. Built for Apple Intelligence."
									required
								/>
							</div>

							{/* Full Description */}
							<div className="mb-3">
								<label className="form-label fw-semibold">Full Description</label>
								<textarea
									name="product_description"
									value={formData.product_description}
									onChange={handleChange}
									rows="3"
									className="form-control"
									placeholder="Comprehensive product specifications, features, and hardware description"
									required
								></textarea>
							</div>

							{/* Image URL */}
							<div className="mb-3">
								<label className="form-label fw-semibold">Image URL *</label>
								<input
									type="url"
									name="product_img"
									value={formData.product_img}
									onChange={handleChange}
									className="form-control"
									placeholder="https://.../image.jpg"
									required
								/>
							</div>

							{/* Product Link */}
							<div className="mb-3">
								<label className="form-label fw-semibold">Product Link</label>
								<input
									type="url"
									name="product_link"
									value={formData.product_link}
									onChange={handleChange}
									className="form-control"
									placeholder="https://www.apple.com/iphone"
								/>
							</div>

							{/* Starting Price & Price Range */}
							<div className="row mb-4">
								<div className="col-6">
									<label className="form-label fw-semibold">Starting Price *</label>
									<input
										type="text"
										name="starting_price"
										value={formData.starting_price}
										onChange={handleChange}
										className="form-control"
										placeholder="$1,199"
										required
									/>
								</div>
								<div className="col-6">
									<label className="form-label fw-semibold">Price Range</label>
									<input
										type="text"
										name="price_range"
										value={formData.price_range}
										onChange={handleChange}
										className="form-control"
										placeholder="From $49.95/mo."
										required
									/>
								</div>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={loading}
								className="btn btn-primary w-100 py-3 rounded-pill fw-semibold"
								style={{ background: "#0071e3", borderColor: "#0071e3" }}
							>
								{loading ? (
									<>
										<span
											className="spinner-border spinner-border-sm me-2"
											role="status"
											aria-hidden="true"
										></span>
										Inserting Product to Database...
									</>
								) : (
									"Submit Product to Database"
								)}
							</button>

							<div className="text-center mt-3">
								<Link
									to="/iphone"
									className="text-decoration-none small"
									style={{ color: "#0071e3" }}
								>
									&larr; View all live iPhones on store
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddProduct;
