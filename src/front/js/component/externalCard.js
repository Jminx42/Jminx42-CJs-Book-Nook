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


    // useEffect (() => {

    // }, [])



    return (

        <div className="card mx-2 mb-2 p-0" style={{ width: "18rem" }}>
            <Link to={`/book/${item.primary_isbn13}`}>
                <div className="image-container" style={{ height: "320px", overflow: "hidden" }}>
                    <img src={item.book_image} className="card-img-top w-100 h-100" alt="Book Cover" />
                </div>
                <div className="card-body text-start">
                    <div className="row">
                        <h5 className="card-title">{item.title}</h5>
                    </div>

                    <div className="row">
                        <p className="card-text">{item.author}</p>
                    </div>

                    <div className="row">
                        <p className="card-text">Price: {item.price}</p>
                    </div>


                    {/* <div className="d-flex justify-content-evenly"> */}
                    {/* Add your favorite/heart icon here */}
                    {/* <button className="btn btn-white" >*/}
                    {/* <FontAwesomeIcon icon={heartIcon} /> */}
                    {/*</button> */}

                    {/* </div> */}
                </div>
                <div className="card-footer">


                    <Link to={`/wishlist`}>
                        <button
                            type="button"
                            className="btn text-white card-custom-button"
                            onClick={() => actions.setWishlist(item.primary_isbn13)}
                        >
                            {store.wishlist.includes(item.primary_isbn13) ? (
                                <i className="fa-solid fa-heart"></i>
                            ) : (
                                <i className="fa-regular fa-heart"></i>
                            )}
                        </button>
                    </Link>
                </div>
            </Link >
        </div>

    )
        ;
}

export default ExternalCard