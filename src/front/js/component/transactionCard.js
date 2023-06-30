import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"


import "../../styles/home.css";
// Why does the prop need to be called "item"?? It doesn't! You just need to use whatever prop you define when you call the component
export const TransactionCard = ({ item }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getTransaction()
    }, []);

    return (

        <div className="card">
            <div className="card-body" >
                Purchase history showing
                {/* <h5 className="">Ticket {item.ticket_id}</h5>
                <p className="card-text text-start">Date Created: {item.id}</p>
                <p className="card-text text-start">Subject: {item.subject}</p>
                <p className="card-text text-start">Message: {item.message}</p> */}

            </div>
        </div>
    );
}

