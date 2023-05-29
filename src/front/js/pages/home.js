import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Card } from "../component/card";
import { ExternalCard } from "../component/externalCard";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.books) // the books array is not being populated by the fetch perfomed by getBooks()

	useEffect(() => {
		actions.getNYTBooks();
		console.log(store.externalBooks)
	}, []);

	return (
		<div>

			<Navbar />
			<div className="text-center mt-5">

				<div>
					{store.books && store.books.length !== 0 ? store.books.map((book) => {
						return <Card key={book.id} item={book} />
					}) : null}
				</div>


				{store.externalBooks && store.externalBooks.length !== 0 ? store.externalBooks.filter((book) => book.title.toLowerCase().includes(store.search)).map((book) => {
					return <ExternalCard key={book.amazon_product_url
					} item={book} />
				}) : null}

			</div>
		</div>
	);
};
