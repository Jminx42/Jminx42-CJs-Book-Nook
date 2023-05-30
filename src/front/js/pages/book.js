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
					<img src={store.oneGoogleBook.imageLinks && store.oneGoogleBook.imageLinks.thumbnail} className="img-thumbnail w-25 float-start" alt="..." />
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

						</div>

					</div>
					<p>Preview: {store.oneGoogleBook.previewLink}</p>

				</div >
				{store.nytReview ?
					<div>
						<h4>Reviews</h4>
						<p>{store.nytReview.byline}</p>
						<p>Reviewed in: {store.nytReview.publication_dt}</p>
						<p>Excerpt: {store.nytReview.summary}</p>
						<p>Review Link: <a href={store.nytReview.url} target="_blank" rel="noopener noreferrer">Click here</a></p>
					</div> : null}
			</div >
		</div >

	);
};


