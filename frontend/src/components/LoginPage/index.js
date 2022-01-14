import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import * as sessionActions from '../../store/session';

import './LoginPage.css';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        return <Navigate to="/" />
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

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
        navigate('/signup');
    }

    return (
        <div id='auth__parent'>

            <div id='auth__container'>
                <div id='auth__container--heading'>Log In</div>

                <form className='auth__container--formcontent' onSubmit={handleSubmit}>
                    {errors.length ?
                        <ul className='auth__container--form-errors'>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul> : null
                    }
                    <label htmlFor='username-or-email'>
                        <input
                            id='username-or-email'
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            placeholder='Username or Email'
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
                    <button className="button button__submit--primary button__modal" type="submit">Log In</button>
                </form>
                <hr />
                <form onSubmit={handleDemo}>
                    <button className='button button__submit--primary button__modal' type="submit">Demo User</button>
                </form>
                <form onSubmit={handleRedirect}>
                    <button className='button button__submit--secondary button__modal button__modal' type="submit">Want to Sign Up?</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
