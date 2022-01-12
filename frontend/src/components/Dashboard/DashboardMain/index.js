import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { getPublishedByUser, getDraftsByUser } from '../../../store/event';

import EventsTable from '../EventsTable';
import EventsDrafts from '../EventsDrafts';
import EventsPublished from '../EventsPublished';
import EventsAll from '../EventsAll';

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
                <h1>Your Events


                </h1>
                <NavLink to='/dashboard/all'>All</NavLink>
                <NavLink to='/dashboard/drafts'>Drafts</NavLink>
                <NavLink to='/dashboard/published'>Published</NavLink>

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
