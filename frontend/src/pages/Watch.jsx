import React from "react";
import { Link } from "react-router-dom";
import watchSeries5 from "../assets/images/home/watch-series-5.jpg";
import watchLg from "../assets/images/home/watch-lg.jpg";
import watchImg from "../assets/images/home/watch.jpg";
import YoutubeAPI from "../components/Youtub/YoutubeAPI";

function Watch() {
	const watches = [
		{
			id: "watch-series-10",
			name: "Apple Watch Series 10",
			tagline: "Thinscredible. Our biggest display ever.",
			price: "From $399",
			monthly: "or $33.25/mo. for 12 mo.",
			img: watchSeries5,
			badge: "All-New",
			specs: [
				"Wide-angle OLED Always-On Retina display",
				"Sleep apnea notifications & ECG app",
				"Faster charging — 80% in about 30 minutes",
				"Water resistant 50 meters with depth gauge",
			],
		},
		{
			id: "watch-ultra-2",
			name: "Apple Watch Ultra 2",
			tagline: "Next-level adventure. Built for extremes.",
			price: "From $799",
			monthly: "or $66.58/mo. for 12 mo.",
			img: watchLg,
			badge: "Rugged & Extreme",
			specs: [
				"49mm aerospace-grade titanium case",
				"Up to 36 hours battery life (72 hrs in Low Power)",
				"Precision dual-frequency GPS",
				"100m water resistance & certified dive computer",
			],
		},
		{
			id: "watch-se",
			name: "Apple Watch SE",
			tagline: "Heavy on features. Light on price.",
			price: "From $249",
			monthly: "or $20.75/mo. for 12 mo.",
			img: watchImg,
			badge: "Essential",
			specs: [
				"Retina display up to 1000 nits",
				"Crash Detection & Fall Detection",
				"Heart rate notifications & sleep tracking",
				"Water resistant 50 meters",
			],
		},
	];

	return (
		<div className="watch-page-wrapper" style={{ paddingTop: "60px", background: "#fbfbfd" }}>
			{/* Page Header */}
			<section className="text-center py-5">
				<div className="container">
					<span className="text-muted text-uppercase fw-semibold" style={{ fontSize: "14px", letterSpacing: "1px" }}>
						Apple Watch
					</span>
					<h1 className="fw-bold mt-2" style={{ fontSize: "48px", color: "#1d1d1f" }}>
						To wear it is to love it.
					</h1>
					<p className="lead text-muted mx-auto" style={{ maxWidth: "600px", fontSize: "20px" }}>
						The ultimate device for a healthy life.
					</p>
				</div>
			</section>

			{/* Hero Spotlight */}
			<section className="py-4">
				<div className="container">
					<div
						className="row align-items-center rounded-4 p-4 p-md-5 mb-5 shadow-sm"
						style={{ background: "#1c1c1e", color: "#ffffff", borderRadius: "24px" }}
					>
						<div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
							<span className="badge bg-danger mb-2 px-3 py-1 rounded-pill">Featured</span>
							<h2 className="fw-bold" style={{ fontSize: "38px" }}>
								Apple Watch Series 10
							</h2>
							<p className="fs-5 text-light opacity-75">
								Our thinnest watch ever with our biggest display. Breakthrough insights on your health and sleep.
							</p>
							<div className="my-3">
								<span className="fw-bold fs-4 text-white">From $399</span>
								<span className="text-light opacity-75 d-block small">or $33.25/mo. for 12 mo.</span>
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
									href="#watch-lineup"
									className="btn btn-outline-light px-4 py-2 rounded-pill fw-semibold"
								>
									Explore All &darr;
								</a>
							</div>
						</div>
						<div className="col-12 col-md-6 text-center">
							<img
								src={watchSeries5}
								alt="Apple Watch Series 10"
								className="img-fluid"
								style={{ maxHeight: "360px", objectFit: "contain" }}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Watch Lineup Grid */}
			<section id="watch-lineup" className="py-5 bg-white">
				<div className="container">
					<h3 className="text-center fw-bold mb-5" style={{ fontSize: "32px", color: "#1d1d1f" }}>
						Find the Apple Watch for you
					</h3>

					<div className="row g-4 justify-content-center">
						{watches.map((w) => (
							<div key={w.id} className="col-12 col-md-4">
								<div
									className="card h-100 border-0 shadow-sm p-4 d-flex flex-column justify-content-between"
									style={{ borderRadius: "20px", background: "#f5f5f7" }}
								>
									<div>
										<div className="text-center mb-3">
											<span className="badge bg-dark rounded-pill px-3 py-1 small">{w.badge}</span>
										</div>
										<div className="text-center mb-4" style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
											<img
												src={w.img}
												alt={w.name}
												className="img-fluid"
												style={{ maxHeight: "160px", objectFit: "contain" }}
											/>
										</div>
										<h4 className="fw-bold text-center" style={{ fontSize: "22px", color: "#1d1d1f" }}>
											{w.name}
										</h4>
										<p className="text-muted text-center small mb-3">{w.tagline}</p>
										<div className="text-center mb-4">
											<div className="fw-bold fs-5 text-dark">{w.price}</div>
											<div className="text-muted small">{w.monthly}</div>
										</div>

										<hr style={{ borderColor: "#d2d2d7" }} />

										<ul className="list-unstyled small text-secondary my-3" style={{ lineHeight: "1.8" }}>
											{w.specs.map((spec, i) => (
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

			{/* Watch Video Reviews */}
			<YoutubeAPI />
		</div>
	);
}

export default Watch;
