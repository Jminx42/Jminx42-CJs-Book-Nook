import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/externalCard.css"

import "../../styles/home.css";

export const Card = ({ item }) => {
    const { store, actions } = useContext(Context);

    return (

        <div className="card mx-2" style={{ width: "18rem" }}>
            <img src={item.cover} className="card-img-top" alt="..." />
            <div className="card-body" >

                <h5 className="card-text text-start">Title: {item.title}</h5>
                <p className="card-text text-start">Author: {item.author}</p>


                <div className="card-footer">
                    <Link to={`/book/${item.isbn}`}>
                        <button className="btn btn-secondary card-custom-button me-2">Read More</button>
                    </Link>
                </div>

            </div>
        </div>
    )
        ;
}

export default Card