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
	const [fictionChecked, setFictionChecked] = useState(false);
	const [crimeChecked, setCrimeChecked] = useState(false);
	const [healthChecked, setHealthChecked] = useState(false);
	const [biographyChecked, setBiographyChecked] = useState(false);
	const [historyChecked, setHistoryChecked] = useState(false);
	const [humorChecked, setHumorChecked] = useState(false);
	const [selfChecked, setSelfChecked] = useState(false);
	const [penguinChecked, setPenguinChecked] = useState(false);
	const [nationalChecked, setNationalChecked] = useState(false);
	const [simonChecked, setSimonChecked] = useState(false);

	useEffect(() => {
		actions.getBooks();
		actions.emptyBook();
		actions.clearAlert();
	}, []);

	const handleGenreCheckboxChange = (value) => {
		if (genre.includes(value)) {
			setGenre(genre.filter((item) => item !== value));
		} else {
			setGenre([...genre, value]);
		}
	};

	const handlePublisherCheckboxChange = (value) => {
		if (publisher.includes(value)) {
			setPublisher(publisher.filter((item) => item !== value));
		} else {
			setPublisher([...publisher, value]);
		}
	};

	const handleClearGenreFilters = () => {
		setGenre([]);
		setFictionChecked(false);
		setCrimeChecked(false);
		setHealthChecked(false);
		setBiographyChecked(false);
		setHistoryChecked(false);
		setHumorChecked(false);
		setSelfChecked(false);
	};

	const handleClearPublisherFilters = () => {
		setPublisher([]);
		setPenguinChecked(false);
		setNationalChecked(false);
		setSimonChecked(false);
	};

	return (
		<div>
			<Navbar />
			<div className="container-fluid text-center mt-5">
				<div className="row d-flex justify-content-center">
					{store.books && store.books.length !== 0 ? (
						<div className="row d-flex justify-content-center">
							<div className="col-sm-9 col-md-9 col-lg-9">
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
							</div>

							<div className="col-sm-3 col-md-3 col-lg-3">
								<h4>Filter by</h4>
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
											<div className="accordion-body ">
												<button className="btn filter-link d-flex justify-content-start" onClick={() => handleClearGenreFilters()}>Clear filters</button>
												{/* Add filters for genre below */}
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Fiction
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="fiction"
														checked={fictionChecked}
														onChange={() => {
															setFictionChecked(!fictionChecked);
															handleGenreCheckboxChange("Fiction");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														True Crime
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="crime"
														checked={crimeChecked}
														onChange={() => {
															setCrimeChecked(!crimeChecked);
															handleGenreCheckboxChange("True Crime");
														}}
													/>

												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Health & Fitness
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="health"
														checked={healthChecked}
														onChange={() => {
															setHealthChecked(!healthChecked);
															handleGenreCheckboxChange("Health & Fitness");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Biography
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="biography"
														checked={biographyChecked}
														onChange={() => {
															setBiographyChecked(!biographyChecked);
															handleGenreCheckboxChange("Biography & Autobiography");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														History
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="history"
														checked={historyChecked}
														onChange={() => {
															setHistoryChecked(!historyChecked);
															handleGenreCheckboxChange("History");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Humor
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="humor"
														checked={humorChecked}
														onChange={() => {
															setHumorChecked(!humorChecked);
															handleGenreCheckboxChange("Humor");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Self-Help
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="self"
														checked={selfChecked}
														onChange={() => {
															setSelfChecked(!selfChecked);
															handleGenreCheckboxChange("Self-Help");
														}}
													/>
												</div>
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
												<button className="btn filter-link d-flex justify-content-start" onClick={() => handleClearPublisherFilters()}>Clear filters</button>
												{/* Add filters for publisher below */}
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Penguin
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="penguin"
														checked={penguinChecked}
														onChange={() => {
															setPenguinChecked(!penguinChecked);
															handlePublisherCheckboxChange("Penguin");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														National Geo. Books
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="national"
														checked={nationalChecked}
														onChange={() => {
															setNationalChecked(!nationalChecked);
															handlePublisherCheckboxChange("National Geographic Books");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Simon and Schuster
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="simon"
														checked={simonChecked}
														onChange={() => {
															setSimonChecked(!simonChecked);
															handlePublisherCheckboxChange("Simon and Schuster");
														}}
													/>
												</div>

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
												<button className="btn link-like" onClick={() => setYear("")}>All Years</button>
												<button className="btn link-like" onClick={() => setYear("2023")}>2023</button>
												<button className="btn link-like" onClick={() => setYear("2022")}>2022</button>
												{/* Add more year options */}
											</div>
										</div>
									</div>
								</div>

							</div>
							{/* Another possibility of showing the filters
							<div className="col-sm-3 col-md-3 col-lg-3">
								<div className="card">
									<div className="card-body">
										<h5 className="card-title">Filter</h5>
										<hr />
										<h6>Genre</h6>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="fiction"
												checked={fictionChecked}
												onChange={() => {
													setFictionChecked(!fictionChecked);
													handleGenreCheckboxChange("Fiction");
												}}
											/>
											<label className="form-check-label" htmlFor="fiction">
												Fiction
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="crime"
												checked={crimeChecked}
												onChange={() => {
													setCrimeChecked(!crimeChecked);
													handleGenreCheckboxChange("Crime");
												}}
											/>
											<label className="form-check-label" htmlFor="crime">
												Crime
											</label>
										</div>
										{/* Add more genre checkboxes as needed */}
							<button className="btn btn-sm btn-secondary" onClick={handleClearGenreFilters}>
								Clear Genre Filters
							</button>
							<hr />
							<h6>Publisher</h6>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="penguin"
									checked={penguinChecked}
									onChange={() => {
										setPenguinChecked(!penguinChecked);
										handlePublisherCheckboxChange("Penguin");
									}}
								/>
								<label className="form-check-label" htmlFor="penguin">
									Penguin
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="national"
									checked={nationalChecked}
									onChange={() => {
										setNationalChecked(!nationalChecked);
										handlePublisherCheckboxChange("National");
									}}
								/>
								<label className="form-check-label" htmlFor="national">
									National
								</label>
							</div>
							{/* Add more publisher checkboxes as needed */}
							<button className="btn btn-sm btn-secondary" onClick={handleClearPublisherFilters}>
								Clear Publisher Filters
							</button>
							<hr />
							<h6>Year</h6>
							<div className="form-group">
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
			</div> */}

		</div>
	)
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
				</div >
			</div >

	<Footer />
		</div >
	);
};
