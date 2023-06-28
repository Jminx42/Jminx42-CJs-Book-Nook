import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"
import "../../styles/home.css";
export const PaymentMethod = ({ item }) => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        card_type: "",
        card_number: "",
        card_name: "",
        cvc: "",
        expiry_date: "",
    });
    const [editClicked, setEditClicked] = useState(false);
    const [alert, setAlert] = useState("");
    const [error, setError] = useState("");


    const validateForm = (formData) => {
        const { card_type, card_number, card_name, cvc, expiry_date } =
            formData;
        const errors = {};
        if (!card_type) {
            errors.card_type = "Please enter a valid card type";
        }
        if (!card_number) {
            errors.card_number = "Please enter a valid card number";
        } else if (card_number.length !== 16) {
            errors.card_number = "A valid card number should have 16 digits";
        }
        if (!card_name) {
            errors.card_name = "Please enter the name on your card";
        }
        if (!cvc) {
            errors.cvc = "Please confirm your password";
        } else if (cvc.length !== 3) {
            errors.cvc = "A valid cvc number should have 3 digits";
        }
        if (!expiry_date) {
            errors.expiry_date = "Please select the correct expiry date";
        }
        return errors;
    };

    const handleEditPaymentMethod = () => {
        validateForm(formData)
        editPaymentMethod(formData.card_type, formData.card_number, formData.card_name, formData.cvc, formData.expiry_date)
        setEditClicked(false)
    }

    const editPaymentMethod = async (card_type, card_number, card_name, cvc, expiry_date) => {
        const opts = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "card_type": card_type, "card_number": card_number, "card_name": card_name, "cvc": cvc, "expiry_date": expiry_date })
        };

        try {
            const resp = await fetch(process.env.BACKEND_URL + 'api/user/payment-method/update', opts);
            if (resp.status !== 200) {
                const data = await resp.json();
                const errorMessage = data.error || "Something went wrong";
                setError(errorMessage);
                return false;
            } else {
                await actions.validate_user();
                setAlert("Your card was added successfully");
                return true;
            }
        } catch (error) {
            console.error(`Error during fetch: ${process.env.BACKEND_URL}api/user/payment-method/update`, error);
        }
    }
    const deletePaymentMethod = async (payment_method_id) => {
        const opts = {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "payment_method_id": payment_method_id })
        };

        try {
            const resp = await fetch(process.env.BACKEND_URL + 'api/user/payment-method/remove', opts);
            if (resp.status !== 200) {
                const data = await resp.json();
                const errorMessage = data.error || "Something went wrong";
                setError(errorMessage);
                return false;
            } else {
                await actions.validate_user();
                setAlert("Your card was deleted successfully");
                return true;
            }
        } catch (error) {
            console.error(`Error during fetch: ${process.env.BACKEND_URL}api/user/payment-method/remove`, error);
        }
    }

    return (
        <div className="card mx-2 border-0" style={{ width: "18rem" }}>
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
            <div className="card-body" >
                {!editClicked ? (
                    <p className="mb-1">Card Type: {item.card_type}</p>
                ) : (<>
                    <label>Card Type:</label>
                    <input
                        className="form-control p-0 mb-1"
                        id="card_type"
                        aria-describedby="card_type"
                        defaultValue={formData.card_type}
                        onChange={(e) => setFormData({ ...formData, card_type: e.target.value })}
                    />
                    {errors.card_type && (
                        <div className="invalid-feedback">{errors.card_type}</div>
                    )}</>
                )}

                {!editClicked ? (
                    <p className="mb-1">Card Number: {item.first_four_numbers} **** **** ****</p>
                ) : (
                    <>
                        <label>Card Number:</label>
                        <input
                            className="form-control p-0 mb-1"
                            id="card_number"
                            aria-describedby="card_number"
                            defaultValue={formData.card_number}
                            onChange={(e) => setFormData({ ...formData, card_number: e.target.value })}
                        />
                        {errors.card_number && (
                            <div className="invalid-feedback">{errors.card_number}</div>
                        )}</>)}

                {!editClicked ? (
                    <p className="mb-1">Card Name: {item.card_name}</p>
                ) : (
                    <>
                        <label>Card Name:</label>
                        <input
                            className="form-control p-0 mb-1"
                            id="card_name"
                            aria-describedby="card_name"
                            defaultValue={formData.card_name}
                            onChange={(e) => setFormData({ ...formData, card_name: e.target.value })}
                        />
                        {errors.card_name && (
                            <div className="invalid-feedback">{errors.card_name}</div>
                        )}
                    </>)}

                {!editClicked ? (
                    <p className="mb-1">CVC: ***</p>
                ) : (
                    <>
                        <label>CVC:</label>
                        <input
                            className="form-control p-0 mb-1"
                            id="cvc"
                            aria-describedby="cvc"
                            defaultValue={formData.cvc}
                            onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                        />
                        {errors.cvc && (
                            <div className="invalid-feedback">{errors.cvc}</div>
                        )}
                    </>
                )}

                {!editClicked ? (
                    <p className="mb-1">Expiry Date: {item.expiry_date}</p>
                ) : (<>
                    <label>Expiry Date:</label>
                    <input
                        className="form-control p-0 mb-1"
                        id="expiry_date"
                        type="date"
                        aria-describedby="expiry_date"
                        defaultValue={formData.expiry_date}
                        onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                    />
                    {errors.expiry_date && (
                        <div className="invalid-feedback">{errors.expiry_date}</div>
                    )}
                </>)}
                {!editClicked ?
                    <>
                        <button className="btn custom-button me-2" onClick={() => {
                            setEditClicked(true)

                        }}>Edit</button>
                        <button className="btn custom-button me-2" onClick={() => deletePaymentMethod(item.id)}>Delete</button>
                    </>
                    :
                    <>
                        <button className="btn custom-button me-2" onClick={handleEditPaymentMethod}>Save</button>
                        <button className="btn custom-button me-2" onClick={() => setEditClicked(false)}>Close</button></>}

            </div>
        </div>
    );
}

