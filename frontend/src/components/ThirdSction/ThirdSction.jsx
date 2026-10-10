import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function ThirdSction() {
	return (
		<>
			<section className="third-hightlight-wrapper">
				<div className="container">
					<div className="title-wraper bold">iPhone 11 Pro</div>

					<div className="description-wrapper">
						Pro cameras. Pro display. Pro performance.
					</div>

					<div className="price-wrapper">
						From $24.95/mo. or $599 with trade‑in.
					</div>

					<div className="links-wrapper">
						<ul>
							<li>
								<Link to="/iphone">
									Learn More <FontAwesomeIcon icon={faAngleRight} />
								</Link>
							</li>
							<li>
								<Link to="/cart">
									Buy <FontAwesomeIcon icon={faAngleRight} />
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	);
}

export default ThirdSction;
