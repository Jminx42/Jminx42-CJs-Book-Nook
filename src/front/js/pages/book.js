import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
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

	);
};


