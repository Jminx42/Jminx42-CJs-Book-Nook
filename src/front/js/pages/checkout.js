import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Card } from "../component/card";

export const Checkout = () => {
    const { store, actions } = useContext(Context);
    const checkout = JSON.parse(sessionStorage.getItem("checkout"));
    // we need to add a new card to show on the checkout... maybe it should be the same as the favorites??
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1>Checkout</h1>
                <div className="row d-flex justify-content-center">
                    {store.user.items && store.user.items.length > 0 ? (
                        store.user.items.map((book) => {
                            return <Card key={book.id} item={book.book_id} />;
                        })
                    ) : (
                        <div>Add a book to purchase!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

