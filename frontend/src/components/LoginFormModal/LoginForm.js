import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Navigate } from "react-router-dom";
import * as sessionActions from '../../store/session';

import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // if (sessionUser) {
    //     return <Navigate to="/" />
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form className='modal__container--formcontent' onSubmit={handleSubmit}>
            {errors.length ?
                <ul className='modal__container--form-errors'>
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
            <button className="button button__submit--primary" type="submit">Log In</button>
        </form>
    );
}

export default LoginForm;
