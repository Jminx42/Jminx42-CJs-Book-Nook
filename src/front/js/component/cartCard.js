import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"


import "../../styles/home.css";

export const CartCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    // const book = actions.getOneBook(item.isbn)

    useEffect(() => {
        actions.getOneBook(item.isbn);

    }, []);

    return (

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content ">
                    <div className="modal-body">
                        <div className="card container mt-3">
                            <div className="p-4 text-center bg-body-tertiary rounded-3">
                                <img src={store.book.book_cover == null || store.book.book_cover == "" ? store.book.book_cover_b : store.book.book_cover} className=" w-25 float-start" alt="..." />
                                <div>
                                    <h1 className=" display-3">{store.book.title}</h1>
                                    <p className="display-6">By {store.book.author}</p>
                                    <div className="row text-start">

                                        <div className="row">
                                            <div className="col-3">Publisher:</div>
                                            <div className="col-9">{store.book.publisher}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3">Published Date:</div>
                                            <div className="col-9">{store.book.year}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3">Genre:</div>
                                            <div className="col-9">{store.book.genre}</div>

                                        </div>
                                        <div className="row">
                                            <div className="col-3">Pages:</div>
                                            <div className="col-9">{store.book.pages == 0 ? "Not available" : store.book.pages}</div>
                                        </div>
                                        <div className="row">
                                            <div className="row">
                                                <div className="col-3">ISBN:</div>
                                                <div className="col-9">{store.book.isbn}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">Rating: </div>
                                                <div className="col-9">{store.book.average_rating ? store.book.average_rating + " (out of " + store.book.ratings_count + " votes)" : "Not available"} </div>
                                            </div>
                                            <div className="col-3">Price:</div>
                                            <div className="col-9">

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3">Description:</div>
                                            <div className="col-9">{store.book.description}</div>
                                        </div>

                                    </div>
                                </div >
                            </div >
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CartCard