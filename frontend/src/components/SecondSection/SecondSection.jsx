import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function SecondSection() {
	return (
		<>
			<section className="second-hightlight-wrapper">
				<div className="container">
					<div className="new-alert">New</div>

					<div className="title-wraper bold black">MacBook Air</div>

					<div className="description-wrapper black">
						Twice the speed. Twice the storage.
					</div>

					<div className="price-wrapper grey">From $999.</div>

					<div className="links-wrapper">
						<ul>
							<li>
								<Link to="/mac">
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

export default SecondSection;
