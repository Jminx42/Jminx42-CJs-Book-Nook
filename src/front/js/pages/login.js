import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../styles/login.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookBG.png";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate email
        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (await actions.login(formData.email, formData.password)) {
                navigate("/");
            }
        }
    };


    return (

        <div className="Auth-form container p-5">
            {store.errorMsg && (
                <div className="alert alert-danger text-center" role="alert">
                    {store.errorMsg}
                </div>
            )}
            <div className="card p-5">
                <form className="Auth-form" onSubmit={handleLoginSubmit}>
                    <div className="text-center register-custom-bg-img rounded">

                        <LazyLoadImage
                            src={CJBookNookLogo}
                            alt="CJ Book Nook Logo"
                            className="my-2 border rounded-circle"
                            style={{ width: '150px' }} />
                    </div>
                    <div className="Auth-form-content">

                        <h3 className="Auth-form-title text-center mt-3">Login</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <Link to="/register">
                                <span className="link-like">
                                    Sign Up
                                </span>
                            </Link>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className={`form-control mt-1 ${errors.email && 'is-invalid'}`}
                                placeholder="Enter email"
                                aria-label="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                            )}
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className={`form-control mt-1 ${errors.password && 'is-invalid'}`}
                                placeholder="Enter password"
                                aria-label="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-secondary login-custom-button">
                                Login
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a className="link-like" href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

