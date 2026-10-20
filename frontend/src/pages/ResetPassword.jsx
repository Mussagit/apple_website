import React, { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function ResetPassword() {
	const [formData, setFormData] = useState({
		user_name: "",
		current_password: "",
		new_password: "",
		confirm_password: "",
	});

	// Password Visibility Toggles
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState({ type: "", message: "" });
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleReset = async (e) => {
		e.preventDefault();
		setLoading(true);
		setStatus({ type: "", message: "" });

		if (!formData.current_password) {
			setStatus({
				type: "danger",
				message: "❌ Authentication required: Please enter current password or master key.",
			});
			setLoading(false);
			return;
		}

		if (formData.new_password !== formData.confirm_password) {
			setStatus({
				type: "danger",
				message: "❌ New passwords do not match. Please re-enter.",
			});
			setLoading(false);
			return;
		}

		if (formData.new_password.length < 4) {
			setStatus({
				type: "danger",
				message: "❌ Password must be at least 4 characters long.",
			});
			setLoading(false);
			return;
		}

		try {
			const res = await api.post("/users/reset-password", {
				user_name: formData.user_name,
				current_password: formData.current_password,
				new_password: formData.new_password,
				confirm_password: formData.confirm_password,
			});

			setStatus({
				type: "success",
				message: `✅ ${res.data?.message || "Password updated successfully!"}`,
			});

			setTimeout(() => {
				navigate("/add-product");
			}, 1800);
		} catch (err) {
			console.error("Error resetting password:", err);
			setStatus({
				type: "danger",
				message:
					err.response?.data?.message ||
					"❌ Failed to reset password. Please check current password or master key.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="apple-admin-section d-flex align-items-center">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 col-lg-6 col-xl-5">
						<div className="apple-admin-card">
							<div className="text-center mb-4">
								<div className="apple-admin-icon-circle">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "28px", height: "28px" }}>
										<path d="M21 2l-2 2m-1.5 1.5L16 7l-2-2m-1.5 1.5L11 8l-2-2m-1.5 1.5L6 9l-2-2"></path>
										<circle cx="7.5" cy="16.5" r="4.5"></circle>
										<path d="M10.5 13.5L21.5 2.5"></path>
									</svg>
								</div>
								<h2 className="apple-admin-title">Reset Admin Password</h2>
								<p className="apple-admin-subtitle">
									Authentication verification required. Passwords are encrypted with secure bcrypt hashing.
								</p>
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

							<form onSubmit={handleReset}>
								{/* Username */}
								<div className="mb-3">
									<label className="apple-form-label">
										Admin Username <span className="apple-form-label-muted">(@mussa)</span>
									</label>
									<div className="apple-input-container">
										<span className="input-icon-left">
											<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
												<circle cx="12" cy="7" r="4"></circle>
											</svg>
										</span>
										<input
											type="text"
											name="user_name"
											className="apple-input has-left-icon"
											value={formData.user_name}
											onChange={handleChange}
											required
											placeholder="e.g. @mussa"
											autoComplete="username"
										/>
									</div>
								</div>

								{/* Current Password / Security Key */}
								<div className="mb-3">
									<label className="apple-form-label">
										Current Password or Master Key
									</label>
									<div className="apple-input-container mb-1">
										<span className="input-icon-left">
											<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
												<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
											</svg>
										</span>
										<input
											type={showCurrentPassword ? "text" : "password"}
											name="current_password"
											className="apple-input has-left-icon has-right-icon"
											value={formData.current_password}
											onChange={handleChange}
											required
											placeholder="Current password or master key"
										/>
										<button
											type="button"
											className="apple-password-toggle"
											onClick={() => setShowCurrentPassword(!showCurrentPassword)}
											title={showCurrentPassword ? "Hide password" : "Show password"}
										>
											{showCurrentPassword ? (
												<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
													<line x1="1" y1="1" x2="23" y2="23"></line>
												</svg>
											) : (
												<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
													<circle cx="12" cy="12" r="3"></circle>
												</svg>
											)}
										</button>
									</div>
									<small className="text-muted" style={{ fontSize: "11px" }}>
										Master fallback key: <code style={{ background: "#f5f5f7", padding: "2px 6px", borderRadius: "4px" }}>APPLE-ADMIN-2026</code>
									</small>
								</div>

								{/* New Password */}
								<div className="mb-3">
									<label className="apple-form-label">New Password</label>
									<div className="apple-input-container">
										<span className="input-icon-left">
											<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
											</svg>
										</span>
										<input
											type={showNewPassword ? "text" : "password"}
											name="new_password"
											className="apple-input has-left-icon has-right-icon"
											value={formData.new_password}
											onChange={handleChange}
											required
											placeholder="Enter new password (min. 4 characters)"
										/>
										<button
											type="button"
											className="apple-password-toggle"
											onClick={() => setShowNewPassword(!showNewPassword)}
											title={showNewPassword ? "Hide password" : "Show password"}
										>
											{showNewPassword ? (
												<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
													<line x1="1" y1="1" x2="23" y2="23"></line>
												</svg>
											) : (
												<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
													<circle cx="12" cy="12" r="3"></circle>
												</svg>
											)}
										</button>
									</div>
								</div>

								{/* Confirm New Password */}
								<div className="mb-4">
									<label className="apple-form-label">Confirm New Password</label>
									<div className="apple-input-container">
										<span className="input-icon-left">
											<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<polyline points="20 6 9 17 4 12"></polyline>
											</svg>
										</span>
										<input
											type={showConfirmPassword ? "text" : "password"}
											name="confirm_password"
											className="apple-input has-left-icon has-right-icon"
											value={formData.confirm_password}
											onChange={handleChange}
											required
											placeholder="Confirm new password"
										/>
										<button
											type="button"
											className="apple-password-toggle"
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
											title={showConfirmPassword ? "Hide password" : "Show password"}
										>
											{showConfirmPassword ? (
												<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
													<line x1="1" y1="1" x2="23" y2="23"></line>
												</svg>
											) : (
												<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
													<circle cx="12" cy="12" r="3"></circle>
												</svg>
											)}
										</button>
									</div>
								</div>

								<button
									type="submit"
									disabled={loading}
									className="apple-btn-primary"
								>
									{loading ? (
										<>
											<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
											<span>Verifying & Updating...</span>
										</>
									) : (
										<>
											<span>Update Admin Password</span>
											<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline>
											</svg>
										</>
									)}
								</button>

								<div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
									<Link to="/login" className="text-muted small text-decoration-none">
										&larr; Back to Admin Sign In
									</Link>
									<Link to="/" className="text-muted small text-decoration-none">
										Customer Store
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResetPassword;

