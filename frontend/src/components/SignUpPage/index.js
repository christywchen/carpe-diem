import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";

import '../LoginPage/LoginPage.css';

function SignUpPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const handleDemo = (e) => {
        e.preventDefault();

        const credential = 'DemoUser';
        const password = 'password';

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
            });
    }

    const handleRedirect = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <div id='auth__parent'>
            <div id='auth__container'>
                <div id='auth__container--heading'>Sign Up</div>

                <form className='auth__container--formcontent' onSubmit={handleSubmit}>
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
                    <button className="button button__submit--primary button__modal" type="submit">Sign Up</button>
                </form>
                <hr />
                <form onSubmit={handleDemo}>
                    <button className='button button__submit--primary button__modal' type="submit">Demo User</button>
                </form>
                <form onSubmit={handleRedirect}>
                    <button className='button button__submit--secondary button__modal button__modal' type="submit">Want to Log In?</button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
