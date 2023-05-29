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
		actions.getOneBook(params.theid)


		const url = "https:\/\/storage.googleapis.com\/du-prd\/books\/images\/9780593441275.jpg";
		const cleanedUrl = url.replace(/\\/g, "");
		console.log(cleanedUrl);
	}, [])

	return (
		<div>
			<Navbar />
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


