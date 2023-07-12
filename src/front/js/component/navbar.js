import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProfileBtn } from "../component/profileBtn";
import "../../styles/index.css"
import CJBookNookNoLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookNoLogoWhite.png";
import { SideNavigation } from "./sideNavigation";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [visibleSearchBar, setVisibleSearchBar] = useState(false);

	const total = () => {
		let totalCheckout = 0;
		for (let x = 0; x < store.user.items.length; x++) {
			totalCheckout += store.user.items[x].unit
		}
		return totalCheckout
	}
	const [isOpen, setIsOpen] = useState(false);

	const openNav = () => {
		setIsOpen(true);
	};

	const closeNav = () => {
		setIsOpen(false);
	};


	return (
		<nav className="navbar navbar-expand-lg background-custom px-md-5 px-lg-5 py-0">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">
					<img src={CJBookNookNoLogo} height={50} alt="CJBookNookLogo" />
				</Link>
				<SideNavigation />

				<ul className="navbar-nav">
					<li className="nav-item ">
						<div className="d-flex">
							{
								visibleSearchBar ?
									<div className="input-group">
										<input
											type="search"
											id="search"
											className="form-control flex-grow-1"
											aria-describedby="button-addon2"
											value={store.search}
											onChange={(e) => actions.handleSearch(e.target.value)}
											onKeyUp={(e) => { e.key === 'Enter' && navigate('/explore') }}
											placeholder="Search" />
										<button
											type="button"
											className="btn custom-button"
											id="button-addon2"
											onClick={() => {
												if (visibleSearchBar && store.search !== "") {
													setVisibleSearchBar(false);
												} else {
													setVisibleSearchBar(false);
													navigate('/explore');
												}

											}}>
											<i className="fas fa-search"></i>
										</button >
									</div>
									:
									<button type="button" className="btn custom-button" id="button-addon2" onClick={() => setVisibleSearchBar(!visibleSearchBar)}>
										<i className="fas fa-search"></i>
									</button >
							}


							{!sessionStorage.getItem("token") ? (
								<>
									<Link to="/explore">
										<button className="btn mx-2 custom-button"><i className="bi bi-book-fill"></i></button>
									</Link>
									<Link to="/login">
										<button className="btn btn-secondary custom-button "> Login <i className="fa-solid fa-right-to-bracket"></i></button>
									</Link>

								</>
							) : (

								<>
									<Link to="/explore">
										<button className="btn mx-2 custom-button"><i className="bi bi-book-fill"></i></button>
									</Link>
									<Link to="/checkout">
										<button type="button" className="btn btn-secondary me-2 custom-button position-relative">
											<i className="fas fa-shopping-cart"></i>
											<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill background-dark">
												{total()}

											</span>

										</button>
									</Link>
									<Link to="/wishlist">

										<button className="btn me-2 custom-button"><i className="fa-solid fa-heart"></i></button>
									</Link>
									<Link to="/support">
										<button className="btn me-2 custom-button"><i className="fa-solid fa-envelope"></i></button>
									</Link>

									<ProfileBtn />


								</>
							)}
						</div>
					</li>

				</ul>

			</div>
		</nav >
	);
};
