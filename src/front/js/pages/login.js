import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/login.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogo.png"


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (await actions.login(email, password)) {
            navigate("/")
        }
    };

    return (

        <div className="Auth-form container p-5">
            <div className="card p-5">
                <form className="Auth-form" onSubmit={handleLoginSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title text-center">Login</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <Link to="/register">
                                <span className="link-primary">
                                    Sign Up
                                </span>
                            </Link>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                aria-label="Email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                aria-label="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-secondary login-custom-button">
                                Submit
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

