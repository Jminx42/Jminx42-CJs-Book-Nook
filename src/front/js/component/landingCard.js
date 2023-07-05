import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"


import "../../styles/home.css";

export const LandingCard = ({ item }) => {
    const { store, actions } = useContext(Context);

    const showStar = (item) => {
        if (item.average_rating >= 3.5) {
            return (
                <>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                </>
            );
        }
        if (item.average_rating >= 4.5) {
            return (
                <>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                </>
            );
        }
    };



    return (

        <div className="card d-flex flex-column m-2 p-0 border-0" style={{ width: "12rem" }}>

            <Link to={`/book/${item.isbn}`}>
                <img src={item.book_cover} className="card-img-top contain" alt="..." style={{ height: "300px" }} />
            </Link>
            <div className="card-body">
                <Link to={`/book/${item.isbn}`} className="link-like">
                    <div className="row d-flex flex-grow-1">
                        <h5 className="card-title text-center">{actions.capitalizeWords(item.title)}</h5>
                    </div>
                    <div className="row align-items-end">
                        <p className="card-text text-center">{item.author}</p>
                        <p className="card-text text-center">{showStar(item)}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default LandingCard