import React, { useState } from "react";
import { Link } from "react-router-dom";
import iphoneImg from "../assets/images/home/iphone11-colored.jpg";
import airpodsImg from "../assets/images/home/air-pods.jpg";

function Cart() {
	const [items, setItems] = useState([
		{
			id: 1,
			name: "iPhone 15 Pro 128GB - Natural Titanium",
			price: 999,
			qty: 1,
			img: iphoneImg,
			monthly: "$41.62/mo. for 24 mo.",
		},
		{
			id: 2,
			name: "AirPods Pro 2 with MagSafe Charging Case (USB-C)",
			price: 249,
			qty: 1,
			img: airpodsImg,
			monthly: "$20.75/mo. for 12 mo.",
		},
	]);

	const updateQty = (id, newQty) => {
		if (newQty <= 0) {
			setItems(items.filter((item) => item.id !== id));
		} else {
			setItems(items.map((item) => (item.id === id ? { ...item, qty: newQty } : item)));
		}
	};

	const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
	const shipping = 0; // Free delivery
	const tax = Math.round(subtotal * 0.08); // 8% estimated tax
	const total = subtotal + shipping + tax;


	return (
		<div className="cart-page-wrapper" style={{ paddingTop: "60px", background: "#fbfbfd", minHeight: "85vh" }}>
			<div className="container py-5">
				<h1 className="fw-bold mb-4" style={{ fontSize: "40px", color: "#1d1d1f" }}>
					Review your Bag.
				</h1>
				<p className="text-muted mb-4" style={{ fontSize: "17px" }}>
					Free delivery and free returns on all orders.
				</p>

				{items.length === 0 ? (
					<div className="text-center py-5 bg-white rounded-4 shadow-sm p-5">
						<div style={{ fontSize: "48px", marginBottom: "16px" }}>🛍️</div>
						<h3 className="fw-bold">Your Apple Bag is empty.</h3>
						<p className="text-muted mb-4">Shop the latest Apple products and accessories to get started.</p>
						<div className="d-flex gap-3 justify-content-center flex-wrap">
							<Link to="/iphone" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold" style={{ background: "#0071e3" }}>
								Shop iPhone
							</Link>
							<Link to="/mac" className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold">
								Shop Mac
							</Link>
							<Link to="/ipad" className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold">
								Shop iPad
							</Link>
						</div>
					</div>
				) : (
					<div className="row g-4">
						{/* Items List */}
						<div className="col-12 col-lg-8">
							<div className="bg-white rounded-4 shadow-sm p-4 p-md-4">
								{items.map((item, index) => (
									<div key={item.id}>
										<div className="row align-items-center py-3">
											<div className="col-3 col-md-2 text-center">
												<img
													src={item.img}
													alt={item.name}
													className="img-fluid"
													style={{ maxHeight: "90px", objectFit: "contain" }}
												/>
											</div>
											<div className="col-9 col-md-5">
												<h5 className="fw-bold mb-1" style={{ fontSize: "17px", color: "#1d1d1f" }}>
													{item.name}
												</h5>
												<span className="text-muted small d-block">{item.monthly}</span>
												<span className="badge bg-success-subtle text-success mt-1 small">In Stock</span>
											</div>
											<div className="col-6 col-md-2 my-2 my-md-0">
												<div className="d-flex align-items-center border rounded-pill px-2 py-1 justify-content-between" style={{ maxWidth: "100px" }}>
													<button
														className="btn btn-sm btn-link text-dark p-0 text-decoration-none"
														onClick={() => updateQty(item.id, item.qty - 1)}
													>
														-
													</button>
													<span className="fw-semibold px-2">{item.qty}</span>
													<button
														className="btn btn-sm btn-link text-dark p-0 text-decoration-none"
														onClick={() => updateQty(item.id, item.qty + 1)}
													>
														+
													</button>
												</div>
											</div>
											<div className="col-6 col-md-3 text-end">
												<div className="fw-bold fs-5">${item.price * item.qty}</div>
												<button
													className="btn btn-sm btn-link text-danger p-0 text-decoration-none mt-1"
													onClick={() => updateQty(item.id, 0)}
												>
													Remove
												</button>
											</div>
										</div>
										{index < items.length - 1 && <hr style={{ borderColor: "#e5e5ea" }} />}
									</div>
								))}
							</div>
						</div>

						{/* Order Summary */}
						<div className="col-12 col-lg-4">
							<div className="bg-white rounded-4 shadow-sm p-4">
								<h4 className="fw-bold mb-3" style={{ fontSize: "20px" }}>
									Order Summary
								</h4>
								<div className="d-flex justify-content-between mb-2">
									<span className="text-muted">Subtotal</span>
									<span className="fw-semibold">${subtotal}</span>
								</div>
								<div className="d-flex justify-content-between mb-2">
									<span className="text-muted">Shipping</span>
									<span className="text-success fw-semibold">FREE</span>
								</div>
								<div className="d-flex justify-content-between mb-3">
									<span className="text-muted">Estimated Tax</span>
									<span className="fw-semibold">${tax}</span>
								</div>

								<hr style={{ borderColor: "#e5e5ea" }} />

								<div className="d-flex justify-content-between align-items-center mb-4">
									<span className="fw-bold fs-5">Total</span>
									<span className="fw-bold fs-4 text-dark">${total}</span>
								</div>

								<button
									className="btn btn-primary w-100 py-3 rounded-pill fw-semibold mb-2"
									style={{ background: "#0071e3", borderColor: "#0071e3", fontSize: "16px" }}
									onClick={() => alert(`Order placed successfully! Total: $${total}`)}
								>
									Check Out
								</button>
								<button
									className="btn btn-dark w-100 py-2 rounded-pill fw-semibold"
									style={{ fontSize: "15px" }}
									onClick={() => alert(`Apple Pay initialized! Total: $${total}`)}
								>
									 Pay
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Cart;
