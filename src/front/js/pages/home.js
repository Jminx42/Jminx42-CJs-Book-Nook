import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

import { HomeCard } from "../component/homeCard";

export const Home = () => {
	const { store, actions } = useContext(Context);


	useEffect(() => {
		actions.getBooks();
		actions.emptyBook();

	}, []);

	return (
		<div>
			<Navbar />
			<div className="container text-center mt-5">
				<div className="row d-flex justify-content-center">
					{
						store.books && store.books.length !== 0
							?
							store.books.filter(
								(book) => book.title.toLowerCase().includes(store.search)).map((book) => {
									return <HomeCard key={book.id} item={book} />
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
			<Footer />
		</div>
	);
};