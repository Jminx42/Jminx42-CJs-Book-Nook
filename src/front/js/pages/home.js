import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";

import { ExternalCard } from "../component/externalCard";

export const Home = () => {
	const { store, actions } = useContext(Context);


	useEffect(() => {
		actions.getNYTBooks();

	}, []);

	return (
		<div>
			<Navbar />
			{/* <div className="row d-flex g-2">

					{store.books && store.books.length !== 0 ? store.books.map((book) => {
						return <Card key={book.id} item={book} />
					}) : null}

				</div> */}
			<div className="container text-center mt-5">
				<div className="row d-flex justify-content-center">
					{
						store.externalBooks && store.externalBooks.length !== 0
							?
							store.externalBooks.filter(
								(book) => book.title.toLowerCase().includes(store.search)).map((book) => {
									return <ExternalCard key={book.primary_isbn13} item={book} />
								})
							:
							<div>
								<div className="spinner-border" role="status">
									<span className="visually-hidden">Loading...</span>
								</div>
								<div>
									Loading books...
								</div>
							</div>
					}
				</div>
			</div>
		</div>
	);
};
