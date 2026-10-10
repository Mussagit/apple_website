import React from "react";
import { Link } from "react-router-dom";
import airPodsImg from "../assets/images/home/air-pods.jpg";
import YoutubeAPI from "../components/Youtub/YoutubeAPI";

function Music() {
	const airpodsList = [
		{
			id: "airpods-4",
			name: "AirPods 4",
			tagline: "Iconic sound. Open-ear comfort with Active Noise Cancellation.",
			price: "From $129",
			img: airPodsImg,
			badge: "New",
			specs: [
				"Personalized Spatial Audio with dynamic head tracking",
				"H2 headphone chip with Voice Isolation",
				"Up to 30 hours total listening time with USB-C case",
				"Dust, sweat, and water resistant (IP54)",
			],
		},
		{
			id: "airpods-pro-2",
			name: "AirPods Pro 2",
			tagline: "Pro-level Active Noise Cancellation & Hearing Health.",
			price: "From $249",
			img: airPodsImg,
			badge: "Pro Audio",
			specs: [
				"Up to 2x more Active Noise Cancellation",
				"Clinically validated Hearing Test & Hearing Aid feature",
				"Adaptive Audio & Transparency mode",
				"MagSafe Case (USB-C) with speaker and lanyard loop",
			],
		},
		{
			id: "airpods-max",
			name: "AirPods Max",
			tagline: "High-fidelity audio. Pure listening bliss.",
			price: "From $549",
			img: airPodsImg,
			badge: "Over-Ear",
			specs: [
				"Custom acoustic design with 40mm Apple-designed dynamic driver",
				"Pro-level Active Noise Cancellation",
				"Lossless audio via USB-C wired connection",
				"Knit-mesh canopy and memory foam ear cushions",
			],
		},
	];

	return (
		<div className="music-page-wrapper" style={{ paddingTop: "60px", background: "#fbfbfd" }}>
			{/* Page Header */}
			<section className="text-center py-5">
				<div className="container">
					<span className="text-danger text-uppercase fw-semibold" style={{ fontSize: "14px", letterSpacing: "1px" }}>
						Apple Music & AirPods
					</span>
					<h1 className="fw-bold mt-2" style={{ fontSize: "48px", color: "#1d1d1f" }}>
						Over 100 million songs. All in Spatial Audio.
					</h1>
					<p className="lead text-muted mx-auto" style={{ maxWidth: "600px", fontSize: "20px" }}>
						Feel sound all around you with industry-leading AirPods and lossless Apple Music.
					</p>
				</div>
			</section>

			{/* Hero AirPods Spotlight */}
			<section className="py-4">
				<div className="container">
					<div
						className="row align-items-center rounded-4 p-4 p-md-5 mb-5 shadow-sm"
						style={{ background: "#ffffff", borderRadius: "24px", border: "1px solid #e5e5ea" }}
					>
						<div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
							<span className="badge bg-danger mb-2 px-3 py-1 rounded-pill">Magic Like You’ve Never Heard</span>
							<h2 className="fw-bold" style={{ fontSize: "38px", color: "#1d1d1f" }}>
								AirPods Pro 2
							</h2>
							<p className="fs-5 text-secondary">
								Next-level Active Noise Cancellation, Adaptive Audio, and an all-in-one Hearing Health experience.
							</p>
							<div className="my-3">
								<span className="fw-bold fs-4 text-dark">$249</span>
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
									href="#airpods-lineup"
									className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold"
								>
									Explore AirPods &darr;
								</a>
							</div>
						</div>
						<div className="col-12 col-md-6 text-center">
							<img
								src={airPodsImg}
								alt="AirPods"
								className="img-fluid"
								style={{ maxHeight: "340px", objectFit: "contain" }}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* AirPods Lineup Grid */}
			<section id="airpods-lineup" className="py-5 bg-white">
				<div className="container">
					<h3 className="text-center fw-bold mb-5" style={{ fontSize: "32px", color: "#1d1d1f" }}>
						Compare AirPods Models
					</h3>

					<div className="row g-4 justify-content-center">
						{airpodsList.map((item) => (
							<div key={item.id} className="col-12 col-md-4">
								<div
									className="card h-100 border-0 shadow-sm p-4 d-flex flex-column justify-content-between"
									style={{ borderRadius: "20px", background: "#f5f5f7" }}
								>
									<div>
										<div className="text-center mb-3">
											<span className="badge bg-dark rounded-pill px-3 py-1 small">{item.badge}</span>
										</div>
										<div className="text-center mb-4" style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
											<img
												src={item.img}
												alt={item.name}
												className="img-fluid"
												style={{ maxHeight: "150px", objectFit: "contain" }}
											/>
										</div>
										<h4 className="fw-bold text-center" style={{ fontSize: "22px", color: "#1d1d1f" }}>
											{item.name}
										</h4>
										<p className="text-muted text-center small mb-3">{item.tagline}</p>
										<div className="text-center mb-4">
											<div className="fw-bold fs-5 text-dark">{item.price}</div>
										</div>

										<hr style={{ borderColor: "#d2d2d7" }} />

										<ul className="list-unstyled small text-secondary my-3" style={{ lineHeight: "1.8" }}>
											{item.specs.map((spec, i) => (
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

			{/* Video Section */}
			<YoutubeAPI />
		</div>
	);
}

export default Music;
