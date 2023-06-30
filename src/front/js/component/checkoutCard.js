import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css";
import "../../styles/home.css";

export const CheckoutCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    useEffect(() => {
        actions.clearError();

    }, []);

    const handleAddUnit = async (transaction_id) => {
        const opts = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "transaction_id": item.id })
        };


        try {
            const resp = await fetch(process.env.BACKEND_URL + 'api/addunit', opts);
            if (resp.status !== 200) {
                const data = await resp.json();
                const errorMessage = data.error || "Something went wrong";
                setErrorMessage(errorMessage);
                return false;
            } else {
                await actions.validate_user();
                setAlertMsg("Your cart was updated successfully");
                return true;
            }
        } catch (error) {
            console.error(`Error during fetch: ${process.env.BACKEND_URL}api/addunit`, error);
        }
    }

    const handleRemoveUnit = async (id) => {
        const opts = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "transaction_id": item.id })
        };


        try {
            const resp = await fetch(process.env.BACKEND_URL + 'api/removeunit', opts);
            if (resp.status !== 200) {
                const data = await resp.json();
                const errorMessage = data.error || "Something went wrong";
                setErrorMessage(errorMessage);
                return false;
            } else {
                await actions.validate_user();
                setAlertMsg("Your cart was updated successfully");
                return true;
            }
        } catch (error) {
            console.error(`Error during fetch: ${process.env.BACKEND_URL}api/removeunit`, error);
        }
    }

    const handleRemove = async (id) => {
        const opts = {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "transaction_id": item.id })
        };


        try {
            const resp = await fetch(process.env.BACKEND_URL + 'api/removeitem', opts);
            if (resp.status !== 200) {
                const data = await resp.json();
                const errorMessage = data.error || "Something went wrong";
                setErrorMessage(errorMessage);
                return false;
            } else {
                await actions.validate_user();
                setAlertMsg("Your item was deleted successfully");
                return true;
            }
        } catch (error) {
            console.error(`Error during fetch: ${process.env.BACKEND_URL}api/removeitem`, error);
        }
    }


    return (
        <div className="container">
            {
                store.errorMsg && store.errorMsg !== "" || errorMessage && errorMessage !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            <div>
                                {store.errorMsg}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }

            <div className="row mb-2">
                <div className="col-3 col-sm-2 col-md-2 col-lg-2">
                    <Link to={`/book/${item.book_id.isbn}`}>
                        <img src={item.book_id.book_cover} className="card-img-top" alt="..." />
                    </Link>
                </div>
                <div className="col-9 col-sm-4 col-md-4 col-lg-4">
                    <h4 className="text-start">{item.book_id.title}</h4>
                    <h5 className="text-start">by {item.book_id.author}</h5>
                    <p className="text-start mb-0">{item.book_format_id.book_format}</p>
                </div>
                <div className="col-6 col-sm-3 col-md-3 col-lg-3 d-flex h-25 justify-content-center align-items-center">
                    <button className="btn custom-button" onClick={() => handleAddUnit(item.id)}><i className="fa-solid fa-plus"></i></button>
                    <p className="text-center mb-0 px-3">{item.unit}</p>
                    <button className="btn custom-button" onClick={() => handleRemoveUnit(item.id)}><i className="fa-solid fa-minus"></i></button>

                </div>
                <div className="col-3 col-sm-2 col-md-2 col-lg-2 h-25 align-items-center">
                    <p className="text-center mb-0 p-2">{item.book_format_id.book_price * item.unit}€</p>
                </div>
                <div className="col-1 col-sm-1 col-md-1 col-lg-1 h-25 align-items-center">
                    <button className="btn custom-button" onClick={() => handleRemove(item.id)}><i className="fa-solid fa-trash"></i></button>


                </div>

            </div>
        </div>
    );
};

export default CheckoutCard;
