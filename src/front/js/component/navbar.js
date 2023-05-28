import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogoSmall.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [search, setSearch] = useState("");




	return (
		<nav className="navbar navbar-custom">
			<div className="container ms-5">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><img src={CJBookNookLogo} height={"80px"} /></span>
				</Link>
				<div className="ml-auto">
					<input
						className="form-control"
						id="search"
						aria-describedby="search field"
						value={search}
						onChange={(e) => setSearch(e.target.value)} />
					<button onClick={(search) => actions.handleSearch(search)}>Search</button>
					{!sessionStorage.getItem("token") ?
						<div>
							<Link to="/register">
								<button className="btn btn-primary me-2">Register</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-primary">Login</button>
							</Link>
						</div> :
						<div>
							<button className="btn btn-primary me-2" onClick={() => actions.logout()}>Log out</button>
							<Link to="/profile">
								<button className="btn btn-primary me-2">Profile</button>
							</Link>
						</div>
					}
				</div>

			</div>
		</nav>
	);
};
