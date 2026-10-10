import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Arcade from "../../assets/images/icons/arcade.png";

function SixthSection() {
	return (
		<>
			<section className="sixth-heghlight-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="left-side-wrapper col-sm-12 col-md-6">
							<div className="left-side-container">
								<div className="top-logo-wrapper">
									<div className="logo-wrapper">
										<img src={Arcade} alt="Apple Arcade" />
									</div>
								</div>
								<div className="description-wraper white">
									Agent 8 is a small hero on a big mission.
								</div>
								<div className="links-wrapper">
									<ul>
										<li>
											<a href="https://apple.com/apple-arcade" target="_blank" rel="noreferrer">
												Play now <sup>2</sup>
												<FontAwesomeIcon icon={faAngleRight} />
											</a>
										</li>
										<li>
											<Link to="/support">
												Learn about Apple Arcade
												<FontAwesomeIcon icon={faAngleRight} />
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="right-side-wrapper col-sm-12 col-md-6">
							<div className="right-side-container">
								<div className="title-wraper">Apple Card Monthly Installments</div>
								<div className="description-wraper">
									Pay for your next iPhone over time, interest-free with Apple Card.
								</div>
								<div className="links-wrapper">
									<ul>
										<li>
											<Link to="/iphone">
												Learn more <FontAwesomeIcon icon={faAngleRight} />
											</Link>
										</li>
										<li>
											<Link to="/cart">
												Apply now <FontAwesomeIcon icon={faAngleRight} />
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default SixthSection;
