import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/externalCard.css"

// import { library, config } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

// Add the required icons to the library
// library.add(regularHeart, solidHeart);

import "../../styles/home.css";

export const ExternalCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    const wishlist = JSON.parse(sessionStorage.getItem("wishlist"));


    // useEffect(() => {

    // }, [])



    return (

        <div className="card m-2 p-0" style={{ width: "18rem" }}>
            <Link to={`/book/${item.primary_isbn13}`} className="card-body-custom">
                <div className="image-container" style={{ height: "320px", overflow: "hidden" }}>
                    <img src={item.book_image} className="card-img-top w-100 h-100" alt="Book Cover" />
                </div>
                <div className="card-body text-start ">
                    <div className="container">
                        <div className="row">
                            <h5 className="card-title">
                                {item.title}
                            </h5>
                        </div>

                        <div className="row">
                            <p className="card-text">{item.author}</p>
                        </div>
                        <div className="row">
                            <p className="card-text"><span className="fw-bold">Price: </span>{item.price}</p>
                        </div>
                    </div>
                </div>
            </Link >
            <div className="card-footer">
                <div className="">

                    <button
                        type="button"
                        className="btn me-2 text-white card-custom-button"
                        onClick={() => actions.setWishlist(item.primary_isbn13, item.book_image, item.title, item.author)}
                    >
                        {store.wishlist.some(
                            (wishlistItem) =>
                                wishlistItem.primary_isbn13 === item.primary_isbn13
                        ) ? (
                            <i className="fas fa-heart"></i>
                        ) : (
                            <i className="far fa-heart"></i>
                        )}
                    </button>

                    <button type="button" className="btn text-white card-custom-button"
                        onClick={() => actions.setCheckout(item.primary_isbn13, item.book_image, item.title, item.author, item.price)}>
                        {store.checkout.some(
                            (checkoutItem) =>
                                checkoutItem.primary_isbn13 === item.primary_isbn13
                        ) ? (
                            <i className="bi bi-cart-fill"></i>
                        ) : (
                            <i className="bi bi-cart"></i>
                        )}

                    </button>
                </div>
            </div>
        </div>

    )
        ;
}

