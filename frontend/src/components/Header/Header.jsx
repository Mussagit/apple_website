import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import applelogo from "../../assets/images/icons/logo-sm.png";
import searchlogo from "../../assets/images/icons/search-icon-sm.png";
import cartlogo from "../../assets/images/icons/cart-sm.png";

function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [adminUser, setAdminUser] = useState(null);
	const [isAccountOpen, setIsAccountOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (!e.target.closest(".apple-account-menu-container")) {
				setIsAccountOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);


	useEffect(() => {
		const checkAdmin = () => {
			const saved = localStorage.getItem("admin_user");
			if (saved) {
				try {
					setAdminUser(JSON.parse(saved));
				} catch {
					setAdminUser(null);
				}
			} else {
				setAdminUser(null);
			}
		};

		checkAdmin();
		window.addEventListener("storage", checkAdmin);
		window.addEventListener("admin_auth_change", checkAdmin);

		return () => {
			window.removeEventListener("storage", checkAdmin);
			window.removeEventListener("admin_auth_change", checkAdmin);
		};
	}, []);

	const toggleNav = () => {
		setIsOpen(!isOpen);
	};

	const closeNav = () => {
		setIsOpen(false);
	};

	const handleLogout = () => {
		localStorage.removeItem("admin_user");
		setAdminUser(null);
		window.dispatchEvent(new Event("admin_auth_change"));
		closeNav();
		navigate("/");
	};

	return (
		<div className="nav-wrapper fixed-top">
			<div className="container">
				<nav className="navbar navbar-expand-md navbar-dark p-0">
					{/* Mobile Toggler */}
					<button
						className="navbar-toggler"
						type="button"
						onClick={toggleNav}
						aria-controls="navbarNav"
						aria-expanded={isOpen}
						aria-label="Toggle navigation"
						style={{ border: "none", outline: "none", padding: "8px" }}
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					{/* Apple Logo */}
					<Link className="navbar-brand mx-auto mx-md-0" to="/" onClick={closeNav}>
						<img src={applelogo} alt="Apple Logo" style={{ height: "20px" }} />
					</Link>

					{/* Nav Links */}
					<div
						className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
						id="navbarNav"
					>
						<ul className="navbar-nav nav-justified w-100 nav-fill align-items-center">
							<li className="nav-item">
								<NavLink
									className={({ isActive }) =>
										`nav-link js-scroll-trigger ${isActive ? "active text-white fw-bold" : ""}`
									}
									to="/mac"
									onClick={closeNav}
								>
									Mac
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) =>
										`nav-link js-scroll-trigger ${isActive ? "active text-white fw-bold" : ""}`
									}
									to="/iphone"
									onClick={closeNav}
								>
									iphone
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) =>
										`nav-link js-scroll-trigger ${isActive ? "active text-white fw-bold" : ""}`
									}
									to="/ipad"
									onClick={closeNav}
								>
									ipad
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) =>
										`nav-link js-scroll-trigger ${isActive ? "active text-white fw-bold" : ""}`
									}
									to="/watch"
									onClick={closeNav}
								>
									watch
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) =>
										`nav-link js-scroll-trigger ${isActive ? "active text-white fw-bold" : ""}`
									}
									to="/tv"
									onClick={closeNav}
								>
									tv
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) =>
										`nav-link js-scroll-trigger ${isActive ? "active text-white fw-bold" : ""}`
									}
									to="/music"
									onClick={closeNav}
								>
									Music
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									className={({ isActive }) =>
										`nav-link js-scroll-trigger ${isActive ? "active text-white fw-bold" : ""}`
									}
									to="/support"
									onClick={closeNav}
								>
									Support
								</NavLink>
							</li>

							<li className="nav-item">
								<Link className="nav-link js-scroll-trigger" to="/search" onClick={closeNav}>
									<img src={searchlogo} alt="Search" style={{ height: "18px" }} />
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link js-scroll-trigger" to="/cart" onClick={closeNav}>
									<img src={cartlogo} alt="Cart" style={{ height: "18px" }} />
								</Link>
							</li>

							{/* Apple Account / Admin Portal Icon & Dropdown */}
							<li className="nav-item apple-account-menu-container position-relative">
								<button
									type="button"
									className="nav-link btn btn-link p-0 border-0 d-flex align-items-center justify-content-center"
									onClick={() => setIsAccountOpen(!isAccountOpen)}
									title={adminUser ? `Apple Admin: ${adminUser.user_name}` : "Apple Account & Admin Portal"}
									style={{
										width: "36px",
										height: "36px",
										color: adminUser ? "#2997ff" : "rgba(255, 255, 255, 0.8)",
										transition: "color 0.2s ease",
									}}
								>
									{adminUser ? (
										<div className="position-relative d-inline-flex align-items-center justify-content-center">
											<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
												<circle cx="12" cy="7" r="4"></circle>
											</svg>
											<span
												style={{
													position: "absolute",
													top: "-2px",
													right: "-2px",
													width: "7px",
													height: "7px",
													backgroundColor: "#34c759",
													borderRadius: "50%",
													boxShadow: "0 0 6px #34c759",
												}}
											></span>
										</div>
									) : (
										<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
											<circle cx="12" cy="7" r="4"></circle>
										</svg>
									)}
								</button>

								{/* Apple ID / Admin Dropdown */}
								{isAccountOpen && (
									<div className="apple-account-dropdown">
										{adminUser ? (
											<div>
												<div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom border-secondary border-opacity-25">
													<span className="admin-status-dot"></span>
													<div>
														<div style={{ fontSize: "11px", color: "#86868b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
															Apple Administrator
														</div>
														<div className="fw-bold text-white" style={{ fontSize: "14px" }}>
															{adminUser.user_name}
														</div>
													</div>
												</div>
												<div className="d-flex flex-column gap-1">
													<Link
														to="/add-product"
														className="apple-account-dropdown-item"
														onClick={() => {
															setIsAccountOpen(false);
															closeNav();
														}}
													>
														<span>Product Console</span>
														<span style={{ color: "#2997ff" }}>&rarr;</span>
													</Link>
													<Link
														to="/iphone"
														className="apple-account-dropdown-item"
														onClick={() => {
															setIsAccountOpen(false);
															closeNav();
														}}
													>
														<span>Live Storefront</span>
													</Link>
													<Link
														to="/reset-password"
														className="apple-account-dropdown-item"
														onClick={() => {
															setIsAccountOpen(false);
															closeNav();
														}}
													>
														<span>Change Password</span>
													</Link>
													<button
														onClick={() => {
															setIsAccountOpen(false);
															handleLogout();
														}}
														className="apple-account-dropdown-item text-danger border-0 bg-transparent text-start w-100 mt-2 pt-2 border-top border-secondary border-opacity-25"
													>
														<span>Sign Out</span>
													</button>
												</div>
											</div>
										) : (
											<div>
												<div className="mb-3 text-start">
													<div style={{ fontSize: "11px", color: "#86868b", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "2px" }}>
														Apple Account
													</div>
													<div className="text-white fw-semibold" style={{ fontSize: "15px" }}>
														Admin Portal
													</div>
													<div style={{ fontSize: "12px", color: "#a1a1a6", marginTop: "4px", lineHeight: "1.4" }}>
														Authorized internal personnel access to catalog & products.
													</div>
												</div>
												<Link
													to="/login"
													className="apple-dropdown-cta-btn mb-2"
													onClick={() => {
														setIsAccountOpen(false);
														closeNav();
													}}
												>
													Sign in to Admin &rarr;
												</Link>
												<div className="text-center mt-2">
													<Link
														to="/reset-password"
														className="text-decoration-none"
														style={{ fontSize: "11.5px", color: "#86868b" }}
														onClick={() => {
															setIsAccountOpen(false);
															closeNav();
														}}
													>
														Forgot Admin Password?
													</Link>
												</div>
											</div>
										)}
									</div>
								)}
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Header;

