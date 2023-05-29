import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Book = () => {
	const params = useParams();
	const { store, actions } = useContext(Context);

	useEffect(() => {
		// actions.getOneBook(params.theid)
		actions.getOneGoogleBook(params.theisbn)
		console.log(params.theisbn)
		actions.getNYTReview(params.theisbn)

		const url = store.nytReview.url;
		const cleanedUrl = url.replace(/\\/g, "");
		console.log(cleanedUrl);
	}, [])

	return (

    	


		<div>
			<Navbar />
    <div className="container">
			{/* <div>
				<h1> {store.book.title}</h1>
				<p>Author: {store.book.author}</p>
				<p>ISBN: {store.book.isbn}</p>
				<img src={store.book.book_cover} />
				<p>Book Category: {store.book.book_category}</p>
				<p>Genre: {store.book.genre}</p>
				<p>Publication date: {store.book.year}</p>
				<p>Price: {store.book.price}</p>
			</div> */}
			<div>
				<h1> {store.oneGoogleBook.title}</h1>
				<p>Author: {store.oneGoogleBook.author}</p>
				<p>ISBN: {store.oneGoogleBook.primary_isbn13}</p>
				<p>book cover {store.oneGoogleBook.book_cover}</p>
				{/* <p>Book Category {store.oneGoogleBook.category}</p>
				<p>Genre {store.book.genre}</p>
				<p>Publication date {store.book.year}</p>
				<p>Price {store.book.price}</p> */}
				<p>Review link {cleanedUrl}</p>
			</div>

		</div> 
			<div className="card container mt-3">
				<div class="p-5 text-center bg-body-tertiary rounded-3">
					<img src={store.book.book_cover} className="img-thumbnail w-25 float-start" alt="..." />
					<div>
						<h1 class=" display-3">{store.book.title}</h1>
						<p className="display-6">{store.book.author}</p>
						<div className="row text-start">
							<p class="lead">
								<div className="row">
									<div className="col-4">Book Category:</div>
									<div className="col-5">{store.book.category}</div>
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

			</div >
		</div >

	);
};


