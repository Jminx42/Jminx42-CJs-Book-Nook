import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/homeCard.css"

import "../../styles/home.css";

export const Review = ({ item }) => {
    const { store, actions } = useContext(Context);

    return (

        <div className="card mx-2 border-0" style={{ width: "18rem" }}>
            <div className="card-body" >
                <h5 className="card-text text-start">Rating: {item.rating}</h5>
                <p className="card-text text-start">Review: {item.review}</p>
                <p className="card-text text-start">ISBN: {item.isbn}</p>
            </div>
        </div>
    );
}

export default Review