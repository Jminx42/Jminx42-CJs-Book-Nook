import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Card } from "../component/card";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.books) // the books array is not being populated by the fetch perfomed by getBooks()



	return (
		<div>
			<Navbar />
			<div className="text-center mt-5">
				{store.books && store.books.length !== 0 ? store.books.map((book) => {
					return <Card key={book.id} item={book} />
				}) : null}


			</div>
		</div>
	);
};
