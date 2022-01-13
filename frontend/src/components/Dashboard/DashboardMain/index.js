import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { getPublishedByUser, getDraftsByUser } from '../../../store/event';

import EventsTable from '../EventsTable';
import EventsDrafts from '../EventsDrafts';
import EventsPublished from '../EventsPublished';
import EventsAll from '../EventsAll';

import './DashboardMain.css'

function DashboardMain() {
    const navigate = useNavigate()
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (!sessionUser) navigate('/login')
        else if (location.pathname === '/dashboard') navigate('/dashboard/all')
    }, [location, sessionUser]);

    return (
        <>
            <div id='main__narrow'>

                <div id='dashboard__header'>
                    <h1 id='dashboard__header--title'>Your Events</h1>
                    <div id='dashboard__head--links'>
                        <NavLink to='/dashboard/all'>All</NavLink>
                        <NavLink to='/dashboard/drafts'>Drafts</NavLink>
                        <NavLink to='/dashboard/published'>Published</NavLink>
                    </div>
                </div>

                <Routes>
                    <Route path='all' element={<EventsAll />} />
                    <Route path='drafts' element={<EventsDrafts />} />
                    <Route path='published' element={<EventsPublished />} />
                </Routes>

            </div >
        </>
    )
}

export default DashboardMain;
