import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <button className='profile__button nav__button--link' onClick={openMenu}>
                <i className="fas fa-user-circle fa-lg" />
            </button>
            {showMenu && (
                <ul className='profile__dropdown--list'>
                    <li className='profile__dropdown--item'>{user.username}</li>
                    <li className='profile__dropdown--item'>{user.email}</li>
                    <li className='profile__dropdown--item'>Your Tickets</li>
                    <li className='profile__dropdown--item'>Your Events</li>
                    <li className='profile__dropdown--item'>
                        <button className='profile__dropdown--button-link nav__button--link' onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
