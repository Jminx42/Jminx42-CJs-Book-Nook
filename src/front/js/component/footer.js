import React, { Component } from "react";
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogoSmall.png";
import { Link } from "react-router-dom";
import "../../styles/index.css"


export const Footer = () => (
	<footer className="footer mt-auto py-3 border">
		<div className="container">
			<img src={CJBookNookLogo} height={80} alt="CJBookNookLogo" />
			<Link to="/support" className="link-like">
				<p className="mt-2">Support</p>
			</Link>

		</div>
	</footer>
);
