import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPublishedEventsByUser, getDraftEventsByUser } from '../../../store/event';

function DashboardMain() {
    return (
        <>
            <h2>Events You're Attending</h2>

            <h2>Events You're Organizing</h2>
            <p>Just a dashboard.</p>
        </>
    )
}

export default DashboardMain;
