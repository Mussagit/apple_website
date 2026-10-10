import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import applelogo from "../../assets/images/icons/logo-sm.png";
import searchlogo from "../../assets/images/icons/search-icon-sm.png";
import cartlogo from "../../assets/images/icons/cart-sm.png";

function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [adminUser, setAdminUser] = useState(null);
	const navigate = useNavigate();

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

							{/* ONLY VISIBLE TO LOGGED IN INTERNAL ADMIN USER */}
							{adminUser && (
								<li className="nav-item dropdown">
									<NavLink
										className={({ isActive }) =>
											`nav-link js-scroll-trigger ${isActive ? "active text-white fw-bold" : ""}`
										}
										to="/add-product"
										onClick={closeNav}
										title={`Admin: ${adminUser.user_name}`}
										style={{ color: "#2997ff" }}
									>
										+ Product
									</NavLink>
								</li>
							)}

							{adminUser && (
								<li className="nav-item">
									<button
										className="nav-link btn btn-link text-warning p-0 border-0"
										onClick={handleLogout}
										title="Log out of Admin"
										style={{ fontSize: "12px", textDecoration: "none" }}
									>
										[Exit Admin]
									</button>
								</li>
							)}

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
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Header;

