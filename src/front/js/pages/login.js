import React, { useState } from 'react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        // Example: call an API to authenticate user
        console.log('Email:', email);
        console.log('Password:', password);

    };

    return (
        <div className='container md-w-50 bg-light'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
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

