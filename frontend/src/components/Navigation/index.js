import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../Modals/LoginFormModal';
import SignUpFormModal from '../Modals/SignUpFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink to="/dashboard">Manage Events</NavLink>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignUpFormModal />
                {/* <NavLink to="/signup">Sign Up</NavLink> */}
            </>
        );
    }

    return (
        <nav id='nav'>
            <div className='nav__link--left'>
                <NavLink to="/">Browse Events</NavLink>
                <NavLink to="/events/new">Host an Event</NavLink>
            </div>
            <NavLink className="nav__link--center" to="/">Home</NavLink>
            <div className='nav__link--right'>
                {isLoaded && sessionLinks}
            </div>
        </nav>
    );
}

export default Navigation;
