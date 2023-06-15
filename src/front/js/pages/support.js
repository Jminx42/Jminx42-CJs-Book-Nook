import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Card } from "../component/card";

export const Support = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({ subject: "", message: "" })

    const submitSupport = async () => {
        const response = await fetch(process.env.BACKEND_URL + 'api/support', {
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ "subject": formData.subject, "message": formData.message })
        });

        if (response.ok) {
            const data = await response.json();
            const supportData = data.support;
            await actions.validate_user();
            alert(supportData);
            setFormData({
                subject: '',
                message: ''
            });
        } else {
            const data = await response.json();
            alert(data.error);
        }
    }

    const handleSupport = (e) => {
        e.preventDefault();
        setFormData({ ...formData, user_id: store.user.id })
        submitSupport()
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-4">

                <form onSubmit={handleSupport}>
                    <label>Subject</label>
                    <input
                        className="form-control"
                        id="subject"
                        aria-describedby="subject"
                        value={formData.subject || ""}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    <label>Message</label>
                    <textarea
                        className="form-control"
                        id="message"
                        aria-describedby="message"
                        rows="5"
                        value={formData.message || ""}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <button className="btn custom-button text-white mt-3 mb-4" type="submit">
                        Submit
                    </button>

                </form>


            </div>



        </div>

    );
}