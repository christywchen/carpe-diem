
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getPublishedByUser } from '../../../store/event';

import EventsTable from '../EventsTable';

function EventsPublished() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);
    const publishedEventsObj = useSelector((state) => state.event.published);
    const publishedEvents = Object.values(publishedEventsObj);

    let userId;
    useEffect(() => {
        if (!sessionUser) {
            navigate('/login');
        }
        else {
            userId = sessionUser.id;
            dispatch(getPublishedByUser(userId));
        }
    }, [dispatch]);

    return (
        <>
            <div className='events__dashboard--table'>
                <h2>Published Events</h2>
                {publishedEvents && (<EventsTable events={publishedEvents} />)}
            </div>
        </>
    )
}

export default EventsPublished;
