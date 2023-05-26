import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Book = () => {
	const params = useParams();
	const { store, actions } = useContext(Context);




	useEffect(() => {
		actions.getOneBook(params.theid)


		const url = "https:\/\/storage.googleapis.com\/du-prd\/books\/images\/9780593441275.jpg";
		const cleanedUrl = url.replace(/\\/g, "");
		console.log(cleanedUrl);
	}, [])

	return (
		<div className="container">
			<h1> {store.book.title}</h1>
			<p>Author {store.book.author}</p>
			<p>ISBN {store.book.isbn}</p>
			<p>book cover {store.book.title}</p>
			<p>Book Category {store.book.category}</p>
			<p>Genre {store.book.genre}</p>
			<p>Publication date {store.book.year}</p>
			<p>Price {store.book.price}</p>

		</div>
	);
};


