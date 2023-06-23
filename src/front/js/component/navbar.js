import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/cjbooknookwhitesmall.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const handleSearch = (word) => {
		setStore({ search: word })
	}
	const total = () => {
		let totalCheckout = 0;
		for (let x = 0; x < store.user.items.length; x++) {
			totalCheckout += store.user.items[x].unit
		}
		return totalCheckout
	}


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
								value={store.search}
								onChange={(e) => actions.handleSearch(e.target.value)}
								placeholder="Search" />

						</div>
						<button type="button" className="btn btn-secondary custom-button" >
							<i className="fas fa-search"></i>
						</button>
					</div>
					<Link to="/checkout">
						<button type="button" className="btn btn-secondary me-2 custom-button position-relative">
							<i className="fas fa-shopping-cart"></i>
							<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
								{total()}

							</span>

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

							<button className="btn btn-secondary  custom-button"
								onClick={async () => {
									await actions.logout()
									navigate("/")
								}}>
								Logout
							</button>



						</div>
					)}

				</div>
			</div>
		</nav>
	);
};
