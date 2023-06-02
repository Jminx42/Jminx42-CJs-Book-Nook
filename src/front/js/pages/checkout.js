import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Card } from "../component/card";

export const Checkout = () => {
    const { store, actions } = useContext(Context);
    const checkout = JSON.parse(sessionStorage.getItem("checkout"));

    return (
        <div>
            <Navbar />
            <div className="container mt-4">

                <h1>Checkout</h1>
                <div className="row d-flex justify-content-center">
                    {checkout && checkout.length !== 0 ? checkout.filter((book) => book.title.toLowerCase().includes(store.search)).map((book) => {
                        return <Card key={book.isbn} item={book} />
                    }) : null}
                </div>



            </div>
        </div>
    );
}