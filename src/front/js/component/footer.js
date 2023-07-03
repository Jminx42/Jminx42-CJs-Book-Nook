import React, { Component } from "react";
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogoSmall.png";
import { Link } from "react-router-dom";
import "../../styles/index.css"


export const Footer = () => (
	<footer className="footer">
		<hr></hr>
		<div className="d-flex justify-content-center p-3">
			<div className="container text-center">
				<div className="row">
					<div className="col-3">
						<img src={CJBookNookLogo} height={80} alt="CJBookNookLogo" />
					</div>

				</div>
				<div className="row">
					Meeting reading needs since 2023
				</div>
			</div>



		</div>
	</footer>
);
