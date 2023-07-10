import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { CheckoutCard } from "../component/checkoutCard";
import { MobileCheckoutCard } from "../component/mobileCheckoutCard";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from "../component/stripe";

export const Checkout = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(store.user);
    const [editAddress, setEditAddress] = useState(false);
    const [editBilling, setEditBilling] = useState(false);
    const [checked, setChecked] = useState(false);
    const promise = loadStripe("pk_test_51NOm30LDriABBO71EslVAUR52crSoSLYDfGJgAF61S1HyL5sxQ63PGMxS2xffxW2x9ugJm1sPSuNfhNibLoODb6M00SiS5BrMT");
    const [alert, setAlert] = useState("");
    const [error, setError] = useState("");
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const promise = loadStripe("pk_test_51NOm30LDriABBO71EslVAUR52crSoSLYDfGJgAF61S1HyL5sxQ63PGMxS2xffxW2x9ugJm1sPSuNfhNibLoODb6M00SiS5BrMT");

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = window.innerWidth <= 582;

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

        setActiveTab(params)
    }, []);




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
        if (sessionStorage.getItem("token")) {
            actions.validate_user()
        } else {
            navigate("/")
        };
    }, []);
    const total = () => {
        let totalCheckout = 0;
        for (let x = 0; x < store.user.items.length; x++) {
            totalCheckout += store.user.items[x].book_format_id.book_price * store.user.items[x].unit
        }
        return totalCheckout
    }
    const createCheckoutSession = async () => {
        const priceIdsAndUnits = [];
        store.user.items.forEach(item => {
            const priceId = item.book_format_id.price_id;
            const quantity = item.unit;
            priceIdsAndUnits.push({ "price_id": priceId, "quantity": quantity })

        });
        console.log(priceIdsAndUnits)
        try {
            const response = await fetch(process.env.BACKEND_URL + 'api/create-checkout-session', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(priceIdsAndUnits)
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data)
                const checkout_url = data.checkout_session.url;

                window.location.replace(checkout_url)
                console.log("response was okay")
            } else {
                throw new Error('Failed to create checkout session');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1 className="feature-title m-5">CHECKOUT</h1>
                {store.user.items && store.user.items.length > 0 ?
                    <>
                        <div className="col-11 col-sm-12 col-md-10 col-lg-9 col-xl-8">
                            <h5 className="text-start feature-title">1. Shipping Address:</h5>
                            <div className="d-flex justify-content-between">
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
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>

                                ) : (
                                    <div className="d-flex">
                                        <button className="btn btn-secondary me-2 custom-button" onClick={handleSave}>
                                            <i className="fa-solid fa-floppy-disk"></i>
                                        </button>
                                        <button className="btn btn-secondary " onClick={() => setEditAddress(false)}>
                                            <i className="fa-solid fa-x"></i>
                                        </button>
                                    </div>


                                )}
                            </div>
                        </div>
                        <div className="col-11 col-sm-12 col-md-10 col-lg-9 col-xl-8 mt-3">
                            <h5 className="text-start feature-title">2. Billing Address:</h5>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checked} onChange={handleBillingAddressChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Is the billing address the same as the shipping address?
                                </label>
                            </div>
                            <div className="row d-flex justify-content-center mt-4">
                                )}
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mt-4">
                            <h5 className="text-start feature-title">3. Order Summary:</h5>


                            {!isMobile ? (store.user.items.sort((a, b) => a.id - b.id).map((items) => {
                                return <CheckoutCard key={items.id} item={items} />;

                            })) : (store.user.items.sort((a, b) => a.id - b.id).map((items) => {
                                return <MobileCheckoutCard key={items.id} item={items} />;

                            }))}
                            <div className="row d-flex justify-content-start ps-0">
                                <div className="col-sm-6 col-md-6 col-lg-4 d-flex justify-content-start pe-0">
                                    <h5 className="text-center py-2 m-0"> Order Total: {parseFloat(total().toFixed(2))}€ </h5>
                                </div>

                            </div>
                            <Elements stripe={promise}>
                                <Stripe />
                            </Elements>



                        </div>
                        <div className="d-flex justify-content-end pe-0 mt-3">
                            <button className="btn custom-button text-center me-2" onClick={createCheckoutSession}><i className="fa-solid">Stripe Redirect &nbsp;</i><i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </> : (
                        <div>Add a book to purchase!</div>
                    )}

            </div>
        </div>




    );
};
