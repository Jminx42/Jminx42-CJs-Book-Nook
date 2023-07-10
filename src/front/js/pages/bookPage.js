import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { StarRating } from "../component/StarRating";
import { Footer } from "../component/footer";
import { ReviewBook } from "../component/reviewBook";
import "../../styles/home.css";

export const BookPage = () => {
	const params = useParams();
	const [review, setReview] = useState({ review: "", rating: 0 });
	const { store, actions } = useContext(Context);
	const [editClicked, setEditClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showBookDetails, setShowBookDetails] = useState(false);
	const [format, setFormat] = useState()
	const [alert, setAlert] = useState("");
	const [error, setError] = useState("");
	const [isGooglePreview, setIsGooglePreview] = useState(false);
	const [rating, setRating] = useState(0)
	const [editReview, setEditReview] = useState({
		rating: rating,
		review: review.review
	});


	useEffect(() => {
		actions.getBooks();
		actions.getOneBook(params.theisbn);
		actions.getNYTReview(params.theisbn);

		setTimeout(() => {
			setIsLoading(false);
			setShowBookDetails(true);
			actions.clearAlert();
		}, 3000);

	}, [params.isbn, store.alert]);

	useEffect(() => {
		if (store.book.preview && store.book.preview.includes("printsec=frontcover")) {
			setIsGooglePreview(true);
		} else {
			setIsGooglePreview(false);
		}
	}, [store.book.preview]);

	useEffect(() => {
		actions.getBookFormats();

	}, []);


	const submitReview = async (book_id) => {
		const response = await fetch(process.env.BACKEND_URL + 'api/review', {
			method: "POST",
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			},

			body: JSON.stringify({ "book_id": book_id, "review": review.review, "rating": rating })
		});

		if (response.ok) {
			const data = await response.json();
			const reviewData = data.review;
			await actions.validate_user();
			setAlert("Review added successfully");
			// console.log(reviewData);
			actions.getOneBook(params.theisbn)
			setReview({
				rating: review.rating,
				review: review.review
			});


		} else {
			const data = await response.json();
			setError(data.error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		submitReview(store.book.id, review.review, rating)
	};

	if (isLoading || !showBookDetails) {
		return (
			<div>
				<Navbar />

				<div className="container text-center mt-5">
					<div className="spinner-border filter-link" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<div>Loading book...</div>
				</div>

			</div>
		);
	}


	return (
		<div>

			<Navbar />
			{
				store.alert && store.alert !== ""
					?
					<div className="container">
						<div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
							<i className="bi bi-check-circle-fill me-2"></i>
							<div>
								{store.alert}
							</div>
							<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
						</div>
					</div>
					:
					null

			}
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

			<div className="card container mt-3 border-0">
				<div className="p-4 text-center bg-body-tertiary rounded-3 ">

					<img src={store.book.book_cover == null || store.book.book_cover == "" ? store.book.book_cover_b : store.book.book_cover} className=" w-25 float-start" alt="..." />
					<div>
						<h1 className=" display-3">{store.book.title}</h1>
						<p className="display-6">By {store.book.author}</p>
						<div className="row text-start">
							<div className="border ms-3 p-3">
								<div className="row">
									<div className="col-2 fw-bold">Book Format:</div>
									<div className="col-8">

										<select className="form-select" aria-label="Default select example" defaultValue="" onChange={(e) => setFormat(e.target.value)}>
											<option value="" disabled>Select your format</option>
											{store.bookFormats.map((format) => (
												<option key={format.id} value={format.id}>{format.book_format} - {format.book_price}€ </option>
											))}
										</select>
									</div>
									<div className="col-2 g-0">
										{
											sessionStorage.getItem("token") ?
												<button type="button" disabled={!format} className="btn me-2 custom-button" onClick={() => actions.postCheckout(format)}>
													<i className="fas fa-shopping-cart"></i>
												</button>
												:
												<div>
													<p>Want to add to your cart?&nbsp;
														<Link to="/login">
															<sup><button
																type="button"
																className="btn link-like p-0"
															>Login
															</button></sup></Link>
														&nbsp;first!</p>

												</div>
										}

									</div>
								</div>
								<div className="row">
									<div className="col-2 fw-bold">Publisher:</div>
									<div className="col-10">{!store.book.publisher ? "Not available" : store.book.publisher}</div>
								</div>
								<div className="row">
									<div className="col-2 fw-bold">Published Date:</div>
									<div className="col-10">{store.book.year}</div>
								</div>
								<div className="row">
									<div className="col-2 fw-bold">Genre:</div>
									<div className="col-10">{store.book.genre}</div>

								</div>
								<div className="row">
									<div className="col-2 fw-bold">Pages:</div>
									<div className="col-10">{store.book.pages == 0 ? "Not available" : store.book.pages}</div>
								</div>

								<div className="row">
									<div className="col-2 fw-bold">ISBN:</div>
									<div className="col-10">{params.theisbn}</div>
								</div>
								<div className="row">
									<div className="col-2 fw-bold">Rating: </div>
									<div className="col-10">{store.book.average_rating ? store.book.average_rating + " (out of " + store.book.ratings_count + " votes)" : "Not available"} </div>
								</div>


								<div className="row">
									<div className="col-2 fw-bold">Description:</div>
									<div className="col-10">{store.book.description}</div>
								</div>
							</div>
							<div className="row ms-5">
								{
									isGooglePreview ?
										<Link to={`/googlePreview/${params.theisbn}`} className="link-like">
											<p className="mt-3 fs-5 ">Click here to preview the book</p>
										</Link>
										:
										null
								}

							</div>
						</div>
					</div >
				</div >

			</div>
			<div className="container">

				{store.nytReview && Object.keys(store.nytReview).length > 0 ? (
					<div className="row my-3">
						<hr></hr>
						<h4 className="background-custom p-3 rounded">New York Times' Reviews</h4>
						<div className="card-body border">
							<h5 className="card-title">
								{store.nytReview.byline
									.split(' ')
									.map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
									.join(' ')}
							</h5>
							<h6 className="card-subtitle mb-2 text-muted">Reviewed in {store.nytReview.publication_dt}</h6>
							<p className="card-text">Excerpt: {store.nytReview.summary}</p>
							<p className="card-text">
								Review Link: <a href={store.nytReview.url} target="_blank" rel="noopener noreferrer" className="link-like">Click here</a>
							</p>
						</div>
					</div>
				) : null}
				<div className="row my-3">
					<hr></hr>
					<h4 className="background-custom p-3 rounded">Reviews & Ratings</h4>
					{store.book.reviews.map((review) => (
						<div className="card mb-5" key={review.id}>
							<ReviewBook item={review} />
						</div>
					))}

				</div>
				{!store.book.reviews.find((item) => item.user_id === store.user.id) && (
					<div className="row mb-5 mt-3 border p-2">
						<h4>Submit your review</h4>
						<p className="fst-italic">Submit either a rating, a review or both!</p>
						{sessionStorage.getItem('token') ? (
							<div>
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label htmlFor="rating">Rating</label>
										<StarRating
											rating={rating}
											editable={true}
											onRatingChange={setRating}
										/>
									</div>
									<div className="form-group m-1">
										<label htmlFor="review">Review</label>
										<textarea
											className="form-control"
											id="review"
											rows="5"
											value={review.review || ''}
											onChange={(e) => setReview({ ...review, review: e.target.value })}
										/>
									</div>
									<button className="btn custom-button mt-2" type="submit">
										Submit
									</button>
								</form>
							</div>
						) : (
							<div>
								<p>
									Want to submit your review?&nbsp;
									<Link to="/login">
										<sup>
											<button type="button" className="btn link-like p-0">
												Login
											</button>
										</sup>
									</Link>
									&nbsp;first!
								</p>
							</div>
						)}
					</div>
				)}
			</div>
			<Footer />
		</div >
	);
};
