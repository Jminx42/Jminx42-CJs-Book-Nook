import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import "../../styles/index.css"
import { Card } from "../component/card";
import { Review } from "../component/review";
import { PaymentMethod } from "../component/paymentMethod";

import { EmptyPaymentMethod } from "../component/emptyPaymentMethod";


import { Context } from "../store/appContext";
import { InputProfilePic } from "../component/inputProfilePic";
import { SupportCard } from "../component/supportCard";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState(store.user);
	const [editClicked, setEditClicked] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [showForm, setShowForm] = useState(false)
	const [alert, setAlert] = useState("");
	const [error, setError] = useState("");


	// useEffect(() => {
	// 	setUser(store.user)

	// }, [store.user]);

	const handleSave = async () => {
		setEditClicked(false);

		const response = await fetch(process.env.BACKEND_URL + 'api/user/update', {
			method: "PUT",
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		});
		if (response.ok) {
			await actions.validate_user()
			setAlert("Profile successfully updated");
		} else {
			const data = await response.json()
			setError(data.error)
		}
	};

	useEffect(() => {
		getUserReviews();
	}, []);

	const getUserReviews = async () => {
		try {
			const response = await fetch(process.env.BACKEND_URL + "api/user_reviews", {
				method: "GET",
				headers: {
					Authorization: "Bearer " + sessionStorage.getItem("token"),
					"Content-Type": "application/json"
				}
			});

			if (response.ok) {
				const data = await response.json();
				setReviews(data.reviews);
				console.log(data.reviews)
			} else {
				const data = await response.json();
				setError(data.error);
			}
		} catch (error) {
			console.error("Error fetching reviews:", error);
		}
	};

	return (
		<div>
			<Navbar />
			{/* Creating the different tabs: */}
			{
				alert && alert !== ""
					?
					<div className="container">
						<div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
							<i className="bi bi-check-circle-fill me-2"></i>
							<div>
								{alert}
							</div>
							<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
						</div>
					</div>
					:
					null

			}
			{
				error && error !== ""
					?
					<div className="container">
						<div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
							<i className="bi bi-exclamation-triangle-fill"></i>
							<div>
								{error}
							</div>
							<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
						</div>
					</div>
					:
					null

			}
			<div className="container mt-3">
				<ul className="nav nav-tabs" id="myTab" role="tablist">
					<li className="nav-item nav-custom" role="presentation">
						<button className="nav-link active nav-custom" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal-tab-pane" type="button" role="tab" aria-controls="personal-tab-pane" aria-selected="true">Personal Information</button>
					</li>
					<li className="nav-item nav-custom" role="presentation">
						<button className="nav-link nav-custom" id="wishlist-tab" data-bs-toggle="tab" data-bs-target="#wishlist-tab-pane" type="button" role="tab" aria-controls="wishlist-tab-pane" aria-selected="false">Wishlist</button>
					</li>
					<li className="nav-item nav-custom" role="presentation">
						<button className="nav-link nav-custom" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false">My Reviews</button>
					</li>
					<li className="nav-item nav-custom" role="presentation">
						<button className="nav-link nav-custom" id="payment-tab" data-bs-toggle="tab" data-bs-target="#payment-tab-pane" type="button" role="tab" aria-controls="payment-tab-pane" aria-selected="false">Payment</button>
					</li>
					<li className="nav-item nav-custom" role="presentation">
						<button className="nav-link nav-custom" id="support-tab" data-bs-toggle="tab" data-bs-target="#support-tab-pane" type="button" role="tab" aria-controls="support-tab-pane" aria-selected="false">Support</button>
					</li>
				</ul>
			</div>
			{/* Adding content to each tab: */}
			<div className="tab-content" id="myTabContent">
				<div className="tab-pane fade show active" id="personal-tab-pane" role="tabpanel" aria-labelledby="personal-tab" tabIndex="0">
					<div className="container mt-3">
						<div className="row">
							<div className="col-6">
								{!editClicked ? (
									!user.profile_picture
										?
										<img
											src="https://placehold.co/600x400.png"
											className="card-img-top"
											alt="Profile Picture" />
										:
										<img
											src={user.profile_picture}
											className="card-img-top"
											id="profile-picture"
											alt="Profile Picture"
										/>
								) : (
									<div>
										<InputProfilePic />
									</div>
								)}
							</div>
							<div className="col-6">
								<label className="">Email: </label>
								<p> {user.email}</p>

								<label className="text-start">Name: </label>
								{!editClicked ? (
									<p> {user.full_name}</p>
								) : (
									<input
										className="form-control"
										id="full_name"
										aria-describedby="full_name"
										value={user.full_name}
										onChange={(e) => setUser({ ...user, full_name: e.target.value })}
									/>
								)}


								<label className="text-start">Password: </label>
								{!editClicked ? (
									<p>{user.password}</p>
								) : (
									<input
										className="form-control"
										id="password"
										aria-describedby="password"
										value={user.password || ""}
										onChange={(e) => setUser({ ...user, password: e.target.value })}
									/>
								)}

								<label className="text-start">Shipping Address: </label>
								{!editClicked ? (

									<p>{user.address}</p>
								) : (
									<input
										className="form-control"
										id="address"
										aria-describedby="address"
										value={user.address || ""}
										onChange={(e) => setUser({ ...user, address: e.target.value })}
									/>
								)}

								<label className="text-start">Billing Address: </label>
								{!editClicked ? (

									<p>{user.billing_address}</p>
								) : (
									<input
										className="form-control"
										id="billing_address"
										aria-describedby="billing_address"
										value={user.billing_address || ""}
										onChange={(e) => setUser({ ...user, billing_address: e.target.value })}
									/>
								)}



							</div>
							<div className="row">
								{!editClicked ? (

									<button className="btn btn-secondary custom-button" onClick={() => setEditClicked(true)}>
										Edit
									</button>

								) : (
									<div className="d-flex">
										<button className="btn btn-secondary me-2 custom-button" onClick={handleSave}>
											Save
										</button>
										<button className="btn btn-secondary " onClick={() => setEditClicked(false)}>
											Close
										</button>
									</div>

								)}
							</div>
						</div>
					</div>
				</div>
				<div className="tab-pane fade" id="wishlist-tab-pane" role="tabpanel" aria-labelledby="wishlist-tab" tabIndex="0">
					<div className="container mt-4">
						<div className="row d-flex">
							{/* {store.user.wishlist && store.user.wishlist.length !== 0 ? store.user.wishlist.filter((book) => book.title.toLowerCase().includes(store.search)).map((book) => {
								return <Card key={book.isbn} item={book} />
							}) : null} */}
							{store.user.wishlist && store.user.wishlist.length !== 0 ? store.user.wishlist.map((book) => {
								return <Card key={book.id} item={book.book_id} />
							}) :
								<div>
									Add books to your wishlist!
								</div>}
						</div>
					</div>

				</div>
				<div className="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabIndex="0">
					<div className="container mt-4">
						<div className="row d-flex g-3">
							{store.user.review.length === 0 ? (
								<div>
									Add a review to your latest read now!
								</div>
							) : (
								store.user.review.map((review) => {
									return <Review key={review.id} item={review} />
								})
							)}
						</div>
					</div>

				</div>
				<div className="tab-pane fade" id="payment-tab-pane" role="tabpanel" aria-labelledby="payment-tab" tabIndex="0">
					<div className="container mt-4">

						<button className="btn custom-button" onClick={() =>
							setShowForm(true)}>Add New</button>
						{showForm ? <EmptyPaymentMethod closeForm={() => setShowForm(false)} /> : null}
						<h5 className="card-title">Saved Payment Method(s)</h5>
						{store.user.payment_method && store.user.payment_method.map((payment_method) => {
							return <PaymentMethod key={payment_method.id} item={payment_method} />
						})}

					</div>
				</div>
				<div className="tab-pane fade" id="support-tab-pane" role="tabpanel" aria-labelledby="support-tab" tabIndex="0">
					<div className="container mt-4">
						{store.user.support && store.user.support.length !== 0 ? store.user.support.map((ticket) => {
							return <SupportCard key={ticket.ticket_id} item={ticket} />
						}) : <div>
							Want to contact us? Go to our support page.
						</div>}
					</div>
				</div>


			</div>

		</div>
	);
};
