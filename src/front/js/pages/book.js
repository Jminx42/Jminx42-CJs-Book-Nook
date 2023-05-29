import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Book = () => {
	const params = useParams();
	const { store, actions } = useContext(Context);
	// const url = store.nytReview.url;
	// const cleanedUrl = url.replace(/\\/g, "");
	// console.log(cleanedUrl);

	useEffect(() => {
		actions.getOneGoogleBook(params.theisbn)
		actions.getNYTReview(params.theisbn)

	}, [])

	return (




		<div>
			<Navbar />
			<div className="container">
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

			</div>
			{/* <div className="card container mt-3">
				<div className="p-5 text-center bg-body-tertiary rounded-3">
					<img src={store.book.book_cover} className="img-thumbnail w-25 float-start" alt="..." />
					<div>
						<h1 className=" display-3">{store.book.title}</h1>
						<p className="display-6">{store.book.author}</p>
						<div className="row text-start">
							{/* <p className="lead"> 
							<div className="row">
								<div className="col-4">Book Category:</div>
								<div className="col-5">{store.book.book_category}</div>
							</div>
							<div className="row">
								<div className="col-4">Genre:</div>
								<div className="col-5">{store.book.genre}</div>
							</div>
							<div className="row">
								<div className="col-4">Publication Date:</div>
								<div className="col-5">{store.book.year}</div>
							</div>
							<div className="row">
								<div className="col-4">Price:</div>
								<div className="col-5">{store.book.price}</div>
							</div>
							<div className="row">
								<div className="col-4">ISBN:</div>
								<div className="col-5">{store.book.isbn}</div>
							</div>
							 </p> 
						</div>

					</div>

				</div >

			</div > */}
		</div >

	);
};


