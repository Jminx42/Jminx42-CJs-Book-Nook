import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { HomeCard } from "../component/homeCard";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [genre, setGenre] = useState([]);
	const [publisher, setPublisher] = useState([]);
	const [year, setYear] = useState("");
	const [checkboxValues, setCheckboxValues] = useState({
		fiction: false,
		crime: false,
		health: false,
		biography: false,
		history: false,
		humor: false,
		self: false,
		penguin: false,
		national: false,
		simon: false,
		washington: false,
		bloom: false,
		harper: false,
		ballantine: false,
		martin: false,
		bay: false
	});

	useEffect(() => {
		actions.getBooks();
		actions.emptyBook();

		setTimeout(() => {
			actions.clearAlert();
		}, 3000);
	}, []);

	const handleCheckboxChange = (name) => {
		setCheckboxValues((prevState) => ({
			...prevState,
			[name]: !prevState[name]
		}));
	};

	const handleClearFilters = () => {
		setGenre([]);
		setPublisher([]);
		setCheckboxValues((prevState) => ({
			...prevState,
			fiction: false,
			crime: false,
			health: false,
			biography: false,
			history: false,
			humor: false,
			self: false,
			penguin: false,
			national: false,
			simon: false,
			washington: false,
			bloom: false,
			harper: false,
			ballantine: false,
			martin: false,
			bay: false
		}));
	};

	return (
		<div>
			<Navbar />
			{store.alert && store.alert !== "" ? (
				<div className="container">
					<div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
						<i className="bi bi-check-circle-fill me-2"></i>
						<div>{store.alert}</div>
						<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
					</div>
				</div>
			) : null}

			<div className="container text-center mt-5">
				<div className="row">
					<div className="col-lg-3 col-md-4 col-sm-6">
						{store.books && store.books.length !== 0 ? (
							<div>
								<div className="d-flex justify-content-center align-items-baseline">
									<h4>Filter by</h4>
									<button className="btn custom-button d-flex justify-content-start ms-3" onClick={handleClearFilters}>
										Clear filters
									</button>
								</div>
								<div className="accordion accordion-flush" id="accordionFlushExample">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#flush-collapseOne"
												aria-expanded="false"
												aria-controls="flush-collapseOne"
											>
												Genre
											</button>
										</h2>
										<div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
											<div className="accordion-body">
												{/* Render genre checkboxes */}
												{Object.entries(checkboxValues)
													.filter(([key]) => !["penguin", "national", "simon", "washington", "bloom", "harper", "ballantine", "martin", "bay"].includes(key))
													.map(([key, value]) => (
														<div className="d-flex justify-content-start ms-4 mb-1" key={key}>
															<label className="form-check-label me-2" htmlFor={`genre-${key}`}>
																{key.charAt(0).toUpperCase() + key.slice(1)}
															</label>
															<input
																className="form-check-input custom-checkbox"
																type="checkbox"
																id={`genre-${key}`}
																checked={value}
																onChange={() => handleCheckboxChange(key)}
															/>
														</div>
													))}
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#flush-collapseTwo"
												aria-expanded="false"
												aria-controls="flush-collapseTwo"
											>
												Publisher
											</button>
										</h2>
										<div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
											<div className="accordion-body">
												{/* Render publisher checkboxes */}
												{Object.entries(checkboxValues)
													.filter(([key]) => !["fiction", "crime", "health", "biography", "history", "humor", "self"].includes(key))
													.map(([key, value]) => (
														<div className="d-flex justify-content-start ms-4 mb-1" key={key}>
															<label className="form-check-label me-2" htmlFor={`publisher-${key}`}>
																{key.charAt(0).toUpperCase() + key.slice(1)}
															</label>
															<input
																className="form-check-input custom-checkbox"
																type="checkbox"
																id={`publisher-${key}`}
																checked={value}
																onChange={() => handleCheckboxChange(key)}
															/>
														</div>
													))}
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#flush-collapseThree"
												aria-expanded="false"
												aria-controls="flush-collapseThree"
											>
												Year
											</button>
										</h2>
										<div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
											<div className="accordion-body">
												<input
													type="text"
													className="form-control"
													placeholder="Enter year"
													value={year}
													onChange={(e) => setYear(e.target.value)}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="d-flex justify-content-center">
								<div className="spinner-border" role="status">
									<span className="visually-hidden">Loading...</span>
								</div>
								<div>Loading books...</div>
							</div>

						)}
					</div>
					<div className="col-lg-9 col-md-8 col-sm-6">

						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5">


							{store.books
								.filter(
									(book) =>
										(store.search &&
											(book.title.toLowerCase().includes(store.search) || book.author.toLowerCase().includes(store.search))) ||
										(!store.search && book)
								)
								.filter((book) => genre.length === 0 || (book.genre && genre.some((g) => book.genre.includes(g))))
								.filter((book) => publisher.length === 0 || (book.publisher && publisher.some((p) => book.publisher.includes(p))))
								.filter((book) => year === "" || (book.year && book.year.includes(year)))
								.map((book) => (
									// <div className="col">
									<HomeCard key={book.id} item={book} />
									// </div>
								))}


						</div>

					</div>
				</div>
			</div>
			<Footer />
		</div>

	);
};

export default Home;

