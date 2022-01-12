import React, { useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getEvent } from '../../../store/event';

function EventDetails() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.event.events[eventId]);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getEvent(eventId));
    }, [dispatch]);

    // need to fix redirect issuer
    // useEffect(() => {
    //     if (!event) {
    //         // return navigate('/not-found')
    //         console.log('redirect here')
    //         // return <Navigate to='/not-found' />
    //     }
    // }, [])

    if (event?.published === false) {
        return <Navigate to='/not-found' />
    }

    let locationInfo;
    if (event?.virtualEvent) {
        locationInfo = (
            <>
                <p>It's online. Check your ticket for the streaming link.</p>
            </>
        );
    } else {
        if (event?.secretLocation) {
            locationInfo = (
                <>
                    <p>It's a secret! Location will be revealed to attendees later.</p>
                </>
            )
        } else {
            locationInfo = (
                <>
                    <p>ok fine here's the address</p>
                    <p>{event?.Venue?.name}</p>
                    <p>{event?.Venue?.address}</p>
                    <p>{event?.Venue?.city}, {event?.Venue?.state} {event?.Venue?.zip}</p>
                </>
            )
        }
    }

    return (
        <>
            <p> Event Name
                {event?.name}
            </p>
            <p> Start Time
                {event?.startTime}
            </p>
            <p> End Time
                {event?.endTime}
            </p>
            <p> Event Description
                {event?.description}
            </p>
            <p> Event Description
            </p>
            <span>
                {event && locationInfo}
            </span>
            <p>
                {event?.imageUrl}
            </p>
            <p>
                <Link to={`/events/${eventId}/edit`} >Edit Event</Link>
            </p>
        </>
    )
}

export default EventDetails;
