import React, { useState } from "react";
import { Link } from "react-router-dom";

function Support() {
	const [searchQuery, setSearchQuery] = useState("");

	const topics = [
		{ title: "iPhone Support", icon: "📱", desc: "Set up, battery troubleshooting, camera tips, and repairs." },
		{ title: "Mac Support", icon: "💻", desc: "macOS updates, backup with Time Machine, and display help." },
		{ title: "iPad Support", icon: "📟", desc: "Apple Pencil features, iPadOS multitasking, and accessories." },
		{ title: "Watch Support", icon: "⌚", desc: "Fitness tracking, workout metrics, and cellular connections." },
		{ title: "AirPods Support", icon: "🎧", desc: "Pairing, audio sharing, cleaning, and replacement parts." },
		{ title: "Apple ID & Passwords", icon: "🔑", desc: "Forgot password, two-factor authentication, and account recovery." },
		{ title: "Billing & Subscriptions", icon: "💳", desc: "Manage subscriptions, refund requests, and purchase history." },
		{ title: "AppleCare & Repairs", icon: "🛠️", desc: "Check warranty coverage, schedule a Genius Bar repair." },
	];

	const filteredTopics = topics.filter(
		(t) =>
			t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			t.desc.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="support-page-wrapper" style={{ paddingTop: "60px", background: "#fbfbfd", minHeight: "85vh" }}>
			{/* Header */}
			<section className="text-center py-5">
				<div className="container">
					<h1 className="fw-bold" style={{ fontSize: "44px", color: "#1d1d1f" }}>
						Apple Support
					</h1>
					<p className="lead text-muted mx-auto mb-4" style={{ maxWidth: "600px" }}>
						How can we help you today? Search for answers or browse topics below.
					</p>

					{/* Search Box */}
					<div className="row justify-content-center">
						<div className="col-12 col-md-8 col-lg-6">
							<div className="input-group input-group-lg shadow-sm" style={{ borderRadius: "16px", overflow: "hidden" }}>
								<span className="input-group-text bg-white border-end-0 text-muted ps-3">🔍</span>
								<input
									type="text"
									className="form-control border-start-0 py-3"
									placeholder="Search topics, questions, errors..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									style={{ fontSize: "16px", boxShadow: "none" }}
								/>
								{searchQuery && (
									<button
										className="btn btn-white bg-white border-start-0 text-muted"
										onClick={() => setSearchQuery("")}
									>
										✕
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Topics Grid */}
			<section className="py-4">
				<div className="container">
					<h3 className="fw-bold mb-4" style={{ fontSize: "24px", color: "#1d1d1f" }}>
						Popular Support Topics
					</h3>

					<div className="row g-4">
						{filteredTopics.map((topic, idx) => (
							<div key={idx} className="col-12 col-sm-6 col-lg-3">
								<div
									className="card h-100 p-4 border-0 shadow-sm"
									style={{
										borderRadius: "18px",
										background: "#ffffff",
										transition: "transform 0.2s ease, box-shadow 0.2s ease",
										cursor: "pointer",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = "translateY(-4px)";
										e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = "translateY(0)";
										e.currentTarget.style.boxShadow = "";
									}}
								>
									<div style={{ fontSize: "36px", marginBottom: "12px" }}>{topic.icon}</div>
									<h5 className="fw-bold" style={{ fontSize: "18px", color: "#1d1d1f" }}>
										{topic.title}
									</h5>
									<p className="text-muted small mb-0">{topic.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact & Genius Bar Banner */}
			<section className="py-5">
				<div className="container">
					<div
						className="p-4 p-md-5 rounded-4 shadow-sm text-center"
						style={{ background: "#ffffff", border: "1px solid #e5e5ea", borderRadius: "24px" }}
					>
						<h3 className="fw-bold mb-2">Need to talk to an Apple Expert?</h3>
						<p className="text-muted mx-auto mb-4" style={{ maxWidth: "550px" }}>
							Get help by phone, chat, or email, or schedule a repair appointment at an Apple Store Genius Bar.
						</p>
						<div className="d-flex gap-3 justify-content-center flex-wrap">
							<a
								href="tel:18006927753"
								className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
								style={{ background: "#0071e3", borderColor: "#0071e3" }}
							>
								Call 1-800-MY-APPLE
							</a>
							<Link
								to="/iphone"
								className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold"
							>
								Explore Products
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Support;
