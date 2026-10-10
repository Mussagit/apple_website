import React from "react";
import { Link } from "react-router-dom";
import appleTvBg from "../assets/images/home/apple-tv-background.jpg";
import bankerImg from "../assets/images/home/banker.png";
import actorsImg from "../assets/images/home/actors.jpg";
import spyderImg from "../assets/images/home/spyder.jpg";
import YoutubeAPI from "../components/Youtub/YoutubeAPI";

function Tv() {
	const tvProducts = [
		{
			id: "apple-tv-4k",
			name: "Apple TV 4K",
			tagline: "The Apple experience. Cinematic in every sense.",
			price: "From $129",
			img: appleTvBg,
			badge: "Streaming Device",
			specs: [
				"A15 Bionic chip delivers blazing-fast performance",
				"4K Dolby Vision and HDR10+ for vivid picture",
				"Dolby Atmos sound support",
				"Siri Remote with touch-enabled clickpad",
			],
		},
		{
			id: "apple-tv-plus",
			name: "Apple TV+",
			tagline: "Stream award-winning Apple Originals.",
			price: "$9.99/mo. after free trial",
			img: bankerImg,
			badge: "Streaming Service",
			specs: [
				"New Apple Originals added every month",
				"Stream on the Apple TV app across all your devices",
				"Share with up to 5 family members",
				"Download and watch offline anywhere",
			],
		},
	];

	return (
		<div className="tv-page-wrapper" style={{ paddingTop: "60px", background: "#fbfbfd" }}>
			{/* Page Header */}
			<section className="text-center py-5">
				<div className="container">
					<span className="text-muted text-uppercase fw-semibold" style={{ fontSize: "14px", letterSpacing: "1px" }}>
						TV & Home
					</span>
					<h1 className="fw-bold mt-2" style={{ fontSize: "48px", color: "#1d1d1f" }}>
						The future hits home.
					</h1>
					<p className="lead text-muted mx-auto" style={{ maxWidth: "600px", fontSize: "20px" }}>
						Simply connect your favorite devices and transform your house into a remarkably smart, entertainment-rich home.
					</p>
				</div>
			</section>

			{/* Hero TV Spotlight */}
			<section className="py-4">
				<div className="container">
					<div
						className="row align-items-center rounded-4 p-4 p-md-5 mb-5 shadow-sm"
						style={{ background: "#000000", color: "#ffffff", borderRadius: "24px" }}
					>
						<div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
							<span className="badge bg-danger mb-2 px-3 py-1 rounded-pill">Apple Original</span>
							<h2 className="fw-bold" style={{ fontSize: "38px" }}>
								Apple TV+ & Apple TV 4K
							</h2>
							<p className="fs-5 text-light opacity-75">
								Get 3 months of Apple TV+ free when you buy an Apple device. Watch critically acclaimed original series and films.
							</p>
							<div className="my-3">
								<span className="fw-bold fs-4 text-white">Apple TV 4K from $129</span>
							</div>
							<div className="d-flex gap-3 justify-content-center justify-content-md-start mt-4">
								<Link
									to="/cart"
									className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
									style={{ background: "#0071e3", borderColor: "#0071e3" }}
								>
									Get Apple TV 4K
								</Link>
								<a
									href="https://tv.apple.com"
									target="_blank"
									rel="noreferrer"
									className="btn btn-outline-light px-4 py-2 rounded-pill fw-semibold"
								>
									Stream Free Trial &rarr;
								</a>
							</div>
						</div>
						<div className="col-12 col-md-6 text-center">
							<img
								src={appleTvBg}
								alt="Apple TV"
								className="img-fluid rounded-4 shadow"
								style={{ maxHeight: "320px", objectFit: "cover" }}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* TV Lineup Grid */}
			<section className="py-5 bg-white">
				<div className="container">
					<h3 className="text-center fw-bold mb-5" style={{ fontSize: "32px", color: "#1d1d1f" }}>
						Apple TV & Services
					</h3>
					<div className="row g-4 justify-content-center mb-5">
						{tvProducts.map((tv) => (
							<div key={tv.id} className="col-12 col-md-6">
								<div
									className="card h-100 border-0 shadow-sm p-4 d-flex flex-column justify-content-between"
									style={{ borderRadius: "20px", background: "#f5f5f7" }}
								>
									<div>
										<span className="badge bg-dark rounded-pill px-3 py-1 mb-3">{tv.badge}</span>
										<h4 className="fw-bold">{tv.name}</h4>
										<p className="text-muted small">{tv.tagline}</p>
										<div className="fw-bold fs-5 mb-3">{tv.price}</div>
										<ul className="list-unstyled small text-secondary">
											{tv.specs.map((s, i) => (
												<li key={i} className="mb-2">✓ {s}</li>
											))}
										</ul>
									</div>
									<div className="mt-3">
										<Link
											to="/cart"
											className="btn btn-primary w-100 rounded-pill py-2 fw-semibold"
											style={{ background: "#0071e3" }}
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

			{/* Featured Shows Showcase */}
			<section className="py-5 bg-light">
				<div className="container">
					<h3 className="text-center fw-bold mb-4" style={{ fontSize: "32px", color: "#1d1d1f" }}>
						Featured Originals on Apple TV+
					</h3>
					<div className="row g-4 justify-content-center">
						<div className="col-12 col-md-6">
							<div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: "20px" }}>
								<img src={actorsImg} alt="Actors" className="img-fluid" style={{ height: "240px", objectFit: "cover" }} />
								<div className="p-4 bg-light">
									<h5 className="fw-bold">The Morning Show</h5>
									<p className="text-muted small">Chaos is the new normal. Watch Emmy-winning drama now.</p>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: "20px" }}>
								<img src={spyderImg} alt="Originals" className="img-fluid" style={{ height: "240px", objectFit: "cover" }} />
								<div className="p-4 bg-light">
									<h5 className="fw-bold">Blockbuster Movies & Documentaries</h5>
									<p className="text-muted small">Exclusive cinematic experiences right from your living room.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Video Section */}
			<YoutubeAPI />
		</div>
	);
}

export default Tv;
