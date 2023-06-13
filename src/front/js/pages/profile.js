import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import "../../styles/index.css"
import { Card } from "../component/card";
import { Review } from "../component/review";

import { Context } from "../store/appContext";
import { InputProfilePic } from "../component/inputProfilePic";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState(store.user);
	const [editClicked, setEditClicked] = useState(false);
	const wishlist = JSON.parse(sessionStorage.getItem("wishlist"));
	const [reviews, setReviews] = useState([]);


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
			alert("Profile successfully updated");
		} else {
			const data = await response.json()
			alert(data.error)
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
				alert(data.error);
			}
		} catch (error) {
			console.error("Error fetching reviews:", error);
		}
	};

	return (
		<div>
			<Navbar />
			{/* Creating the different tabs: */}
			<div className="container mt-3">
				<ul className="nav nav-tabs" id="myTab" role="tablist">
					<li className="nav-item" role="presentation">
						<button className="nav-link active" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal-tab-pane" type="button" role="tab" aria-controls="personal-tab-pane" aria-selected="true">Personal Information</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className="nav-link" id="wishlist-tab" data-bs-toggle="tab" data-bs-target="#wishlist-tab-pane" type="button" role="tab" aria-controls="wishlist-tab-pane" aria-selected="false">Wishlist</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false">My Reviews</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className="nav-link" id="payment-tab" data-bs-toggle="tab" data-bs-target="#payment-tab-pane" type="button" role="tab" aria-controls="payment-tab-pane" aria-selected="false">Payment</button>
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
									<p>###############</p>
								) : (
									<input
										className="form-control"
										id="password"
										aria-describedby="password"
										value={user.password}
										onChange={(e) => setUser({ ...user, password: e.target.value })}
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
							}) : null}
						</div>
					</div>

				</div>
				<div className="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabIndex="0">
					<div className="container mt-4">
						<div className="row d-flex g-3">
							{reviews.map(review => (
								<Review key={review.id} item={review} />
							))}
						</div>
					</div>

				</div>
				<div className="tab-pane fade" id="payment-tab-pane" role="tabpanel" aria-labelledby="payment-tab" tabIndex="0">
					<div className="container mt-4">
						Payment Methods
					</div>
				</div>

			</div>

		</div>
	);
};
