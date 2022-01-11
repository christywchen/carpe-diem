import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPublishedByUser, getDraftsByUser } from '../../../store/event';

import EventsTable from '../EventsTable';

function DashboardMain() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    const publishedEventsObj = useSelector((state) => state.event.published);
    const publishedEvents = Object.values(publishedEventsObj);

    const draftEventsObj = useSelector((state) => state.event.drafts);
    const draftEvents = Object.values(draftEventsObj);

    useEffect(() => {
        dispatch(getPublishedByUser(userId));
        dispatch(getDraftsByUser(userId));
    }, [dispatch])

    return (
        <>
            <h1>Your Events</h1>
            <h2>Events You're Hosting</h2>
            {publishedEvents && (<EventsTable events={publishedEvents} />)}

            <h2>Events You're Working On</h2>
            {draftEvents && (<EventsTable events={draftEvents} />)}
        </>
    )
}

export default DashboardMain;
