import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { CheckoutCard } from "../component/checkoutCard";
import "../../styles/index.css"

export const Checkout = () => {
    const { store, actions } = useContext(Context);
    const checkout = JSON.parse(sessionStorage.getItem("checkout"));
    // we need to add a new card to show on the checkout... maybe it should be the same as the favorites??

    const total = () => {
        let totalCheckout = 0;
        for (let x = 0; x < store.user.items.length; x++) {
            totalCheckout += store.user.items[x].book_format_id.book_price * store.user.items[x].unit
        }
        return totalCheckout
    }
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1>Checkout</h1>
                <div className="row mb-1">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <h5 className="text-center background-custom p-2 text-white"> Book </h5>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <h5 className="text-center background-custom p-2 text-white"> Units </h5>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3 ">
                        <h5 className="text-center background-custom p-2 text-white"> Price </h5>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    {store.user.items && store.user.items.length > 0 ?

                        (<div className="row d-flex justify-content-center">
                            {store.user.items.sort((a, b) => a.id - b.id).map((items) => {
                                return <CheckoutCard key={items.id} item={items} />;

                            })}
                            <div className="row d-flex justify-content-end">
                                <div className="col-sm-3 col-md-3 col-lg-3 text-center">
                                    <h5 className="text-center background-custom p-2 text-white"> Total: {total()}€ </h5>

                                </div>
                            </div>
                        </div>

                        ) : (
                            <div>Add a book to purchase!</div>
                        )}


                </div>
            </div>
        </div>
    );
};

