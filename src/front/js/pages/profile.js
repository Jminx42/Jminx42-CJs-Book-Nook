import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import "../../styles/index.css"
import { Card } from "../component/card";
import { Review } from "../component/review";
import { PaymentMethod } from "../component/paymentMethod";
import { TransactionCard } from "../component/transactionCard";
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
	const [activeTab, setActiveTab] = useState('personal')


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

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		getUserReviews()
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};

		setActiveTab(params)
	}, []);

	const isMobile = windowWidth <= 768;

	// useEffect(() => {
	// 	getUserReviews();
	// }, []);

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
			<div className="d-flex">
				{!isMobile ?
					(<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '15rem' }}>
						<button
							className={`d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none nav-link btn btn-sm w-100 ${activeTab === 'personal' ? 'active' : ''
								}`}
							onClick={() => setActiveTab('personal')}
						>
							<span className="fs-4">Profile</span>
						</button>
						<hr />
						<ul className="nav nav-pills flex-column mb-auto ">
							<li className="nav-item">
								<button
									className={`nav-link btn w-100 text-start${activeTab === 'personal' ? 'active' : ''}`}
									onClick={() => setActiveTab('personal')}
								>
									<i className="fa-solid fa-user"></i> Personal Information
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn w-100 text-start${activeTab === 'wishlist' ? 'active' : ''}`}
									onClick={() => setActiveTab('wishlist')}
								>
									<i className="fa-solid fa-heart"></i> Wishlist
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn w-100 text-start${activeTab === 'reviews' ? 'active' : ''}`}
									onClick={() => setActiveTab('reviews')}
								>
									<i className="fa-regular fa-keyboard"></i> My Reviews
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn w-100 text-start${activeTab === 'payment' ? 'active' : ''}`}
									onClick={() => setActiveTab('payment')}
								>
									<i className="fa-regular fa-credit-card"></i> Payment Methods
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn w-100 text-start${activeTab === 'purchase' ? 'active' : ''}`}
									onClick={() => setActiveTab('purchase')}
								>
									<i className="fa-regular fa-calendar-days"></i> Purchase History
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link btn w-100 text-start${activeTab === 'support' ? 'active' : ''}`}
									onClick={() => setActiveTab('support')}
								>
									<i className="fa-solid fa-envelope"></i> Support
								</button>
							</li>
						</ul>
						<hr />
					</div>) :
					(
						<div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: "3rem" }}>
							{/* <a href="/" className="d-block p-3 link-body-emphasis text-decoration-none" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
        Profile
    </a> */}
							<ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
								<li className="nav-item">
									<button className={`py-3 border-bottom rounded-0 nav-link btn ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')} aria-current="page" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Personal" data-bs-original-title="Personal">
										<i className="fa-solid fa-user"></i>
									</button>
								</li>
								<li>
									<button className={`py-3 border-bottom rounded-0 nav-link btn ${activeTab === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveTab('wishlist')} data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Reviews" data-bs-original-title="Reviews">
										<i className="fa-solid fa-heart"></i>
									</button>
								</li>
								<li>
									<button className={`py-3 border-bottom rounded-0 nav-link btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')} data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Reviews" data-bs-original-title="Reviews">
										<i className="fa-regular fa-keyboard"></i>
									</button>
								</li>
								<li>
									<button className={`nav-link py-3 border-bottom rounded-0 btn ${activeTab === 'payment' ? 'active' : ''}`} onClick={() => setActiveTab('payment')} data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Payment" data-bs-original-title="Payment">
										<i className="fa-regular fa-credit-card"></i>
									</button>
								</li>
								<li>
									<button className={`nav-link py-3 border-bottom rounded-0 btn ${activeTab === 'purchase' ? 'active' : ''}`} onClick={() => setActiveTab('purchase')} data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Purchase History" data-bs-original-title="Purchase History">
										<i className="fa-regular fa-calendar-days"></i>
									</button>
								</li>
								<li>
									<button className={`nav-link py-3 border-bottom rounded-0 btn ${activeTab === 'support' ? 'active' : ''}`} onClick={() => setActiveTab('support')} data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Support" data-bs-original-title="Support">
										<i className="fa-solid fa-envelope"></i>
									</button>
								</li>
							</ul>
						</div>
					)}
				{/* Creating the different tabs: */}
				<div className="flex-grow-1 m-0">
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

					{/* Adding content to each tab: */}
					<div className={`tab-content ${isMobile ? 'mt-0' : 'profile-container'}`} id="myTabContent">
						<div className={`tab-pane fade ${activeTab === 'personal' ? 'show active' : ''}`} id="personal-tab-pane" role="tabpanel" aria-labelledby="personal-tab" tabIndex="0">
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
									<div className="d-flex justify-content-end">
										{!editClicked ? (

											<button className="btn btn-secondary custom-button" onClick={() => setEditClicked(true)}>
												<i className="fa-solid fa-pen-to-square"></i>
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
						<div className={`tab-pane fade ${activeTab === 'wishlist' ? 'show active' : ''}`} id="wishlist-tab-pane" role="tabpanel" aria-labelledby="wishlist-tab" tabIndex="0">
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
						<div className={`tab-pane fade ${activeTab === 'reviews' ? 'show active' : ''}`} id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabIndex="0">
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
						<div className={`tab-pane fade ${activeTab === 'payment' ? 'show active' : ''}`} id="payment-tab-pane" role="tabpanel" aria-labelledby="payment-tab" tabIndex="0">
							<div className="container mt-4">


								<button className="btn custom-button" onClick={() =>
									setShowForm(true)}>Add New</button>
								{showForm ? <EmptyPaymentMethod closeForm={() => setShowForm(false)} /> : null}
								{store.user.payment_method && store.user.payment_method.length === 1 ?
									<h4 className="mt-2 mb-2">Saved Payment Method</h4>
									: store.user.payment_method && store.user.payment_method.length > 1 ?
										<h4 className="mt-2 mb-2">Saved Payment Methods</h4> : null}

								<div className="row d-flex mx-1 gap-2">
									{store.user.payment_method && store.user.payment_method.map((payment_method) => {
										return <PaymentMethod key={payment_method.id} item={payment_method} />
									})}
								</div>

							</div>
						</div>
						<div className={`tab-pane fade ${activeTab === 'purchase' ? 'show active' : ''}`} id="purchase-tab-pane" role="tabpanel" aria-labelledby="purchase-tab" tabIndex="0">
							<div className="container mt-4">

								<div className="row d-flex mx-1 gap-2">
									{store.user.transaction && store.user.transaction.map((transaction) => {
										return <TransactionCard key={transaction.id} item={transaction} />
									})}
								</div>

							</div>
						</div>
						<div className={`tab-pane fade ${activeTab === 'support' ? 'show active' : ''}`} id="support-tab-pane" role="tabpanel" aria-labelledby="support-tab" tabIndex="0">
							<div className="container mt-4">
								{store.user.support && store.user.support.length !== 0 ? store.user.support.map((ticket) => {
									return <SupportCard key={ticket.ticket_id} item={ticket} />
								}) : <div>
									Want to contact us? Go to our <Link to="/support">
										<a className="link-like">
											support
										</a>
									</Link> page.

								</div>}
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

	);
};
