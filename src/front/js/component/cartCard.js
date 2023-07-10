import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const CartCard = ({ item, setShowModal }) => {
    const { store, actions } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [showBookDetails, setShowBookDetails] = useState(false);
    const [format, setFormat] = useState()

    useEffect(() => {
        actions.getOneBook(item.isbn);
        actions.getBookFormats()
        setTimeout(() => {
            setIsLoading(false);
            setShowBookDetails(true);
        }, 3000);
    }, []);

    useEffect(() => {
        actions.clearError();
        actions.clearAlert();
    }, []);

    if (isLoading || !showBookDetails) {
        // Display loading spinner and message
        return (
            <div className="modal fade show" tabIndex="-1" style={{ display: "block" }} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="card container border-0 mt-3">
                                <div className="p-4 text-center bg-body-tertiary rounded-3">
                                    <div className="spinner-border filter-link" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div>Loading book...</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div>



        );
    }
    return (
        <div className="modal fade show" tabIndex="-1" style={{ display: "block" }} aria-hidden="true">
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
            {
                store.errorMsg && store.errorMsg !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            <div>
                                {store.errorMsg}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="card container border-0 mt-3">
                            <div className="p-4 text-center bg-body-tertiary rounded-3">
                                <img src={store.book.book_cover == null || store.book.book_cover == "" ? store.book.book_cover_b : store.book.book_cover} className=" w-25 float-start" alt="..." />
                                <div>
                                    <h1 className=" display-3">{store.book.title}</h1>
                                    <p className="display-6">By {store.book.author}</p>
                                    <div className="row text-start">

                                        <div className="row">
                                            <div className="col-3 fw-bold">Publisher:</div>
                                            <div className="col-9">{store.book.publisher}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3 fw-bold">Published Date:</div>
                                            <div className="col-9">{store.book.year}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3 fw-bold">Genre:</div>
                                            <div className="col-9">{store.book.genre}</div>

                                        </div>
                                        <div className="row">
                                            <div className="col-3 fw-bold">Pages:</div>
                                            <div className="col-9">{store.book.pages == 0 ? "Not available" : store.book.pages}</div>
                                        </div>
                                        <div className="row">
                                            <div className="row">
                                                <div className="col-3 fw-bold">ISBN:</div>
                                                <div className="col-9">{store.book.isbn}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3 fw-bold">Rating: </div>
                                                <div className="col-9">{store.book.average_rating ? store.book.average_rating + " (out of " + store.book.ratings_count + " votes)" : "Not available"} </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3 fw-bold">Book Format:</div>
                                                <div className="col-7">
                                                    <select className="form-select" aria-label="Default select example" defaultValue="" onChange={(e) => setFormat(e.target.value)}>
                                                        <option value="" disabled>Select your format</option>
                                                        {store.bookFormats.map((format) => (
                                                            <option key={format.id} value={format.id}>{format.book_format} - {format.book_price}€ </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3 fw-bold">Description:</div>
                                            <div className="col-9">{store.book.description}</div>
                                        </div>

                                    </div>
                                </div >
                            </div >
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                        <button type="button" disabled={!format} className="btn custom-button"
                            onClick={() => {
                                actions.postCheckout(format)
                                setShowModal(false)
                                actions.createAlertMsg("Your cart was updated successfully");
                            }}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;