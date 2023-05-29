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


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await actions.login(email, password)) {
            navigate("/")
        }
    };

    return (


        <div className='container my-auto login-custom'>
            <div className='row'>
                <div className='col-md-6'>
                    <img src={CJBookNookLogo} height={"500px"} />

                </div>
                <div className='col-md-6 d-flex flex-column align-items-center justify-content-center border'>
                    <h1 className='align-self-center my-3'>Login</h1>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                id="inputEmail"
                                className="form-control mb-3"
                                placeholder="Email"
                                aria-label="Email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                className="form-control mb-3"
                                id="inputPassword"
                                placeholder="Password"
                                aria-label="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

