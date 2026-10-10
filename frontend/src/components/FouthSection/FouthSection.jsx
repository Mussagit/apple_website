
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function FouthSection() {
  return (
		<>
			<section className="fourth-heghlight-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="left-side-wrapper col-sm-12 col-md-6">
							<div className="left-side-container">
								<div className="title-wraper">iPhone 11</div>
								<div className="description-wraper">
									Just the right amount of everything.
								</div>
								<div className="price-wrapper">
									From $18.70/mo. or $499 with trade‑in.<sup>1</sup>
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
												Apply now <FontAwesomeIcon icon={faAngleRight} />
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="right-side-wrapper col-sm-12 col-md-6">
							<div class="right-side-container">
								<div class="title-wraper white">
									Get the latest CDC response to COVID-19.
								</div>

								<div class="links-wrapper white">
									<ul>
										<li>
											<a href="/">
												Watch the PSA <FontAwesomeIcon icon={faAngleRight} />
											</a>
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

export default FouthSection
