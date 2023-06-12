import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/cjbooknookwhitesmall.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [search, setSearch] = useState("");




	return (
		<nav className="navbar navbar-custom">
			<div className="container">
				<Link to="/" className="navbar-brand">
					<img src={CJBookNookLogo} height={80} alt="CJBookNookLogo" />
				</Link>
				<div className="ml-auto d-flex align-items-center">
					<div className="input-group me-2">
						<div className="form-outline">
							<input
								type="search"
								id="search"
								className="form-control"
								aria-describedby="search-field"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search" />

						</div>
						<button type="button" className="btn btn-secondary custom-button" onClick={() => actions.handleSearch(search)}>
							<i className="fas fa-search"></i>
						</button>
					</div>
					<Link to="/checkout">
						<button type="button" className="btn btn-secondary me-2 custom-button">
							<i className="fas fa-shopping-cart"></i>
						</button>
					</Link>
					{!sessionStorage.getItem("token") ? (
						<div className="d-flex">
							<Link to="/register">
								<button className="btn btn-secondary me-2 custom-button">Register</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-secondary custom-button">Login</button>
							</Link>
						</div>
					) : (
						<div className="d-flex">
							<Link to="/profile">
								<button className="btn btn-secondary me-2 custom-button">Profile</button>
							</Link>

							<button className="btn btn-secondary  custom-button" onClick={() => actions.logout()}>
								Logout
							</button>



						</div>
					)}

				</div>
			</div>
		</nav>
	);
};
