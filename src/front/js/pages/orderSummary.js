import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { EmptyPaymentMethod } from "../component/emptyPaymentMethod";
import { PaymentMethod } from "../component/paymentMethod";
import { CheckoutCard } from "../component/checkoutCard";
import "../../styles/index.css"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from "../component/stripe";
import "../../styles/stripe.css"

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
    const promise = loadStripe("pk_test_51NOm30LDriABBO71EslVAUR52crSoSLYDfGJgAF61S1HyL5sxQ63PGMxS2xffxW2x9ugJm1sPSuNfhNibLoODb6M00SiS5BrMT");
    const [clientSecret, setClientSecret] = useState("");


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const postTransaction = async () => {

        // console.log("###########################")
        // console.log(book_format_id)
        const opts = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "payment_method_id": store.user.payment_method[0].id, "items": store.user.items })
        };
        // console.log(getStore().book.id)


        try {
            const resp = await fetch(process.env.BACKEND_URL + 'api/createtransaction', opts);
            if (resp.status !== 200) {
                const data = await resp.json();
                const errorMessage = data.error || "Something went wrong";
                setError(errorMessage);
                return false;
            } else {
                await actions.validate_user();
                setAlert("Your cart was updated successfully");
                return true;
            }
        } catch (error) {
            console.error(`Error during fetch: ${process.env.BACKEND_URL}api/createtransaction`, error);
        }
    };

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
                <div className="row d-flex justify-content-center">
                    {store.user.items && store.user.items.length > 0 ?

                        (<div className="row d-flex justify-content-center">
                            {store.user.items.sort((a, b) => a.id - b.id).map((items) => {
                                return <CheckoutCard key={items.id} item={items} />;

                            })}
                            <div className="row d-flex justify-content-end pe-0">
                                <div className="col-sm-3 col-md-3 col-lg-3 text-center d-flex justify-content-end pe-0">
                                    <h5 className="text-center px-4 py-2 m-0"> Total: {parseFloat(total().toFixed(2))}€ </h5>
                                    <Link to="/confirmDetails">
                                        <button className="btn custom-button text-center"><i className="fa-solid fa-arrow-right"></i></button>
                                    </Link>
                                </div>

                            </div>



                        </div>

                        ) : (
                            <div>Add a book to purchase!</div>
                        )}
                    <div className="row d-flex mb-3">
                        <div className="d-flex align-items-baseline m-1">
                            <h5 className="me-2">Shipping Address:</h5>
                            <p className="">{store.user.address}</p>
                        </div>
                        <div className="d-flex align-items-baseline m-1">
                            <h5 className="me-2">Billing Address:</h5>
                            <p className="">{store.user.billing_address}</p>
                        </div>
                    </div>
                    <Elements stripe={promise}>
                        <Stripe />
                    </Elements>
                    <div className="row d-flex justify-content-end pe-0 mt-3">

                        <div className="col-sm-3 col-md-3 col-lg-3 text-center d-flex justify-content-end pe-0">


                            <Link to="/confirmDetails">
                                <button className="btn custom-button text-center"><i className="fa-solid fa-arrow-left">&nbsp; Go back</i></button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div >



    );
};

