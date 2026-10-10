import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


function FirstSection() {
	return (
		<>
			<section className="first-hightlight-wrapper">
				<div className="container">
					<div className="new-alert">New</div>

					<div className="title-wraper bold black">iPad Pro</div>

					<div className="links-wrapper">
						<ul>
							<li>
								<Link to="/ipad">
									Learn more <FontAwesomeIcon icon={faAngleRight} />
								</Link>
							</li>
							<li>
								<Link to="/cart">
									Order <FontAwesomeIcon icon={faAngleRight} />
								</Link>
							</li>
						</ul>
					</div>

					<div className="ipod-caption row">
						<div className="col-sm-12 col-md-6 text-md-right">
							iPad Pro available starting 3.25
						</div>
						<div className="col-sm-12 col-md-6 text-md-left">
							Magic Keyboard coming in May
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default FirstSection;
