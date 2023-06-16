import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"


import "../../styles/home.css";

export const Review = ({ item }) => {
    const { store, actions } = useContext(Context);
    // Add edit function to review!!!
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4 col-md-3 col-lg-3">
                    <Link to={`/book/${item.book_id.isbn}`}>
                        <img src={item.book_id.book_cover} className="card-img-top" alt="..." />
                    </Link>
                </div>
                <div className="col-sm-6 col-md-9 col-lg-9" >
                    <h4 className="text-start">{item.book_id.title}</h4>
                    <h5 className="text-start">by {item.book_id.author}</h5>
                    <p className="text-start mb-0">Posted on {item.created_at}</p>
                    <p className="text-start mb-0">Rating: {item.rating}</p>
                    <p className="text-start ">Review: {item.review}</p>

                </div>
            </div>
        </div>
    );
}

export default Review