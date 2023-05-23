import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogo.png"

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        //add checks in the function
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your login logic here
        // Example: call an API to authenticate user
        if (await actions.login(email, password)) {
            navigate("/")
        }
        console.log('Email:', email);
        console.log('Password:', password);

    };

    return (
        <div className='container my-auto login-custom'>
            <div className='row'>
                <div className='col-6'>
                    <img src={CJBookNookLogo} height={"500px"} />
                </div>
                <div className='col-6 d-flex justify-content-center align-items-center'>
                    <div>
                        <h1>Login</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                // type="email"
                                id="inputEmail"
                                className="form-control"
                                placeholder="Email"
                                aria-label="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder="Password"
                                aria-label="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>

            </div>
            <div className='row'>



            </div>
        </div>
    );
};

