import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"


import "../../styles/home.css";

export const Card = ({ item }) => {
    const { store, actions } = useContext(Context);



    return (

        <div className="card mx-2 border-0" style={{ width: "18rem" }}>

            <Link to={`/book/${item.isbn}`}>
                <img src={item.book_cover} className="card-img-top" alt="..." />
            </Link>

            <div className="card-body" >
                <h5 className="card-text text-start">Title: {item.title}</h5>
                <p className="card-text text-start">Author: {item.author}</p>
                <p className="card-text text-start">Average rating: {item.average_rating}</p>
            </div>
        </div>
    );
}

export default Card