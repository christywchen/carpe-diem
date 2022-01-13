import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getEvent } from '../../../store/event';

function EventDetails() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const event = useSelector(state => {
        if (state.event.events[eventId]) {
            return state.event.events[eventId];
        } else {
            return null
        }
    });

    let locationInfo;

    useEffect(() => {
        dispatch(getEvent(eventId));
    }, [dispatch]);

    // if (event === null) {
    //     return navigate('/');
    // }

    if (event) {
        if (event.virtualEvent) {
            locationInfo = (
                <>
                    <p>It's online. Check your ticket for the streaming link.</p>
                </>
            );
        } else {
            if (event.secretLocation) {
                locationInfo = (
                    <>
                        <p>It's a secret! Location will be revealed to attendees later.</p>
                    </>
                )
            } else {
                locationInfo = (
                    <>
                        <p>ok fine here's the address</p>
                        <p>{event.Venue?.name}</p>
                        <p>{event.Venue?.address}</p>
                        <p>{event.Venue?.city}, {event?.Venue?.state} {event?.Venue?.zip}</p>
                    </>
                )
            }
        }
    }

    return (
        <>
            <div className='main__narrow'>
                <div className='event__details--grid'>
                    <div className='event__details--1'>
                        <img src={event?.imageUrl} />
                    </div>
                    <div className='event__details__2'>
                        {event?.startTime}
                        {event?.name}
                    </div>
                </div>
            </div>
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
