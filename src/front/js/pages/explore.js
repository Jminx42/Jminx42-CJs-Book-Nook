import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { FilterBy } from "../component/filterBy";
import { HomeCard } from "../component/homeCard";

export const Explore = () => {
	const { store, actions } = useContext(Context);
	const [genre, setGenre] = useState([]);
	const [publisher, setPublisher] = useState([]);
	const [year, setYear] = useState("");


	useEffect(() => {
		actions.getBooks();
		actions.emptyBook();

		setTimeout(() => {
			actions.clearAlert();
		}, 3000);

	}, []);

	const handleFilterChange = (selectedGenre, selectedPublisher, selectedYear) => {
		setGenre([...genre, selectedGenre]);
		setPublisher([...publisher, selectedPublisher]);
		setYear(selectedYear);
	};


	return (
		<div>
			<Navbar />
			{
				store.alert && store.alert !== ""
					?
					<div className="container">
						<div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
							<i className="bi bi-check-circle-fill me-2"></i>
							<div>
								{store.alert}
							</div>
							<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
						</div>
					</div>
					:
					null

			}
			<div className="container-fluid text-center mt-5">

				<div className="row">
					{store.books && store.books.length !== 0 ? (
						<>
							<FilterBy
								genre={genre}
								publisher={publisher}
								year={year}
								onFilterChange={handleFilterChange}
							/>

							<div className="row d-flex justify-content-center">
								{store.books
									.filter(
										(book) =>
											(store.search &&
												(book.title.toLowerCase().includes(store.search) ||
													book.author.toLowerCase().includes(store.search))) ||
											(!store.search && book)
									)
									.filter(
										(book) =>
											genre.length === 0 || (book.genre && genre.some((g) => book.genre.includes(g)))
									)
									.filter(
										(book) =>
											publisher.length === 0 ||
											(book.publisher && publisher.some((p) => book.publisher.includes(p)))
									)
									.filter((book) => year === "" || (book.year && book.year.includes(year)))
									.map((book) => <HomeCard key={book.id} item={book} />)}
							</div>
							<Footer />
						</>

					)
						:
						<div>
							<div className="spinner-border filter-link" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div>
								Loading books...
							</div>
						</div>
					}
				</div >
			</div >


		</div >
	);
};
