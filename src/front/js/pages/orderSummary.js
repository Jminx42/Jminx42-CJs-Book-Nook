import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
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
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

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
                    <div className="progress-bar background-custom progress-bar-striped progress-bar-animated" style={{ width: '75%' }}><h4>Confirm Your Order</h4></div>
                </div>
                <div className="row mb-1 mt-4">
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
                            <div className="row d-flex justify-content-end pe-0">
                                <div className="col-sm-3 col-md-3 col-lg-3 text-center d-flex justify-content-end pe-0">
                                    <h5 className="text-center px-4 py-2 m-0"> Total: calculate from total_price€ </h5>
                                    <Link to="/confirmDetails">
                                        <button className="btn custom-button text-center"><i className="fa-solid fa-arrow-right"></i></button>
                                    </Link>
                                </div>

                            </div>



                        </div>

                        ) : (
                            <div>Add a book to purchase!</div>
                        )}
                    <div className="row d-flex">
                        <div className="d-flex align-items-baseline m-1">
                            <h5 className="me-2">Shipping Address:</h5>
                            <p className="">{store.user.address}</p>
                        </div>
                        <div className="d-flex align-items-baseline m-1">
                            <h5 className="me-2">Billing Address:</h5>
                            <p className="">{store.user.billing_address}</p>
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="d-flex align-items-baseline m-1">
                            <h5 className="me-2">Payment Method:</h5>
                            {store.user.payment_method && store.user.payment_method.map((payment_method) => {
                                return <PaymentMethod key={payment_method.id} item={payment_method} />
                            })}
                        </div>
                    </div>


                    <div className="row d-flex justify-content-end pe-0">
                        <div className="col-sm-3 col-md-3 col-lg-3 text-center d-flex justify-content-start ps-0">
                            <Link to="/confirmDetails">
                                <button className="btn custom-button text-center"><i className="fa-solid fa-arrow-left">&nbsp; Go back</i></button>
                            </Link>
                        </div>
                        <div className="col-sm-3 col-md-3 col-lg-3 text-center d-flex justify-content-end pe-0">

                            <button className="btn custom-button text-center" onClick={() => navigate("https://buy.stripe.com/test_6oE00r6Fm5If0Qo4gg")}>
                                <i className="fa-solid">Proceed &nbsp;</i><i className="fa-solid fa-arrow-right"></i>
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div >



    );
};

