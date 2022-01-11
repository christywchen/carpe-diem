import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getEvent } from '../../store/event';

function EventDetails() {
    const { eventId } = useParams();
    console.log(typeof eventId)
    const dispatch = useDispatch();
    const event = useSelector(state => state.event.events[eventId]);
    console.log('event', event)

    useEffect(() => {
        dispatch(getEvent(eventId));
    }, [dispatch]);

    if (!event) {
        return <Navigate to='/not-found' />
    }


    // const {
    //     name: venueName,

    // } = event.Venue;

    // const { name: category } = event.Category;

    return (
        <>
            <p>
                {event?.name}
                Event Page
            </p>
            <p>
                <Link to={`/events/${eventId}/edit`} >Edit Event</Link>
            </p>
        </>
    )
}

export default EventDetails;
