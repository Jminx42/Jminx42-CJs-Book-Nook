import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { GoogleBooksViewer } from "../component/googleBooksViewer";
import { GoogleViewer2 } from "../component/googleViewer2";

export const Book = () => {
	const params = useParams();
	const [review, setReview] = useState({})
	const [preview, setPreview] = useState(false)
	const { store, actions } = useContext(Context);
	// const url = store.nytReview.url;
	// const cleanedUrl = url.replace(/\\/g, "");
	// console.log(cleanedUrl);

	useEffect(() => {
		actions.getOneGoogleBook(params.theisbn)
		actions.getNYTReview(params.theisbn)


	}, [])

	const submitReview = async (id) => {

		const response = await fetch(process.env.BACKEND_URL + 'api/review', {
			method: "POST",
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			},

			body: JSON.stringify({ review })
		});
		console.log(review)
		if (response.ok) {
			await actions.validate_user()
			alert("Review added successfully");
		} else {
			const data = await response.json()
			alert(data.error)
		}
	};

	return (
		<div>
			<Navbar />
			{/* <div className="container">
				<div>
					<h1> {store.oneGoogleBook.title}</h1>
					<p>Author: {store.oneGoogleBook.authors && store.oneGoogleBook.authors.join(", ")}</p>
					<p>Publisher: {store.oneGoogleBook.publisher}</p>
					<p>Published Date: {store.oneGoogleBook.publishedDate}</p>
					<p>ISBN: {params.theisbn}</p>
					<p>Pages: {store.oneGoogleBook.pageCount == 0 ? "Not available" : store.oneGoogleBook.pageCount}</p>
					<p>Genre: {store.oneGoogleBook.categories && store.oneGoogleBook.categories.join("& ")}</p>
					<p>Description: {store.oneGoogleBook.description}</p>

					<img src={store.oneGoogleBook.imageLinks && store.oneGoogleBook.imageLinks.thumbnail} className="img-thumbnail w-25 float-start" alt="..." />
					<p>Preview: {store.oneGoogleBook.previewLink}</p>

					{store.nytReview ?
						<div>
							<h4>Reviews</h4>
							<p>{store.nytReview.byline}</p>
							<p>Reviewed in: {store.nytReview.publication_dt}</p>
							<p>Excerpt: {store.nytReview.summary}</p>
							<p>Review Link: <a href={store.nytReview.url} target="_blank" rel="noopener noreferrer">Click here</a></p>
						</div> : null}
				</div>

			</div> */}
			<div className="card container mt-3">
				<div className="p-4 text-center bg-body-tertiary rounded-3">
					<img src={store.oneGoogleBook.imageLinks && store.oneGoogleBook.imageLinks.thumbnail} className=" w-25 float-start" alt="..." />
					<div>
						<h1 className=" display-3">{store.oneGoogleBook.title}</h1>
						<p className="display-6">{store.oneGoogleBook.authors && store.oneGoogleBook.authors.join(", ")}</p>
						<div className="row text-start">

							<div className="row">
								<div className="col-2">Publisher:</div>
								<div className="col-10">{store.oneGoogleBook.publisher}</div>
							</div>
							<div className="row">
								<div className="col-2">Published Date:</div>
								<div className="col-10">{store.oneGoogleBook.publishedDate}</div>
							</div>
							<div className="row">
								<div className="col-2">Genre:</div>
								<div className="col-10">{store.oneGoogleBook.categories && store.oneGoogleBook.categories.join("& ")}</div>
							</div>
							<div className="row">
								<div className="col-2">Pages:</div>
								<div className="col-10">{store.oneGoogleBook.pageCount == 0 ? "Not available" : store.oneGoogleBook.pageCount}</div>
							</div>
							<div className="row">
								<div className="col-2">Price:</div>
								<div className="col-10">put price here!!!!!</div>
							</div>
							<div className="row">
								<div className="col-2">ISBN:</div>
								<div className="col-10">{params.theisbn}</div>
							</div>
							<div className="row">
								<div className="col-2">Description:</div>
								<div className="col-10">{store.oneGoogleBook.description}</div>
							</div>
							<div className="row">
								<Link to={`/googlePreview/${params.theisbn}`}>
									<p className="mt-3 fs-5">Click here to preview the book</p>
								</Link>
								{/* <button className="btn profile-custom-button text-white mt-3" onClick={() => setPreview(true)}>
									Click here
								</button> */}
							</div>

						</div>

					</div>
					{/* <GoogleBooksViewer isbn={params.theisbn} /> */}
					{/* I'm trying to hide the viewer with the button but it stops working when I do the ternary... I don't know why! */}
					{/* {preview ? <div><GoogleBooksViewer isbn={params.theisbn} /> </div> : null} */}

				</div >
			</div >
			<div className="container">
				{store.nytReview ?
					<div className="row mb-3 mt-3">
						<h4>Reviews</h4>
						<p>{store.nytReview.byline}</p>
						<p>Reviewed in: {store.nytReview.publication_dt}</p>
						<p>Excerpt: {store.nytReview.summary}</p>
						<p>Review Link: <a href={store.nytReview.url} target="_blank" rel="noopener noreferrer">Click here</a></p>
					</div> : null}
				<div className="row mb-3 mt-3">
					<h4>Submit your review</h4>
					{sessionStorage.getItem("token") ?
						<div>
							<form onSubmit={(e) => e.preventDefault()}>
								{/* <div>{store.user.full_name}</div> */}
								<label>Book_id</label>
								<input
									className="form-control"
									id="book_id"
									aria-describedby="book_id"
									value={review.book_id || ""}
									onChange={(e) => setReview({ ...review, book_id: e.target.value })}
								/>
								<label>User_id</label>
								<input
									className="form-control"
									id="user_id"
									aria-describedby="user_id"
									value={review.user_id || ""}
									onChange={(e) => setReview({ ...review, user_id: e.target.value })}
								/>
								<label>Rating</label>
								<input
									className="form-control"
									id="rating"
									aria-describedby="rating"
									value={review.rating || ""}
									onChange={(e) => setReview({ ...review, rating: e.target.value })}
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
									setReview({ ...review, book_id: params.theisbn })
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


