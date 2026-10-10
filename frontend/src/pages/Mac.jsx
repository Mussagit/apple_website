import React from "react";
import { Link } from "react-router-dom";
import macbookAir from "../assets/images/home/macbookair-new.jpg";
import macbookPro from "../assets/images/home/macbook-pro.jpg";
import macLaptop from "../assets/images/home/mac-laptop.jpg";
import YoutubeAPI from "../components/Youtub/YoutubeAPI";

function Mac() {
	const macProducts = [
		{
			id: "macbook-air",
			name: "MacBook Air 13” and 15”",
			tagline: "Lean. Mean. M3 machine.",
			price: "From $1,099",
			monthly: "or $91.58/mo. for 12 mo.",
			img: macbookAir,
			badge: "New",
			specs: [
				"Apple M3 chip with 8-core CPU",
				"Up to 18 hours battery life",
				"Liquid Retina display with 500 nits brightness",
				"1080p FaceTime HD camera",
			],
		},
		{
			id: "macbook-pro",
			name: "MacBook Pro 14” and 16”",
			tagline: "Mind-blowing. Head-turning.",
			price: "From $1,599",
			monthly: "or $133.25/mo. for 12 mo.",
			img: macbookPro,
			badge: "Pro Power",
			specs: [
				"M3, M3 Pro, or M3 Max chip",
				"Up to 22 hours battery life",
				"Liquid Retina XDR display with Extreme Dynamic Range",
				"Six-speaker sound system with Spatial Audio",
			],
		},
		{
			id: "imac",
			name: "iMac 24”",
			tagline: "Packed with power. Splashed with color.",
			price: "From $1,299",
			monthly: "or $108.25/mo. for 12 mo.",
			img: macLaptop,
			badge: "All-in-One",
			specs: [
				"Immersive 4.5K Retina display",
				"Apple M3 chip with fast 8-core GPU",
				"1080p FaceTime HD camera & studio-quality mics",
				"Strikingly thin design in 7 vibrant colors",
			],
		},
	];

	return (
		<div className="mac-page-wrapper" style={{ paddingTop: "60px", background: "#fbfbfd" }}>
			{/* Page Header */}
			<section className="text-center py-5">
				<div className="container">
					<span className="text-muted text-uppercase fw-semibold" style={{ fontSize: "14px", letterSpacing: "1px" }}>
						Mac
					</span>
					<h1 className="fw-bold mt-2" style={{ fontSize: "48px", color: "#1d1d1f" }}>
						If you can dream it, Mac can do it.
					</h1>
					<p className="lead text-muted mx-auto" style={{ maxWidth: "650px", fontSize: "20px" }}>
						Supercharged by Apple silicon. Designed to be easy to learn and magically intuitive.
					</p>
				</div>
			</section>

			{/* Hero Product Spotlight */}
			<section className="py-4">
				<div className="container">
					<div
						className="row align-items-center rounded-4 p-4 p-md-5 mb-5 shadow-sm"
						style={{ background: "#ffffff", borderRadius: "24px", border: "1px solid #e5e5ea" }}
					>
						<div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
							<span className="badge bg-danger mb-2 px-3 py-1 rounded-pill">New M3 Chip</span>
							<h2 className="fw-bold" style={{ fontSize: "36px", color: "#1d1d1f" }}>
								MacBook Air
							</h2>
							<p className="fs-5 text-secondary">
								Lean. Mean. M3 machine. Incredible performance in an ultra-portable aluminum body.
							</p>
							<div className="my-3">
								<span className="fw-bold fs-4 text-dark">From $1,099</span>
								<span className="text-muted d-block small">or $91.58/mo. for 12 mo.</span>
							</div>
							<div className="d-flex gap-3 justify-content-center justify-content-md-start mt-4">
								<Link
									to="/cart"
									className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
									style={{ background: "#0071e3", borderColor: "#0071e3" }}
								>
									Buy Now
								</Link>
								<a
									href="#mac-lineup"
									className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold"
								>
									Explore Specs &darr;
								</a>
							</div>
						</div>
						<div className="col-12 col-md-6 text-center">
							<img
								src={macbookAir}
								alt="MacBook Air"
								className="img-fluid"
								style={{ maxHeight: "360px", objectFit: "contain" }}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Mac Lineup Grid */}
			<section id="mac-lineup" className="py-5 bg-white">
				<div className="container">
					<h3 className="text-center fw-bold mb-5" style={{ fontSize: "32px", color: "#1d1d1f" }}>
						Explore the Mac Lineup
					</h3>

					<div className="row g-4 justify-content-center">
						{macProducts.map((mac) => (
							<div key={mac.id} className="col-12 col-md-4">
								<div
									className="card h-100 border-0 shadow-sm p-4 d-flex flex-column justify-content-between"
									style={{ borderRadius: "20px", background: "#f5f5f7" }}
								>
									<div>
										<div className="text-center mb-3">
											<span className="badge bg-dark rounded-pill px-3 py-1 small">{mac.badge}</span>
										</div>
										<div className="text-center mb-4" style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
											<img
												src={mac.img}
												alt={mac.name}
												className="img-fluid"
												style={{ maxHeight: "160px", objectFit: "contain" }}
											/>
										</div>
										<h4 className="fw-bold text-center" style={{ fontSize: "22px", color: "#1d1d1f" }}>
											{mac.name}
										</h4>
										<p className="text-muted text-center small mb-3">{mac.tagline}</p>
										<div className="text-center mb-4">
											<div className="fw-bold fs-5 text-dark">{mac.price}</div>
											<div className="text-muted small">{mac.monthly}</div>
										</div>

										<hr style={{ borderColor: "#d2d2d7" }} />

										<ul className="list-unstyled small text-secondary my-3" style={{ lineHeight: "1.8" }}>
											{mac.specs.map((spec, i) => (
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

			{/* Mac YouTube / Video Reviews */}
			<YoutubeAPI />
		</div>
	);
}

export default Mac;
