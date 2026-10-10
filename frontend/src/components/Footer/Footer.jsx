import React from "react";
import { Link } from "react-router-dom";
import USAflag from "../../assets/images/icons/16.png";

function Footer() {
	return (
		<>
			<footer className="footer-wrapper">
				<div className="container">
					<div className="upper-text-container">
						<p>
							1. Trade In: Trade‑in values vary. iPhone 11 and iPhone 11 Pro
							promotional pricing is after trade‑in of iPhone 8 Plus and iPhone
							X in good condition. Additional trade‑in values require purchase
							of a new iPhone, subject to availability and limits. Must be at
							least 18. Apple or its trade-in partners reserve the right to
							refuse or limit any Trade In transaction for any reason. In‑store
							trade‑in requires presentation of a valid, government-issued photo
							ID (local law may require saving this information). Sales tax may
							be assessed on full value of new iPhone. Additional terms from
							Apple or Apple’s trade-in partners may apply. Monthly pricing:
							Available to qualified customers and requires 0% APR, 24-month
							installment loan with Citizens One or Apple Card Monthly
							Installments and iPhone activation with AT&T, Sprint, T-Mobile, or
							Verizon. Taxes and shipping not included. Additional Apple Card
							Monthly Installments terms are in the{" "}
							<a
								href="https://www.goldmansachs.com/terms-and-conditions/Apple-Card-Customer-Agreement.pdf"
								target="_blank"
								rel="noreferrer">
								{" "}
								Customer Agreement
							</a>
							. Additional iPhone Payments terms are{" "}
							<a
								href="https://www.apple.com/legal/sales-support/iphoneinstallments_us/"
								target="_blank"
								rel="noreferrer">
								{" "}
								here
							</a>
							.
						</p>
						<p>
							2. Subscription required.
							<br />
							<br />
							Magic Keyboard sold separately.
							<br />
							<br />
							Apple TV+ is $4.99/month after free trial. One subscription per
							Family Sharing group. Offer good for 3 months after eligible
							device activation. Plan automatically renews until cancelled.
							Restrictions and other{" "}
							<a
								href="https://www.apple.com/promo/"
								target="_blank"
								rel="noreferrer">
								terms{" "}
							</a>{" "}
							apply.
						</p>
					</div>
					<div className="footer-links-wrapper row">
						<div className="links-wrapper-1 col-sm-12 col-md">
							<h3>Shop and Learn</h3>
							<ul>
								<li>
									<Link to="/mac">Mac</Link>
								</li>
								<li>
									<Link to="/ipad">iPad</Link>
								</li>
								<li>
									<Link to="/iphone">iPhone</Link>
								</li>
								<li>
									<Link to="/watch">Watch</Link>
								</li>
								<li>
									<Link to="/tv">TV</Link>
								</li>
								<li>
									<Link to="/music">Music</Link>
								</li>
								<li>
									<Link to="/music">AirPods</Link>
								</li>
								<li>
									<Link to="/tv">HomePod</Link>
								</li>
								<li>
									<Link to="/music">iPod touch</Link>
								</li>
								<li>
									<Link to="/mac">Accessories</Link>
								</li>
								<li>
									<Link to="/">Gift Cards</Link>
								</li>
							</ul>
						</div>
						<div className="links-wrapper-2 col-sm-12 col-md">
							<h3>Services</h3>
							<ul>
								<li>
									<Link to="/music">Apple Music</Link>
								</li>
								<li>
									<Link to="/">Apple News+</Link>
								</li>
								<li>
									<Link to="/tv">Apple TV+</Link>
								</li>
								<li>
									<Link to="/">Apple Arcade</Link>
								</li>
								<li>
									<Link to="/">Apple Card</Link>
								</li>
								<li>
									<Link to="/">iCloud</Link>
								</li>
							</ul>
							<h3>Account</h3>
							<ul>
								<li>
									<Link to="/login">Manage Your Apple ID</Link>
								</li>
								<li>
									<Link to="/login">Apple Store Account</Link>
								</li>
								<li>
									<Link to="/login">iCloud.com</Link>
								</li>
							</ul>
						</div>
						<div className="links-wrapper-3 col-sm-12 col-md">
							<h3>Apple Store</h3>
							<ul>
								<li>
									<Link to="/support">Find a Store</Link>
								</li>
								<li>
									<Link to="/support">Genius Bar</Link>
								</li>
								<li>
									<Link to="/support">Today at Apple</Link>
								</li>
								<li>
									<Link to="/support">Apple Camp</Link>
								</li>
								<li>
									<Link to="/support">Field Trip</Link>
								</li>
								<li>
									<Link to="/support">Apple Store App</Link>
								</li>
								<li>
									<Link to="/iphone">Refurbished and Clearance</Link>
								</li>
								<li>
									<Link to="/iphone">Financing</Link>
								</li>
								<li>
									<Link to="/iphone">Apple Trade In</Link>
								</li>
								<li>
									<Link to="/cart">Order Status</Link>
								</li>
								<li>
									<Link to="/support">Shopping Help</Link>
								</li>
							</ul>
						</div>
						<div className="links-wrapper-4 col-sm-12 col-md">
							<h3>For Business</h3>
							<ul>
								<li>
									<Link to="/support">Apple and Business</Link>
								</li>
								<li>
									<Link to="/support">Shop for Business</Link>
								</li>
							</ul>
							<h3>For Education</h3>
							<ul>
								<li>
									<Link to="/support">Apple and Education</Link>
								</li>
								<li>
									<Link to="/support">Shop for College</Link>
								</li>
							</ul>
							<h3>For Healthcare</h3>
							<ul>
								<li>
									<Link to="/support">Manage Your Apple ID</Link>
								</li>
								<li>
									<Link to="/support">Apple Store Account</Link>
								</li>
								<li>
									<Link to="/support">iCloud.com</Link>
								</li>
							</ul>
							<h3>For Government</h3>
							<ul>
								<li>
									<Link to="/support">Apple and Education</Link>
								</li>
								<li>
									<Link to="/support">Shop for College</Link>
								</li>
							</ul>
						</div>
						<div className="links-wrapper-5 col-sm-12 col-md">
							<h3>Apple Values</h3>
							<ul>
								<li>
									<Link to="/support">Find a Store</Link>
								</li>
								<li>
									<Link to="/support">Genius Bar</Link>
								</li>
								<li>
									<Link to="/support">Today at Apple</Link>
								</li>
								<li>
									<Link to="/support">Apple Camp</Link>
								</li>
								<li>
									<Link to="/support">Field Trip</Link>
								</li>
								<li>
									<Link to="/support">Apple Store App</Link>
								</li>
							</ul>
							<h3>About Apple</h3>
							<ul>
								<li>
									<Link to="/support">Find a Store</Link>
								</li>
								<li>
									<Link to="/support">Genius Bar</Link>
								</li>
								<li>
									<Link to="/support">Today at Apple</Link>
								</li>
								<li>
									<Link to="/support">Apple Camp</Link>
								</li>
								<li>
									<Link to="/support">Field Trip</Link>
								</li>
								<li>
									<Link to="/support">Apple Store App</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="my-apple-wrapper">
						More ways to shop: <Link to="/support">Find an Apple Store</Link> or{" "}
						<Link to="/support">other retailer</Link> near you. Or call 1-800-MY-APPLE.
					</div>
					<div className="copyright-wrapper row">
						<div className="copyright col-sm-12 order-2 col-md-8 order-md-1 col-lg-4 order-lg-1">
							Copyright &copy; 2020 Apple Inc. All rights reserved.
						</div>
						<div className="footer-links-terms  col-sm-12 order-3 col-lg-6 order-lg-2">
							<ul>
								<li>
									<Link to="/support">Privacy Policy</Link>
								</li>
								<li>
									<Link to="/support">Terms of Use</Link>
								</li>
								<li>
									<Link to="/support">Sales and Refunds</Link>
								</li>
								<li>
									<Link to="/support">Legal</Link>
								</li>
								<li>
									<Link to="/support">Site Map</Link>
								</li>
								<li>
									<Link to="/login" style={{ color: "#0071e3", fontWeight: "500" }}>
										Admin Portal
									</Link>
								</li>
							</ul>
						</div>
						<div className="footer-country  col-sm-12 order-1 col-md-4 order-md-2 text-md-right col-lg-2 order-lg-3">
							<div className="flag-wrapper">
								<img src={USAflag} alt="USA Flag" />
							</div>{" "}
							<div className="footer-country-name">United States</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Footer;
