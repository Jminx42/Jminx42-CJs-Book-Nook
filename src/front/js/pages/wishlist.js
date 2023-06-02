import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Card } from "../component/card";

export const Wishlist = () => {
    const { store, actions } = useContext(Context);
    const wishlist = JSON.parse(sessionStorage.getItem("wishlist"));

    return (
        <div>
            <Navbar />
            <div className="container mt-4">

                <h1>Welcome to your wishlist</h1>
                <div className="row d-flex justify-content-center">
                    {wishlist && wishlist.length !== 0 ? wishlist.filter((book) => book.title.toLowerCase().includes(store.search)).map((book) => {
                        return <Card key={book.isbn} item={book} />
                    }) : null}
                </div>



            </div>
        </div>
    );
}