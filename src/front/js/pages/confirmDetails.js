import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { PaymentMethod } from "../component/paymentMethod";
import { CheckoutCard } from "../component/checkoutCard";
import "../../styles/index.css"

export const ConfirmDetails = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(store.user);
    const [editAddress, setEditAddress] = useState(false);
    const [editBilling, setEditBilling] = useState(false);

    const handleSave = async () => {
        setEditAddress(false);

        const response = await fetch(process.env.BACKEND_URL + 'api/user/update', {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            await actions.validate_user()
            alert("Profile successfully updated");
        } else {
            const data = await response.json()
            alert(data.error)
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{ height: "50px" }}>
                    <div className="progress-bar background-custom progress-bar-striped progress-bar-animated" style={{ width: '50%' }}><h4>Confirm Order Details</h4></div>
                </div>

                <div className="row mb-1 mt-4 d-flex">
                    <div className="col-sm-6 md-col-6 lg-col-6">
                        <h5 className="text-start">Confirm Shipping Address:</h5>
                        {!editAddress ? (
                            <p>{user.address}</p>
                        ) : (
                            <input
                                className="form-control"
                                id="address"
                                aria-describedby="address"
                                value={user.address}
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                            />
                        )}
                        {!editAddress ? (

                            <button className="btn btn-secondary custom-button" onClick={() => setEditAddress(true)}>
                                Edit
                            </button>

                        ) : (
                            <div className="d-flex">
                                <button className="btn btn-secondary me-2 custom-button" onClick={handleSave}>
                                    Save
                                </button>
                                <button className="btn btn-secondary " onClick={() => setEditAddress(false)}>
                                    Close
                                </button>
                            </div>

                        )}
                    </div>
                    <div className="col-sm-6 md-col-6 lg-col-6">
                        <h5 className="text-start">Confirm Billing Address:</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Is the billing address the same as the shipping address?
                            </label>
                        </div>
                        {!editBilling ? (
                            <p>{user.address}</p>
                        ) : (
                            <input
                                className="form-control"
                                id="address"
                                aria-describedby="address"
                                value={user.address}
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                            />
                        )}
                        {!editBilling ? (

                            <button className="btn btn-secondary custom-button" onClick={() => setEditBilling(true)}>
                                Edit
                            </button>

                        ) : (
                            <div className="d-flex">
                                <button className="btn btn-secondary me-2 custom-button" onClick={handleSave}>
                                    Save
                                </button>
                                <button className="btn btn-secondary " onClick={() => setEditBilling(false)}>
                                    Close
                                </button>
                            </div>

                        )}


                    </div>
                    <div className="row mb-1 mt-4 d-flex">
                        <h5 className="text-start">Select your payment method:</h5>
                        {store.user.payment_method && store.user.payment_method.map((payment_method) => {
                            return <PaymentMethod key={payment_method.id} item={payment_method} />
                        })}

                    </div>
                </div>
            </div>

        </div>

    );
};

