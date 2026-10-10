import React from "react";
import { Link } from "react-router-dom";
import ipadProImg from "../assets/images/home/ipodPronew.jpg";
import newIpadImg from "../assets/images/home/new-ipad.jpg";
import YoutubeAPI from "../components/Youtub/YoutubeAPI";

function Ipad() {
	const ipadModels = [
		{
			id: "ipad-pro",
			name: "iPad Pro",
			tagline: "Thinpossible. Powered by M4.",
			price: "From $999",
			monthly: "or $83.25/mo. for 12 mo.",
			img: ipadProImg,
			badge: "Flagship",
			specs: [
				"Breakthrough Ultra Retina XDR OLED display",
				"Ultra-fast Apple M4 chip with Next-Gen Neural Engine",
				"Compatible with Apple Pencil Pro & Magic Keyboard",
				"Thinnest Apple product ever made",
			],
		},
		{
			id: "ipad-air",
			name: "iPad Air",
			tagline: "Fresh Air. Supercharged by M2.",
			price: "From $599",
			monthly: "or $49.91/mo. for 12 mo.",
			img: newIpadImg,
			badge: "Most Popular",
			specs: [
				"11-inch or all-new 13-inch Liquid Retina display",
				"Apple M2 chip with incredible speed",
				"Landscape 12MP Center Stage front camera",
				"Touch ID built into top button",
			],
		},
		{
			id: "ipad-10",
			name: "iPad (10th generation)",
			tagline: "Colorfully reimagined. Versatile. Powerful.",
			price: "From $349",
			monthly: "or $29.08/mo. for 12 mo.",
			img: ipadProImg,
			badge: "Great Value",
			specs: [
				"10.9-inch Liquid Retina display",
				"A14 Bionic chip for smooth multitasking",
				"USB-C connectivity with Wi-Fi 6",
				"Available in four bold, playful colors",
			],
		},
	];

	return (
		<div className="ipad-page-wrapper" style={{ paddingTop: "60px", background: "#fbfbfd" }}>
			{/* Page Header */}
			<section className="text-center py-5">
				<div className="container">
					<span className="text-muted text-uppercase fw-semibold" style={{ fontSize: "14px", letterSpacing: "1px" }}>
						iPad
					</span>
					<h1 className="fw-bold mt-2" style={{ fontSize: "48px", color: "#1d1d1f" }}>
						Touch, draw, and type on one magical device.
					</h1>
					<p className="lead text-muted mx-auto" style={{ maxWidth: "600px", fontSize: "20px" }}>
						Transformative capability in an ultra-versatile, portable design.
					</p>
				</div>
			</section>

			{/* Hero iPad Pro Spotlight */}
			<section className="py-4">
				<div className="container">
					<div
						className="row align-items-center rounded-4 p-4 p-md-5 mb-5 shadow-sm"
						style={{ background: "#000000", color: "#ffffff", borderRadius: "24px" }}
					>
						<div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
							<span className="badge bg-warning text-dark mb-2 px-3 py-1 rounded-pill">New Arrival</span>
							<h2 className="fw-bold" style={{ fontSize: "40px" }}>
								iPad Pro
							</h2>
							<p className="fs-5 text-light opacity-75">
								Thinpossible. Ultra Retina XDR display. Outrageous performance of the M4 chip.
							</p>
							<div className="my-3">
								<span className="fw-bold fs-4 text-white">From $999</span>
								<span className="text-light opacity-75 d-block small">or $83.25/mo. for 12 mo.</span>
							</div>
							<div className="d-flex gap-3 justify-content-center justify-content-md-start mt-4">
								<Link
									to="/cart"
									className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
									style={{ background: "#0071e3", borderColor: "#0071e3" }}
								>
									Order Now
								</Link>
								<a
									href="#ipad-lineup"
									className="btn btn-outline-light px-4 py-2 rounded-pill fw-semibold"
								>
									Compare Models &darr;
								</a>
							</div>
						</div>
						<div className="col-12 col-md-6 text-center">
							<img
								src={ipadProImg}
								alt="iPad Pro"
								className="img-fluid"
								style={{ maxHeight: "380px", objectFit: "contain" }}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* iPad Lineup Grid */}
			<section id="ipad-lineup" className="py-5 bg-white">
				<div className="container">
					<h3 className="text-center fw-bold mb-5" style={{ fontSize: "32px", color: "#1d1d1f" }}>
						Which iPad is right for you?
					</h3>

					<div className="row g-4 justify-content-center">
						{ipadModels.map((ipad) => (
							<div key={ipad.id} className="col-12 col-md-4">
								<div
									className="card h-100 border-0 shadow-sm p-4 d-flex flex-column justify-content-between"
									style={{ borderRadius: "20px", background: "#f5f5f7" }}
								>
									<div>
										<div className="text-center mb-3">
											<span className="badge bg-dark rounded-pill px-3 py-1 small">{ipad.badge}</span>
										</div>
										<div className="text-center mb-4" style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
											<img
												src={ipad.img}
												alt={ipad.name}
												className="img-fluid"
												style={{ maxHeight: "160px", objectFit: "contain" }}
											/>
										</div>
										<h4 className="fw-bold text-center" style={{ fontSize: "22px", color: "#1d1d1f" }}>
											{ipad.name}
										</h4>
										<p className="text-muted text-center small mb-3">{ipad.tagline}</p>
										<div className="text-center mb-4">
											<div className="fw-bold fs-5 text-dark">{ipad.price}</div>
											<div className="text-muted small">{ipad.monthly}</div>
										</div>

										<hr style={{ borderColor: "#d2d2d7" }} />

										<ul className="list-unstyled small text-secondary my-3" style={{ lineHeight: "1.8" }}>
											{ipad.specs.map((spec, i) => (
												<li key={i} className="mb-2">
													✓ {spec}
												</li>
											))}
										</ul>
									</div>

									<div className="mt-4 text-center">
										<Link
											to="/cart"
											className="btn btn-primary w-100 rounded-pill py-2 fw-semibold"
											style={{ background: "#0071e3", borderColor: "#0071e3" }}
										>
											Select & Buy
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* iPad Video Section */}
			<YoutubeAPI />
		</div>
	);
}

export default Ipad;
