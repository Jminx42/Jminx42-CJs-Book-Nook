import React, { Component } from "react";
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogoSmall.png";
import { Link } from "react-router-dom";
import "../../styles/index.css"


export const Footer = () => (
	<footer className="footer">
		<hr></hr>
		<div className="d-flex p-3">
			<div className="container">
				<div className="row align-items-center ">
					<div className="col-4 justify-content-start">
						<img src={CJBookNookLogo} height={100} alt="CJBookNookLogo" />
					</div>
					<div className="col-8 text-end">
						<i className="fa-brands fa-instagram fs-2 me-4"></i>
						<i className="fa-brands fa-facebook-f fs-2 me-4"></i>
						<i className="fa-brands fa-twitter fs-2 me-4"></i>
						<i className="fa-brands fa-linkedin-in fs-2 me-4"></i>
					</div>
				</div>
				<div className="row align-items-end">
					<div className="col-9 d-flex justify-content-start">
						<Link to="/register">
							<button className="btn link-like">
								Register
							</button>
						</Link>
						<Link to="/support">
							<button className="btn link-like">
								Support
							</button>
						</Link>
						<Link to="/legal">
							<button className="btn link-like">
								Legal Notice
							</button>
						</Link>
						<Link to="/data-protection">
							<button className="btn link-like">
								Data Protection Notice
							</button>
						</Link>
					</div>
				</div>
			</div>



		</div>
	</footer>
);
