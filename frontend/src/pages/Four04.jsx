import React from "react";
import { Link } from "react-router-dom";

function Four04() {
	return (
		<div className="container text-center py-5" style={{ minHeight: "60vh", marginTop: "80px" }}>
			<div className="row justify-content-center">
				<div className="col-12 my-auto">
					<h1 className="font-weight-bold display-1" style={{ fontWeight: "700", color: "#1d1d1f" }}>
						404
					</h1>
					<h2 className="mb-4" style={{ fontWeight: "500", color: "#1d1d1f" }}>
						The page you’re looking for can’t be found.
					</h2>
					<div className="mt-4">
						<Link
							to="/"
							className="btn btn-primary px-4 py-2"
							style={{ borderRadius: "20px", background: "#0071e3", borderColor: "#0071e3" }}
						>
							Go to Home
						</Link>
						{" "}
						<Link
							to="/iphone"
							className="btn btn-outline-secondary px-4 py-2 ms-2"
							style={{ borderRadius: "20px" }}
						>
							View iPhones
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Four04;
