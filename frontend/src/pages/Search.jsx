import React, { useState } from "react";
import { Link } from "react-router-dom";

function Search() {
	const [query, setQuery] = useState("");

	const productCatalog = [
		{ name: "iPhone 16 Pro", category: "iPhone", path: "/iphone", desc: "Titanium design, A18 Pro chip, Camera Control." },
		{ name: "iPhone 16", category: "iPhone", path: "/iphone", desc: "Apple Intelligence, 48MP Fusion camera, Action button." },
		{ name: "MacBook Air 13” & 15”", category: "Mac", path: "/mac", desc: "M3 chip, up to 18 hours battery life, Liquid Retina display." },
		{ name: "MacBook Pro 14” & 16”", category: "Mac", path: "/mac", desc: "M3 Pro / M3 Max chips, Extreme Dynamic Range display." },
		{ name: "iPad Pro", category: "iPad", path: "/ipad", desc: "M4 chip, Ultra Retina XDR OLED, Apple Pencil Pro support." },
		{ name: "iPad Air", category: "iPad", path: "/ipad", desc: "M2 chip, 11” and 13” models, Landscape front camera." },
		{ name: "Apple Watch Series 10", category: "Watch", path: "/watch", desc: "Thinnest watch, largest display, sleep apnea alerts." },
		{ name: "Apple Watch Ultra 2", category: "Watch", path: "/watch", desc: "Aerospace titanium, up to 36 hours battery, 100m water resistant." },
		{ name: "AirPods Pro 2", category: "Music", path: "/music", desc: "2x more Active Noise Cancellation, Hearing Health features." },
		{ name: "Apple TV 4K", category: "TV", path: "/tv", desc: "Dolby Vision, Dolby Atmos, A15 Bionic chip." },
		{ name: "Apple Support", category: "Support", path: "/support", desc: "Troubleshooting, Genius Bar repairs, warranty & AppleCare." },
	];

	const results = productCatalog.filter(
		(p) =>
			p.name.toLowerCase().includes(query.toLowerCase()) ||
			p.category.toLowerCase().includes(query.toLowerCase()) ||
			p.desc.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<div className="search-page-wrapper" style={{ paddingTop: "60px", background: "#fbfbfd", minHeight: "85vh" }}>
			<div className="container py-5">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8">
						<h1 className="fw-bold text-center mb-4" style={{ fontSize: "36px", color: "#1d1d1f" }}>
							Search Apple
						</h1>

						{/* Search Bar */}
						<div className="input-group input-group-lg shadow-sm mb-4" style={{ borderRadius: "16px", overflow: "hidden" }}>
							<span className="input-group-text bg-white border-end-0 text-muted ps-3">🔍</span>
							<input
								type="text"
								className="form-control border-start-0 py-3"
								placeholder="Search for hardware, software, support..."
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								autoFocus
								style={{ fontSize: "17px", boxShadow: "none" }}
							/>
							{query && (
								<button className="btn btn-white bg-white border-start-0 text-muted" onClick={() => setQuery("")}>
									✕
								</button>
							)}
						</div>

						{/* Quick Links */}
						<div className="d-flex gap-2 flex-wrap justify-content-center mb-5">
							<span className="text-muted small me-2 align-self-center">Quick links:</span>
							{["iPhone", "Mac", "iPad", "Watch", "AirPods", "TV"].map((cat) => (
								<button
									key={cat}
									className="btn btn-sm btn-outline-secondary rounded-pill px-3"
									onClick={() => setQuery(cat)}
								>
									{cat}
								</button>
							))}
						</div>

						{/* Results */}
						<h4 className="fw-bold mb-3" style={{ fontSize: "20px" }}>
							{query ? `Results for "${query}" (${results.length})` : "Popular Searches"}
						</h4>

						<div className="list-group shadow-sm rounded-4 overflow-hidden border-0">
							{results.length === 0 ? (
								<div className="p-4 text-center bg-white text-muted">
									No results found for "{query}". Try searching for iPhone, Mac, or Watch.
								</div>
							) : (
								results.map((item, idx) => (
									<Link
										key={idx}
										to={item.path}
										className="list-group-item list-group-item-action p-3 d-flex justify-content-between align-items-center"
									>
										<div>
											<div className="fw-bold text-dark">{item.name}</div>
											<div className="text-muted small">{item.desc}</div>
										</div>
										<span className="badge bg-light text-secondary rounded-pill px-3 py-2">{item.category} &rarr;</span>
									</Link>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;
