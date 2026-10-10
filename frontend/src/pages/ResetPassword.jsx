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
		<div className="reset-password-page py-5 my-5" style={{ minHeight: "80vh", paddingTop: "80px" }}>
			<div className="container">
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
								<div style={{ fontSize: "40px", marginBottom: "8px" }}>🔑</div>
								<h2 className="fw-bold text-dark">Reset Admin Password</h2>
								<p className="text-muted small">
									Authentication verification required. Update your password with secure bcrypt hashing.
								</p>
							</div>

							{status.message && (
								<div className={`alert alert-${status.type} text-center small py-2`} role="alert">
									{status.message}
								</div>
							)}

							<form onSubmit={handleReset}>
								{/* Username */}
								<div className="mb-3">
									<label className="form-label fw-semibold small text-muted">Admin Username</label>
									<input
										type="text"
										name="user_name"
										className="form-control py-2"
										value={formData.user_name}
										onChange={handleChange}
										required
										placeholder="e.g. @mussa"
									/>
								</div>

								{/* Current Password / Security Key */}
								<div className="mb-3">
									<label className="form-label fw-semibold small text-muted">
										Current Password or Master Key *
									</label>
									<div className="input-group">
										<input
											type={showCurrentPassword ? "text" : "password"}
											name="current_password"
											className="form-control py-2 border-end-0"
											value={formData.current_password}
											onChange={handleChange}
											required
											placeholder="Current password or master key"
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
											name="new_password"
											className="form-control py-2 border-end-0"
											value={formData.new_password}
											onChange={handleChange}
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
									<label className="form-label fw-semibold small text-muted">Confirm New Password *</label>
									<div className="input-group">
										<input
											type={showConfirmPassword ? "text" : "password"}
											name="confirm_password"
											className="form-control py-2 border-end-0"
											value={formData.confirm_password}
											onChange={handleChange}
											required
											placeholder="Repeat new password"
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
									disabled={loading}
									className="btn btn-primary w-100 py-2 rounded-pill fw-semibold"
									style={{ background: "#0071e3", borderColor: "#0071e3" }}
								>
									{loading ? "Verifying & Resetting..." : "Verify & Update Password"}
								</button>

								<div className="d-flex justify-content-between align-items-center mt-4 pt-2 border-top">
									<Link to="/add-product" className="text-muted small text-decoration-none">
										&larr; Back to Admin Sign In
									</Link>
									<Link to="/" className="text-muted small text-decoration-none">
										Home Store
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
