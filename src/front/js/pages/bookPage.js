import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { GoogleBooksViewer } from "../component/googleBooksViewer";
import { GoogleViewer2 } from "../component/googleViewer2";
import ReviewBook from "../component/reviewBook";

export const BookPage = () => {
	const params = useParams();
	const [review, setReview] = useState({ review: "", rating: 0 });
	const [preview, setPreview] = useState(false);
	const { store, actions } = useContext(Context);
	const [editClicked, setEditClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showBookDetails, setShowBookDetails] = useState(false);
	const [format, setFormat] = useState()
	const [editReview, setEditReview] = useState({
		rating: review.rating,
		review: review.review
	});
	const [alert, setAlert] = useState("");
	const [error, setError] = useState("");
	const [isGooglePreview, setIsGooglePreview] = useState(false);


	useEffect(() => {
		actions.getBooks();
		actions.getOneBook(params.theisbn);
		actions.getNYTReview(params.theisbn);

		setTimeout(() => {
			setIsLoading(false);
			setShowBookDetails(true);
			actions.clearAlert();
		}, 3000);

	}, [params.isbn]);

	useEffect(() => {
		if (store.book.preview && store.book.preview.includes("printsec=frontcover")) {
			setIsGooglePreview(true);
		} else {
			setIsGooglePreview(false);
		}
	}, [store.book.preview]);



	// useEffect(() => {
	// 	setEditReview({
	// 		rating: review.rating,
	// 		review: review.review
	// 	});
	// }, [review]);

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

			body: JSON.stringify({ "book_id": book_id, "review": review.review, "rating": review.rating })
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
			setEditReview({
				rating: review.rating,
				review: review.review
			})
			setReview({
				rating: 0,
				review: ''
			});
		} else {
			const data = await response.json();
			setError(data.error);
		}
	}

	const handleEditReview = () => {
		if (store.user.review.length !== 0) {
			store.user.review.forEach((rev) => {
				if (rev.book_id && rev.book_id.isbn == params.theisbn) {
					setEditReview({
						rating: rev.rating,
						review: rev.review
					});
					setEditClicked(true);
				}
			});
		}
	};

	// const handleOptionChange = (event) => {
	// 	setSelectedOption(event.target.value);
	// 	// Update the cart state with the selected option
	// 	// You can implement your logic to add the option to the cart here
	// };

	// const handleAddToCart = () => {

	// }

	const handleSubmit = (e) => {
		e.preventDefault();
		submitReview(store.book.id, review.review, review.rating)
	};

	if (isLoading || !showBookDetails) {
		// Display loading spinner and message
		return (
			<div>
				<Navbar />

				<div className="container text-center mt-5">
					<div className="spinner-border" role="status">
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

			<div className="card container mt-3">
				<div className="" >

					<div className="p-4 text-center bg-body-tertiary rounded-3">
						<img src={store.book.book_cover == null || store.book.book_cover == "" ? store.book.book_cover_b : store.book.book_cover} className=" w-25 float-start" alt="..." />
						<div>
							<h1 className=" display-3">{store.book.title}</h1>
							<p className="display-6">By {store.book.author}</p>
							<div className="row text-start">
								<div className="border ms-3 p-3">
									<div className="row">
										<div className="col-2">Publisher:</div>
										<div className="col-10">{!store.book.publisher ? "Not available" : store.book.publisher}</div>
									</div>
									<div className="row">
										<div className="col-2">Published Date:</div>
										<div className="col-10">{store.book.year}</div>
									</div>
									<div className="row">
										<div className="col-2">Genre:</div>
										<div className="col-10">{store.book.genre}</div>
										{/* <div ">{store.book.genre && store.book.genre.join("& ")}</div> */}

									</div>
									<div className="row">
										<div className="col-2">Pages:</div>
										<div className="col-10">{store.book.pages == 0 ? "Not available" : store.book.pages}</div>
									</div>

									<div className="row">
										<div className="col-2">ISBN:</div>
										<div className="col-10">{params.theisbn}</div>
									</div>
									<div className="row">
										<div className="col-2">Rating: </div>
										<div className="col-10">{store.book.average_rating ? store.book.average_rating + " (out of " + store.book.ratings_count + " votes)" : "Not available"} </div>
									</div>
									<div className="row">
										<div className="col-2">Book Format:</div>
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
																	className="btn btn-link p-0"
																>Login
																</button></sup></Link>
															&nbsp;first!</p>

													</div>
											}

										</div>
									</div>

									<div className="row">
										<div className="col-2">Description:</div>
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
			</div>
			<div className="container">
				{store.nytReview && store.nytReview !== {} ?
					<div className="row mb-3 mt-3">
						<h4>New York Times' Reviews</h4>
						<p>By {store.nytReview.byline.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join(' ')}</p>
						<p>Reviewed in {store.nytReview.publication_dt}</p>
						<p>Excerpt: {store.nytReview.summary}</p>
						<p>Review Link: <a href={store.nytReview.url} target="_blank" rel="noopener noreferrer">Click here</a></p>
					</div> : null}

				<h4>Reviews</h4>
				{store.book.reviews.map((review) => {
					return <ReviewBook key={review.id} item={review} />
				})}
				{store.book.reviews.find((item) => item.user_id === store.user.id)
					?
					null
					:
					<div className="row mb-3 mt-3">
						<h4>Submit your review</h4>
						{sessionStorage.getItem("token") ?
							<div>
								<form onSubmit={handleSubmit}>
									<label>Rating</label>
									<input
										className="form-control"
										id="rating"
										aria-describedby="rating"
										value={review.rating || ""}
										onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
									/>
									<label>Review</label>
									<textarea
										className="form-control"
										id="review"
										aria-describedby="review"
										rows="5"
										value={review.review || ""}
										onChange={(e) => setReview({ ...review, review: e.target.value })}
									/>
									<button className="btn custom-button text-white mt-3 mb-4" onClick={() => {
										setReview({ ...review, book_id: store.book.id })

									}
									} type="submit">
										Submit
									</button>

								</form>
							</div>
							:
							<div>
								<p>Want to submit your review?&nbsp;
									<Link to="/login">
										<sup><button
											type="button"
											className="btn btn-link p-0"
										>Login
										</button></sup></Link>
									&nbsp;first!</p>
							</div>
						}
					</div>
				}
			</div>
		</div >
	);
};
