import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { EmptyPaymentMethod } from "../component/emptyPaymentMethod";
import { PaymentMethod } from "../component/paymentMethod";
import { CheckoutCard } from "../component/checkoutCard";
import "../../styles/index.css"

export const OrderSummary = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(store.user);
    const [editAddress, setEditAddress] = useState(false);
    const [editBilling, setEditBilling] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [alert, setAlert] = useState("");
    const [error, setError] = useState("");
    const [checked, setChecked] = useState(false)

    const handleSave = async () => {
        setEditAddress(false);
        setEditBilling(false);

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
            setAlert("Profile successfully updated");
        } else {
            const data = await response.json()
            setError(data.error)
        }
    };

    const handleBillingAddressChange = () => {
        setChecked(!checked);
        setUser({ ...user, billing_address: checked ? "" : user.address });
    };

    useEffect(() => {
        actions.validate_user();
    }, []);

    return (
        <div>
            <Navbar />
            {
                alert && alert !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            <div>
                                {alert}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            {
                error && error !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            <div>
                                {error}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            <div className="container mt-4">
                <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{ height: "50px" }}>
                    <div className="progress-bar background-custom progress-bar-striped progress-bar-animated" style={{ width: '75%' }}><h4>Order Summary</h4></div>
                </div>

                <div className="row mb-1 mt-4 d-flex">
                    <div className="col-sm-6 md-col-6 lg-col-6">
                        <h5 className="text-start">Confirm Shipping Address:</h5>
                        {!editAddress ? (
                            <p>{store.user.address}</p>
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
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checked} onChange={handleBillingAddressChange} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Is the billing address the same as the shipping address?
                            </label>
                        </div>
                        {checked ? (
                            <p>{store.user.address}</p>
                        ) : !editBilling ? (
                            <p>{store.user.billing_address}</p>
                        ) : (
                            <input
                                className="form-control"
                                id="billing_address"
                                aria-describedby="billing_address"
                                value={user.billing_address}
                                onChange={(e) => setUser({ ...user, billing_address: e.target.value })}
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
                        <button className="btn custom-button" onClick={() =>
                            setShowForm(true)}>Add Payment Method</button>
                        {showForm ? <EmptyPaymentMethod closeForm={() => setShowForm(false)} /> : null}
                        {store.user.payment_method && store.user.payment_method.map((payment_method) => {
                            return <PaymentMethod key={payment_method.id} item={payment_method} />
                        })}

                    </div>
                    <div className="row d-flex justify-content-end pe-0">
                        <div className="col-sm-3 col-md-3 col-lg-3 text-center d-flex justify-content-start ps-0">
                            <Link to="/confirmDetails">
                                <button className="btn custom-button text-center"><i class="fa-solid fa-arrow-left"></i></button>
                            </Link>
                        </div>
                        <div className="col-sm-3 col-md-3 col-lg-3 text-center d-flex justify-content-end pe-0">
                            <Link to="/confirmDetails">
                                <button className="btn custom-button text-center"><i className="fa-solid fa-arrow-right"></i></button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    );
};

