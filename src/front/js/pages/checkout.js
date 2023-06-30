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
                <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{ height: "50px" }}>
                    <div className="progress-bar background-custom progress-bar-striped progress-bar-animated" style={{ width: '25%' }}><h4>Order Summary</h4></div>
                </div>
                {/* <div className="row mb-1 mt-4">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <h5 className="text-center background-custom p-2 text-white"> Book </h5>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <h5 className="text-center background-custom p-2 text-white"> Units </h5>
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2 ">
                        <h5 className="text-center background-custom p-2 text-white"> Price </h5>
                    </div>
                    <div className="col-sm-1 col-md-1 col-lg-1 ">

                    </div>
                </div> */}
                <div className="row d-flex justify-content-center mt-4">
                    {store.user.items && store.user.items.length > 0 ?

                        (<div className="row d-flex justify-content-center">
                            {store.user.items.sort((a, b) => a.id - b.id).map((items) => {
                                return <CheckoutCard key={items.id} item={items} />;

                            })}
                            <div className="row d-flex justify-content-end pe-0">
                                <div className="col-sm-6 col-md-6 col-lg-4 text-center d-flex justify-content-end pe-0">
                                    <h5 className="text-center px-4 py-2 m-0"> Total: {parseFloat(total().toFixed(2))}€ </h5>
                                    <Link to="/confirmDetails">
                                        <button className="btn custom-button text-center"><i className="fa-solid">Proceed &nbsp;</i><i className="fa-solid fa-arrow-right"></i></button>
                                    </Link>
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

