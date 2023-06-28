import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

import { HomeCard } from "../component/homeCard";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [genre, setGenre] = useState("");
	const [publisher, setPublisher] = useState("");
	const [year, setYear] = useState("");
	const [fictionChecked, setFictionChecked] = useState(false)
	const [crimeChecked, setCrimeChecked] = useState(false)
	const [healthChecked, setHealthChecked] = useState(false)
	const [biographyChecked, setBiographyChecked] = useState(false)
	const [historyChecked, setHistoryChecked] = useState(false)
	const [humorChecked, setHumorChecked] = useState(false)
	const [selfChecked, setSelfChecked] = useState(false)
	const [penguinChecked, setPenguinChecked] = useState(false)
	const [nationalChecked, setNationalChecked] = useState(false)
	const [simonChecked, setSimonChecked] = useState(false)


	useEffect(() => {
		actions.getBooks();
		actions.emptyBook();
		actions.clearAlert();
	}, []);

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
				<div className="row d-flex justify-content-center">
					{
						store.books && store.books.length !== 0
							?
							(<div className="row d-flex justify-content-center">
								<div className="col-sm-9 col-md-9 col-lg-9">
									<div className="row d-flex justify-content-center">
										{store.books
											.filter((book) =>
												(store.search && book.title.toLowerCase().includes(store.search) || book.author.toLowerCase().includes(store.search)) ||
												(!store.search && book)
											)
											.filter((book) => genre === "" || (book.genre && book.genre.includes(genre)))
											.filter((book) => publisher === "" || (book.publisher && book.publisher.includes(publisher)))
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
													<button className="btn filter-link d-flex justify-content-start" onClick={() => {
														setGenre("")
														setFictionChecked(false)
														setCrimeChecked(false)
														setHealthChecked(false)
														setBiographyChecked(false)
														setHistoryChecked(false)
														setHumorChecked(false)
														setSelfChecked(false)
													}}>Clear filters</button>
													{/* Add filters for genre below */}
													<div className="d-flex justify-content-start ms-4 mb-1">
														<label className="form-check-label me-2" htmlFor="flexCheckDefault">
															Fiction
														</label>
														<input
															className="form-check-input custom-checkbox"
															type="checkbox"
															value=""
															id="flexCheckDefault"
															onChange={() => {
																if (fictionChecked) {
																	setFictionChecked(false);
																	setGenre("");
																} else {
																	setFictionChecked(true);
																	setGenre("Fiction");
																}
															}}
															checked={fictionChecked}
														/>
													</div>
													<div className="d-flex justify-content-start ms-4 mb-1">
														<label className="form-check-label me-2" htmlFor="flexCheckDefault">
															True Crime
														</label>
														<input
															className="form-check-input custom-checkbox"
															type="checkbox"
															value=""
															id="flexCheckDefault"
															onChange={() => {
																if (crimeChecked) {
																	setCrimeChecked(false);
																	setGenre("");
																} else {
																	setCrimeChecked(true);
																	setGenre("True Crime");
																}
															}}
															checked={crimeChecked}
														/>
													</div>
													<div className="d-flex justify-content-start ms-4 mb-1">
														<label className="form-check-label me-2" htmlFor="flexCheckDefault">
															Health & Fitness
														</label>
														<input
															className="form-check-input custom-checkbox"
															type="checkbox"
															value=""
															id="flexCheckDefault"
															onChange={() => {
																if (healthChecked) {
																	setHealthChecked(false);
																	setGenre("");
																} else {
																	setHealthChecked(true);
																	setGenre("Health & Fitness");
																}
															}}
															checked={healthChecked}
														/>
													</div>
													<div className="d-flex justify-content-start ms-4 mb-1">
														<label className="form-check-label me-2" htmlFor="flexCheckDefault">
															Biography
														</label>
														<input
															className="form-check-input custom-checkbox"
															type="checkbox"
															value=""
															id="flexCheckDefault"
															onChange={() => {
																if (biographyChecked) {
																	setBiographyChecked(false);
																	setGenre("");
																} else {
																	setBiographyChecked(true);
																	setGenre("Biography & Autobiography");
																}
															}}
															checked={biographyChecked}
														/>
													</div>
													<div className="d-flex justify-content-start ms-4 mb-1">
														<label className="form-check-label me-2" htmlFor="flexCheckDefault">
															History
														</label>
														<input
															className="form-check-input custom-checkbox"
															type="checkbox"
															value=""
															id="flexCheckDefault"
															onChange={() => {
																if (historyChecked) {
																	setHistoryChecked(false);
																	setGenre("");
																} else {
																	setHistoryChecked(true);
																	setGenre("History");
																}
															}}
															checked={historyChecked}
														/>
													</div>
													<div className="d-flex justify-content-start ms-4 mb-1">
														<label className="form-check-label me-2" htmlFor="flexCheckDefault">
															Humor
														</label>
														<input
															className="form-check-input custom-checkbox"
															type="checkbox"
															value=""
															id="flexCheckDefault"
															onChange={() => {
																if (humorChecked) {
																	setHumorChecked(false);
																	setGenre("");
																} else {
																	setHumorChecked(true);
																	setGenre("Humor");
																}
															}}
															checked={humorChecked}
														/>
													</div>
													<div className="d-flex justify-content-start ms-4 mb-1">
														<label className="form-check-label me-2" htmlFor="flexCheckDefault">
															Self-Help
														</label>
														<input
															className="form-check-input custom-checkbox"
															type="checkbox"
															value=""
															id="flexCheckDefault"
															onChange={() => {
																if (selfChecked) {
																	setSelfChecked(false);
																	setGenre("");
																} else {
																	setSelfChecked(true);
																	setGenre("Self-Help");
																}
															}}
															checked={selfChecked}
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
													<button className="btn filter-link d-flex justify-content-start" onClick={() => {
														setPublisher("")
														setPenguinChecked(false)
														setNationalChecked(false)
														setSimonChecked(false)

													}}>Clear filters</button>
													{/* Add filters for genre below */}
													<div className="d-flex justify-content-start ms-4 mb-1">
														<label className="form-check-label me-2" htmlFor="flexCheckDefault">
															Penguin
														</label>
														<input
															className="form-check-input custom-checkbox"
															type="checkbox"
															value=""
															id="flexCheckDefault"
															onChange={() => {
																if (penguinChecked) {
																	setPenguinChecked(false);
																	setPublisher("");
																} else {
																	setPenguinChecked(true);
																	// setNationalChecked(false); should we uncheck one box if we select a different category?
																	setPublisher("Penguin");
																}
															}}
															checked={penguinChecked}
														/>
													</div>
													<div className="d-flex justify-content-start ms-4 mb-1">
														<label className="form-check-label me-2" htmlFor="flexCheckDefault">
															National Geo. Books
														</label>
														<input
															className="form-check-input custom-checkbox"
															type="checkbox"
															value=""
															id="flexCheckDefault"
															onChange={() => {
																if (nationalChecked) {
																	setNationalChecked(false);
																	setPublisher("");
																} else {
																	setNationalChecked(true);
																	setPublisher("National Geographic Books");
																}
															}}
															checked={nationalChecked}
														/>
													</div>
													<div className="d-flex justify-content-start ms-4 mb-1">
														<label className="form-check-label me-2" htmlFor="flexCheckDefault">
															Simon and Schuster
														</label>
														<input
															className="form-check-input custom-checkbox"
															type="checkbox"
															value=""
															id="flexCheckDefault"
															onChange={() => {
																if (simonChecked) {
																	setSimonChecked(false);
																	setPublisher("");
																} else {
																	setSimonChecked(true);
																	setPublisher("Simon and Schuster");
																}
															}}
															checked={simonChecked}
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


							</div>)
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