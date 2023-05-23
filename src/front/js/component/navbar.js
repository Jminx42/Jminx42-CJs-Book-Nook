import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogoSmall.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-custom">
			<div className="container ms-5">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><img src={CJBookNookLogo} height={"80px"} /></span>
				</Link>
				<div className="ml-auto">
					{!sessionStorage.getItem("token") ?
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link> :

						<button className="btn btn-primary" onClick={() => actions.logout()}>Log out</button>

					}
				</div>
			</div>
		</nav>
	);
};
