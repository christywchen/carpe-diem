import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPublishedByUser, getDraftsByUser } from '../../../store/event';

function DashboardMain() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;
    const publishedEventsObj = useSelector((state) => state.event.published);

    if (publishedEventsObj) {
        const publishedEvents = Object.values(publishedEventsObj);

        // console.log(Object.values(publishedEventsObj))
        console.log(publishedEventsObj)
    }


    // const events = useSelector((state) => state.event.events);

    // console.log(events)
    useEffect(() => {
        dispatch(getPublishedByUser(userId));
        dispatch(getDraftsByUser(userId));
    }, [dispatch])

    return (
        null
        //     <>
        //         <h1>Your Events</h1>
        //         <h2>Events You're Attending</h2>

        //         <h2>Events You're Organizing</h2>
        //         <p>Just a dashboard.</p>
        //     </>
    )
}

export default DashboardMain;
