import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

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
        <div className='container md-w-50 bg-light'>
            <h1>Login</h1>
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
    );
};

