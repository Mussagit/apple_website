import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import AppleTv from "../../assets/images/icons/apple-tv-logo.png";
import banker from "../../assets/images/home/banker.png";
import watchSeries from "../../assets/images/icons/watch-series5-logo.png";

function FifthSection() {
	return (
		<>
			<section className="fifth-heghlight-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="left-side-wrapper col-sm-12 col-md-6">
							<div className="left-side-container">
								<div className="top-logo-wrapper">
									<div className="logo-wrapper">
										<img src={AppleTv} alt="Apple TV" />
									</div>
								</div>

								<div className="tvshow-logo-wraper">
									<img src={banker} alt="The Banker" />
								</div>

								<div className="watch-more-wrapper">
									<Link to="/tv">
										Watch now on the Apple TV App{" "}
										<FontAwesomeIcon icon={faAngleRight} />
									</Link>
								</div>
							</div>
						</div>
						<div className="right-side-wrapper col-sm-12 col-md-6">
							<div className="right-side-container">
								<div className="top-logo-wrapper">
									<div className="logo-wrapper">
										<img src={watchSeries} alt="Apple Watch Series 5" />
									</div>
								</div>
								<div className="description-wraper">
									With the Always-On Retina display.
									<br />
									You’ve never seen a watch like this.
								</div>
								<div className="links-wrapper">
									<ul>
										<li>
											<Link to="/watch">
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
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default FifthSection;
