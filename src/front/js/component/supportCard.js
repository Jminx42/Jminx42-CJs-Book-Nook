import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"


import "../../styles/home.css";
// Why does the prop need to be called "item"??
export const SupportCard = ({ item }) => {
    const { store, actions } = useContext(Context);



    return (

        <div className="card mx-2 border-0" style={{ width: "18rem" }}>
            <div className="card-body" >
                <h5 className="card-text text-start">Subject: {item.subject}</h5>
                <p className="card-text text-start">Message: {item.message}</p>
                {/* <p className="card-text text-start">Date Created: {ticket.timestamp}</p> We want to add the timestamp for which each ticket was created */}
            </div>
        </div>
    );
}

export default SupportCard