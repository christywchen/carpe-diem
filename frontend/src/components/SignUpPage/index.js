import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignUpPage.css';

function SignUpPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        return <Navigate to="/" />
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Passwords must match.']);
    };

    return (
        <form className='modal__container--form-content' onSubmit={handleSubmit}>
            {errors.length ?
                <ul className='modal__container--form-errors'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> : null
            }
            <label htmlFor='email'>
                <input
                    id='email'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    required
                />
            </label>
            <label htmlFor='username'>
                <input
                    id='username'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    required
                />
            </label>
            <label htmlFor='password'>
                <input
                    id='password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                />
            </label>
            <label htmlFor='confirm-password'>
                <input
                    id='confirm-password'
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password'
                    required
                />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpPage;
