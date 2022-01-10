import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EventDetails() {
    const { eventId } = useParams();
    const event = useSelector(state => state.event.events[+eventId]);

    if (!event) {
        return <Navigate to='/not-found' />
    }
    const {
        name,
        date,
        description,
        secretLocation,
        virtualEvent,
        eventUrl,
        imageUrl,
        eventTypeId
    } = event;

    const {
        name: venueName,

    } = event.Venue;

    const { name: eventType } = event.EventType;

    console.log('event details', event)
    return (
        <>
            <p>
                {name}

            </p>
            <p>
                <Link to={`/events/${eventId}/edit`} >Edit Event</Link>
            </p>
        </>
    )
}

export default EventDetails;
