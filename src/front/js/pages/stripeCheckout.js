import React, { useState, useEffect } from "react";
import "../../styles/stripe.css";

export const StripeCheckout = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const createCheckoutSession = async () => {
            try {
                const response = await fetch(process.env.BACKEND_URL + "api/create-checkout-session", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ something: "something" })
                });

                if (response.status !== 200) {
                    const data = await response.json();
                    const errorMessage = data.error || "Something went wrong";
                    setMessage(errorMessage);
                } else {
                    const { url } = await response.json();
                    window.location.href = url; // Redirect to the Stripe checkout page
                }
            } catch (error) {
                console.error(`Error during fetch: ${process.env.BACKEND_URL}api/create-checkout-session`, error);
                setMessage("An error occurred while processing the payment.");
            }
        };

        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
        }

        // If not redirecting or displaying a message, trigger the checkout session creation
        if (!query.get("success") && !query.get("canceled")) {
            createCheckoutSession();
        }
    }, []);

    return (
        <section>
            {message ? (
                <p>{message}</p>
            ) : (
                <div className="product">
                    <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
                    <div className="description">
                        <h3>Stubborn Attachments</h3>
                        <h5>$20.00</h5>
                    </div>
                </div>
            )}
        </section>
    );
};


