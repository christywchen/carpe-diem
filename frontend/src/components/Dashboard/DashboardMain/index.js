import React, { useEffect } from 'react';
// import { useLocation } from 'react-redux';
import { NavLink, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { getPublishedByUser, getDraftsByUser } from '../../../store/event';

import EventsTable from '../EventsTable';
import EventsDrafts from '../EventsDrafts';
import EventsPublished from '../EventsPublished';

function DashboardMain() {
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/dashboard') {
            navigate('/dashboard/all')
        };
    }, [location]);

    return (
        <>
            <div id='main__narrow'>
                <h1>Your Events</h1>
                <NavLink to='/dashboard/all'>All</NavLink>
                <NavLink to='/dashboard/drafts'>Drafts</NavLink>
                <NavLink to='/dashboard/published'>Published</NavLink>

                <Routes>
                    <Route path='all' element={
                        <>
                            <EventsPublished />
                            <hr />
                            <EventsDrafts />
                        </>
                    } />
                    <Route path='drafts' element={<EventsDrafts />} />
                    <Route path='published' element={<EventsPublished />} />
                </Routes>

            </div >
        </>
    )
}

export default DashboardMain;
