import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css"
import "../../styles/home.css";

export const EmptyPaymentMethod = ({ closeForm }) => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        card_type: "",
        card_number: "",
        card_name: "",
        cvc: "",
        expiry_date: "",
    });
    const [errors, setErrors] = useState({});


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

    const submitPaymentMethod = async () => {
        validateForm(formData)
        await actions.postPaymentMethod(formData.card_type, formData.card_number, formData.card_name, formData.cvc, formData.expiry_date)
        closeForm();
    }

    return (
        <div>
            <label>Card type:</label>
            <input
                className="form-control p-0 mb-1"
                id="card_type"
                aria-describedby="card_type"
                defaultValue={formData.card_type}
                onChange={(e) => setFormData({ ...formData, card_type: e.target.value })}
            />
            <label>Card number:</label>
            <input
                className="form-control p-0 mb-1"
                id="card_number"
                aria-describedby="card_number"
                defaultValue={formData.card_number}
                onChange={(e) => setFormData({ ...formData, card_number: e.target.value })}
            />
            <label>Card name:</label>
            <input
                className="form-control p-0 mb-1"
                id="card_name"
                aria-describedby="card_name"
                defaultValue={formData.card_name}
                onChange={(e) => setFormData({ ...formData, card_name: e.target.value })}
            />
            <label>CVC:</label>
            <input
                className="form-control p-0 mb-1"
                id="cvc"
                aria-describedby="cvc"
                defaultValue={formData.cvc}
                onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
            />
            <label>Expiry date:</label>
            <input
                className="form-control p-0 mb-1"
                id="expiry_date"
                type="date"
                aria-describedby="expiry_date"
                defaultValue={formData.expiry_date}
                onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
            />
            <button className="btn custom-button" onClick={submitPaymentMethod}>Save</button>


        </div>
    );
}

