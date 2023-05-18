import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogoSmall.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-custom">
			<div className="container ms-5">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><img src={CJBookNookLogo} height={"80px"} /></span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
