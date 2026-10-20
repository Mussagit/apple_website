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
	// IF NOT LOGGED IN AS ADMIN: RENDER ADMIN LOGIN / RESET PASSWORD GATE
	if (!adminUser) {
		return (
			<div className="apple-admin-section d-flex align-items-center">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-md-8 col-lg-5 col-xl-4">
							<div className="apple-admin-card">
								<div className="text-center mb-4">
									<div className="apple-admin-icon-circle">
										<svg viewBox="0 0 170 170" fill="currentColor">
											<path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.66-7.86-11.9-14.34-6.42-9.78-11.39-20.97-14.92-33.56-3.53-12.59-5.3-24.37-5.3-35.34 0-14.68 3.65-26.69 10.96-36.03 7.31-9.33 16.5-14.07 27.57-14.22 5.07 0 10.51 1.34 16.32 4.02 5.81 2.68 9.58 4.07 11.31 4.17 1.45 0 5.42-1.48 11.91-4.43 6.49-2.95 12.06-4.32 16.71-4.11 12.72.63 22.84 5.37 30.36 14.22-11.09 6.72-16.52 16.03-16.3 27.93.22 9.54 3.96 17.56 11.22 24.05 7.26 6.49 15.93 10.08 26.01 10.77-2.31 7.21-5.18 14.44-8.62 21.68zM119.22 31.84c0-7.39 2.67-14.39 8.01-21 5.34-6.61 11.96-10.42 19.86-11.44.11 1.05.16 2.06.16 3.02 0 7.32-2.81 14.41-8.43 21.27-5.62 6.86-12.44 10.77-20.46 11.73-.22-1.16-.34-2.18-.34-3.08z" />
										</svg>
									</div>
									<h2 className="apple-admin-title">
										{isResetMode ? "Reset Credentials" : "Apple Internal Admin"}
									</h2>
									<p className="apple-admin-subtitle">
										{isResetMode
											? "Enter current credentials or master key to reset password."
											: "Administrative privileges required to manage catalog products."}
									</p>
								</div>

								{loginError && (
									<div className="apple-alert apple-alert-danger" role="alert">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<circle cx="12" cy="12" r="10"></circle>
											<line x1="12" y1="8" x2="12" y2="12"></line>
											<line x1="12" y1="16" x2="12.01" y2="16"></line>
										</svg>
										<div>{loginError}</div>
									</div>
								)}

								{resetSuccess && (
									<div className="apple-alert apple-alert-success" role="alert">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<polyline points="20 6 9 17 4 12"></polyline>
										</svg>
										<div>{resetSuccess}</div>
									</div>
								)}

								{isResetMode ? (
									/* RESET PASSWORD FORM */
									<form onSubmit={handleResetPassword}>
										<div className="mb-3">
											<label className="apple-form-label">Admin Username</label>
											<div className="apple-input-container">
												<span className="input-icon-left">
													<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
														<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
														<circle cx="12" cy="7" r="4"></circle>
													</svg>
												</span>
												<input
													type="text"
													className="apple-input has-left-icon"
													value={resetData.user_name}
													onChange={(e) =>
														setResetData({ ...resetData, user_name: e.target.value })
													}
													required
													placeholder="e.g. @mussa"
												/>
											</div>
										</div>

										<div className="mb-3">
											<label className="apple-form-label">Current Password or Master Key</label>
											<div className="apple-input-container mb-1">
												<span className="input-icon-left">
													<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
														<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
														<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
													</svg>
												</span>
												<input
													type={showCurrentPassword ? "text" : "password"}
													className="apple-input has-left-icon has-right-icon"
													value={resetData.current_password}
													onChange={(e) =>
														setResetData({ ...resetData, current_password: e.target.value })
													}
													required
													placeholder="Current password"
												/>
												<button
													type="button"
													className="apple-password-toggle"
													onClick={() => setShowCurrentPassword(!showCurrentPassword)}
												>
													{showCurrentPassword ? (
														<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
													) : (
														<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
													)}
												</button>
											</div>
											<small className="text-muted" style={{ fontSize: "11px" }}>
												Master fallback: <code style={{ background: "#f5f5f7", padding: "1px 5px" }}>APPLE-ADMIN-2026</code>
											</small>
										</div>

										<div className="mb-3">
											<label className="apple-form-label">New Password</label>
											<div className="apple-input-container">
												<span className="input-icon-left">
													<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
												</span>
												<input
													type={showNewPassword ? "text" : "password"}
													className="apple-input has-left-icon has-right-icon"
													value={resetData.new_password}
													onChange={(e) =>
														setResetData({ ...resetData, new_password: e.target.value })
													}
													required
													placeholder="New password (min 4 chars)"
												/>
												<button
													type="button"
													className="apple-password-toggle"
													onClick={() => setShowNewPassword(!showNewPassword)}
												>
													{showNewPassword ? (
														<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
													) : (
														<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
													)}
												</button>
											</div>
										</div>

										<div className="mb-4">
											<label className="apple-form-label">Confirm New Password</label>
											<div className="apple-input-container">
												<span className="input-icon-left">
													<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
												</span>
												<input
													type={showConfirmPassword ? "text" : "password"}
													className="apple-input has-left-icon has-right-icon"
													value={resetData.confirm_password}
													onChange={(e) =>
														setResetData({ ...resetData, confirm_password: e.target.value })
													}
													required
													placeholder="Repeat new password"
												/>
												<button
													type="button"
													className="apple-password-toggle"
													onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												>
													{showConfirmPassword ? (
														<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
													) : (
														<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
													)}
												</button>
											</div>
										</div>

										<button
											type="submit"
											disabled={loginLoading}
											className="apple-btn-primary mb-3"
										>
											{loginLoading ? "Updating..." : "Update Password"}
										</button>

										<button
											type="button"
											className="apple-btn-secondary"
											onClick={() => {
												setIsResetMode(false);
												setLoginError("");
											}}
										>
											&larr; Back to Admin Sign In
										</button>
									</form>
								) : (
									/* LOGIN FORM */
									<form onSubmit={handleLogin}>
										<div className="mb-3">
											<label className="apple-form-label">
												Admin Username <span className="apple-form-label-muted">(@mussa)</span>
											</label>
											<div className="apple-input-container">
												<span className="input-icon-left">
													<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
												</span>
												<input
													type="text"
													className="apple-input has-left-icon"
													value={credentials.user_name}
													onChange={(e) =>
														setCredentials({ ...credentials, user_name: e.target.value })
													}
													required
													placeholder="e.g. @mussa"
													autoComplete="username"
												/>
											</div>
										</div>

										<div className="mb-4">
											<div className="d-flex justify-content-between align-items-center mb-1">
												<label className="apple-form-label mb-0">Admin Password</label>
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
											<div className="apple-input-container">
												<span className="input-icon-left">
													<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
												</span>
												<input
													type={showLoginPassword ? "text" : "password"}
													className="apple-input has-left-icon has-right-icon"
													value={credentials.user_password}
													onChange={(e) =>
														setCredentials({ ...credentials, user_password: e.target.value })
													}
													required
													placeholder="Password"
													autoComplete="current-password"
												/>
												<button
													type="button"
													className="apple-password-toggle"
													onClick={() => setShowLoginPassword(!showLoginPassword)}
												>
													{showLoginPassword ? (
														<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
													) : (
														<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
													)}
												</button>
											</div>
										</div>

										<button
											type="submit"
											disabled={loginLoading}
											className="apple-btn-primary"
										>
											{loginLoading ? "Authenticating..." : "Sign in with Apple Admin"}
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
			</div>
		);
	}

	// IF LOGGED IN: RENDER FULL APPLE ENTERPRISE PRODUCT CATALOG MANAGER
	return (
		<div className="apple-admin-section">
			<div className="container">
				{/* Top Apple Admin Bar */}
				<div className="d-flex flex-wrap justify-content-between align-items-center mb-4 p-3 bg-white rounded-4 border shadow-sm">
					<div className="d-flex align-items-center gap-3">
						<div className="apple-admin-icon-circle m-0" style={{ width: "42px", height: "42px", borderRadius: "12px" }}>
							<svg viewBox="0 0 170 170" fill="currentColor" style={{ width: "22px", height: "22px" }}>
								<path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.66-7.86-11.9-14.34-6.42-9.78-11.39-20.97-14.92-33.56-3.53-12.59-5.3-24.37-5.3-35.34 0-14.68 3.65-26.69 10.96-36.03 7.31-9.33 16.5-14.07 27.57-14.22 5.07 0 10.51 1.34 16.32 4.02 5.81 2.68 9.58 4.07 11.31 4.17 1.45 0 5.42-1.48 11.91-4.43 6.49-2.95 12.06-4.32 16.71-4.11 12.72.63 22.84 5.37 30.36 14.22-11.09 6.72-16.52 16.03-16.3 27.93.22 9.54 3.96 17.56 11.22 24.05 7.26 6.49 15.93 10.08 26.01 10.77-2.31 7.21-5.18 14.44-8.62 21.68zM119.22 31.84c0-7.39 2.67-14.39 8.01-21 5.34-6.61 11.96-10.42 19.86-11.44.11 1.05.16 2.06.16 3.02 0 7.32-2.81 14.41-8.43 21.27-5.62 6.86-12.44 10.77-20.46 11.73-.22-1.16-.34-2.18-.34-3.08z" />
							</svg>
						</div>
						<div>
							<h5 className="m-0 fw-bold text-dark">Apple Store Catalog Console</h5>
							<div className="d-flex align-items-center gap-2 mt-1">
								<span className="admin-status-dot"></span>
								<small className="text-muted">
									Admin Session: <strong className="text-dark">{adminUser.user_name}</strong> (ID: {adminUser.user_id})
								</small>
							</div>
						</div>
					</div>
					<div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
						<Link to="/iphone" className="apple-btn-secondary" style={{ padding: "6px 14px", fontSize: "12px", width: "auto" }}>
							View Live Store &rarr;
						</Link>
						<button onClick={handleLogout} className="apple-btn-danger-outline">
							Sign Out
						</button>
					</div>
				</div>

				{status.message && (
					<div className={`apple-alert ${status.type === "success" ? "apple-alert-success" : "apple-alert-danger"}`} role="alert">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							{status.type === "success" ? (
								<polyline points="20 6 9 17 4 12"></polyline>
							) : (
								<>
									<circle cx="12" cy="12" r="10"></circle>
									<line x1="12" y1="8" x2="12" y2="12"></line>
									<line x1="12" y1="16" x2="12.01" y2="16"></line>
								</>
							)}
						</svg>
						<div>{status.message}</div>
					</div>
				)}

				<div className="row g-4">
					{/* FORM COLUMN */}
					<div className="col-12 col-xl-7">
						<div className="apple-admin-card p-4 p-md-5">
							<h3 className="apple-admin-title" style={{ fontSize: "22px" }}>Add Product to Catalog</h3>
							<p className="apple-admin-subtitle mb-4">
								Insert product specifications, marketing copy, pricing, and visual media into database.
							</p>

							<form onSubmit={handleSubmit}>
								{/* 1. Identity */}
								<div className="row g-3 mb-3">
									<div className="col-12 col-md-6">
										<label className="apple-form-label">Product Name *</label>
										<input
											type="text"
											name="product_name"
											value={formData.product_name}
											onChange={handleChange}
											className="apple-input"
											placeholder="e.g. iPhone 16 Pro Max"
											required
										/>
									</div>
									<div className="col-12 col-md-6">
										<label className="apple-form-label">Product URL / Slug *</label>
										<input
											type="text"
											name="product_url"
											value={formData.product_url}
											onChange={handleChange}
											className="apple-input"
											placeholder="e.g. iphone-16-pro-max"
											required
										/>
									</div>
								</div>

								{/* 2. Marketing Tagline & Descriptions */}
								<div className="mb-3">
									<label className="apple-form-label">Brief Description (Tagline) *</label>
									<input
										type="text"
										name="product_brief_description"
										value={formData.product_brief_description}
										onChange={handleChange}
										className="apple-input"
										placeholder="e.g. Built for Apple Intelligence. Titaniuim design."
										required
									/>
								</div>

								<div className="mb-3">
									<label className="apple-form-label">Full Product Description & Hardware Specs *</label>
									<textarea
										name="product_description"
										value={formData.product_description}
										onChange={handleChange}
										rows="3"
										className="apple-input"
										placeholder="Comprehensive hardware architecture, camera system, chip performance, battery life, and materials..."
										required
										style={{ resize: "vertical" }}
									></textarea>
								</div>

								{/* 3. Media & Store Links */}
								<div className="row g-3 mb-3">
									<div className="col-12 col-md-6">
										<label className="apple-form-label">Product Image URL *</label>
										<input
											type="url"
											name="product_img"
											value={formData.product_img}
											onChange={handleChange}
											className="apple-input"
											placeholder="https://.../product.png"
											required
										/>
									</div>
									<div className="col-12 col-md-6">
										<label className="apple-form-label">Apple Store Landing Link</label>
										<input
											type="url"
											name="product_link"
											value={formData.product_link}
											onChange={handleChange}
											className="apple-input"
											placeholder="https://www.apple.com/iphone"
										/>
									</div>
								</div>

								{/* 4. Pricing */}
								<div className="row g-3 mb-4">
									<div className="col-12 col-md-6">
										<label className="apple-form-label">Starting Price *</label>
										<input
											type="text"
											name="starting_price"
											value={formData.starting_price}
											onChange={handleChange}
											className="apple-input"
											placeholder="$1,199"
											required
										/>
									</div>
									<div className="col-12 col-md-6">
										<label className="apple-form-label">Price Range / Monthly Plan *</label>
										<input
											type="text"
											name="price_range"
											value={formData.price_range}
											onChange={handleChange}
											className="apple-input"
											placeholder="From $49.95/mo. or $1,199"
											required
										/>
									</div>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									disabled={loading}
									className="apple-btn-primary py-3"
								>
									{loading ? (
										<>
											<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
											Writing to MySQL Database...
										</>
									) : (
										<>
											<span>Publish Product to Store Catalog</span>
											<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
												<polyline points="20 6 9 17 4 12"></polyline>
											</svg>
										</>
									)}
								</button>
							</form>
						</div>
					</div>

					{/* LIVE APPLE STORE PREVIEW COLUMN */}
					<div className="col-12 col-xl-5">
						<div style={{ position: "sticky", top: "100px" }}>
							<div className="apple-preview-box">
								<div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
									<span className="apple-preview-tag">Storefront Preview</span>
									<span className="badge bg-light text-muted border">Live Sync</span>
								</div>

								<div className="apple-preview-tag">New</div>
								<h3 className="apple-preview-title">
									{formData.product_name || "iPhone 16 Pro"}
								</h3>
								<p className="apple-preview-desc">
									{formData.product_brief_description || "Built for Apple Intelligence. Incredible camera and titanium finish."}
								</p>
								<div className="apple-preview-price">
									{formData.price_range ? formData.price_range : `Starting at ${formData.starting_price || "$1,199"}`}
								</div>

								{/* Image Preview Box */}
								<div className="apple-preview-img-wrapper">
									{formData.product_img ? (
										<img
											src={formData.product_img}
											alt={formData.product_name || "Product Preview"}
											onError={(e) => {
												e.target.onerror = null;
												e.target.src = "https://www.apple.com/v/iphone/home/bv/images/overview/select/iphone_16pro__erly9bvpspea_large.png";
											}}
										/>
									) : (
										<div className="text-muted p-4">
											<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#d2d2d7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
												<rect x="5" y="2" width="14" height="20" rx="3"></rect>
												<line x1="12" y1="18" x2="12.01" y2="18"></line>
											</svg>
											<div style={{ fontSize: "12px" }}>Product image will preview here</div>
										</div>
									)}
								</div>

								<div className="apple-preview-actions">
									<span style={{ cursor: "pointer" }}>Learn more &gt;</span>
									<span style={{ cursor: "pointer" }}>Buy &gt;</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddProduct;

