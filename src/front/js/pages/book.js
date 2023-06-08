import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { GoogleBooksViewer } from "../component/googleBooksViewer";
import { GoogleViewer2 } from "../component/googleViewer2";

export const Book = () => {
	const params = useParams();
	const [review, setReview] = useState({ book_isbn: parseInt(params.theisbn) })
	const [preview, setPreview] = useState(false)
	const { store, actions } = useContext(Context);

	const [price, setPrice] = useState(store.bookPrice)
	const [selectedOption, setSelectedOption] = useState('');

	useEffect(() => {
		actions.getBooks();
		actions.getOneBook(params.theisbn)
		actions.getNYTReview(params.theisbn)

	}, [])

	// useEffect(() => {
	// 	actions.getOneBook(params.theisbn)
	// 	actions.getNYTReview(params.theisbn)
	// 	console.log(store.book)
	// 	if (store.book.year) {
	// 		actions.setBookPrice((store.book.year));
	// 	}
	// }, [store.book.year])

	const submitReview = async (id) => {


		const response = await fetch(process.env.BACKEND_URL + 'api/review', {
			method: "POST",
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			},

			body: JSON.stringify(review)
		});

		if (response.ok) {
			await actions.validate_user()
			alert("Review added successfully");
		} else {
			const data = await response.json()
			alert(data.error)
		}
	};

	// const handleOptionChange = (event) => {
	// 	setSelectedOption(event.target.value);
	// 	// Update the cart state with the selected option
	// 	// You can implement your logic to add the option to the cart here
	// };

	// const handleAddToCart = () => {

	// }

	return (
		<div>
			<Navbar />

			<div className="card container mt-3">
				<div className="p-4 text-center bg-body-tertiary rounded-3">
					<img src={store.book.book_cover == null || store.book.book_cover == "" ? store.book.book_cover_b : store.book.book_cover} className=" w-25 float-start" alt="..." />
					<div>
						<h1 className=" display-3">{store.book.title}</h1>
						<p className="display-6">By {store.book.author}</p>
						<div className="row text-start">

							<div className="row">
								<div className="col-2">Publisher:</div>
								<div className="col-10">{store.book.publisher}</div>
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
								<div className="row">
									<div className="col-2">ISBN:</div>
									<div className="col-10">{params.theisbn}</div>
								</div>
								<div className="row">
									<div className="col-2">Rating: </div>
									<div className="col-10">{store.book.average_rating ? store.book.average_rating + " (out of " + store.book.ratings_count + " votes)" : "Not available"} </div>
								</div>
								<div className="col-2">Price:</div>
								<div className="col-10">
									{/* <select className="form-select" aria-label="Default select example" defaultValue="" onChange={handleOptionChange}>
										<option value="" disabled>Select your format</option>
										{store.bookPrice !== null && (
											<>
												<option value="1">Paperback: {store.bookPrice.toFixed(2)}€</option>
												<option value="2">Hardcover: {(store.bookPrice + 5).toFixed(2)}€</option>
												<option value="3">eBook: {(store.bookPrice - 6).toFixed(2)}€</option>
												<option value="4">Audiobook: {(store.bookPrice + 10).toFixed(2)}€</option>
											</>)}
									</select>  */}
									<button onClick={() => handleAddToCart(selectedOption)}>Add to Cart</button>
								</div>
							</div>
							<div className="row">
								<div className="col-2">Description:</div>
								<div className="col-10">{store.book.description}</div>
							</div>
							<div className="row">
								<Link to={`/googlePreview/${params.theisbn}`}>
									<p className="mt-3 fs-5">Click here to preview the book</p>
								</Link>
							</div>
						</div>
					</div >
				</div >
			</div>

			<div className="container">
				{/* {store.nytReview ?
					<div className="row mb-3 mt-3">
						<h4>Reviews</h4>
						<p>{store.nytReview.byline}</p>
						<p>Reviewed in: {store.nytReview.publication_dt}</p>
						<p>Excerpt: {store.nytReview.summary}</p>
						<p>Review Link: <a href={store.nytReview.url} target="_blank" rel="noopener noreferrer">Click here</a></p>
					</div> : null} */}
				<div className="row mb-3 mt-3">
					<h4>Submit your review</h4>
					{sessionStorage.getItem("token") ?
						<div>
							<form onSubmit={(e) => e.preventDefault()}>
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
								<button className="btn profile-custom-button text-white mt-3" onClick={() => {
									setReview({ ...review, book_isbn: params.theisbn })
									submitReview(params.theisbn)
								}
								} type="submit">
									Submit
								</button>
							</form>
						</div> : <div>
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
			</div>

		</div >

	);
};

