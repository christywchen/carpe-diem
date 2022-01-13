import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getEvent } from '../../../store/event';

import './EventDetails.css'
import { getDateShort } from '../../../utils/date-time';
import { populateDate, populateLocation } from './EventData';

function EventDetails() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const event = useSelector(state => {
        if (state.event.events[eventId]) {
            return state.event.events[eventId];
        } else {
            return null
        }
    });

    useEffect(() => {
        dispatch(getEvent(eventId));
    }, [dispatch]);

    if (!event) {
        return (
            <>
                <div id='main__narrow'>
                    <h1>Event Not Found</h1>

                    <div id='content'>
                        <p>
                            Uh oh, this event doesn't exist yet. Perhaps you could be the one to make it happen?
                        </p>
                        <Link to='/events'>Click here to continue browsing events.</Link>

                    </div>
                </div>
            </>
        )
    } else {
        const {
            name,
            startTime,
            endTime,
            description,
            capacity,
            hostId,
            Venue,
            categoryId,
            Category
        } = event;

        const backgroundImage = { backgroundImage: `url("${event.imageUrl}")` }
        const shortDate = getDateShort(startTime);
        const dateInfo = populateDate(startTime, endTime);
        const locationInfo = populateLocation(event);

        return (
            <>
                <div id='main__narrow'>
                    <div id='event__details--grid'>
                        <div className='event__details--1 event__details--1-default' style={event.imageUrl ? backgroundImage : null}>
                            {sessionUser && sessionUser.id === hostId &&
                                (<p>
                                    <Link className='button button__event--edit' to={`/events/${eventId}/edit`} >Edit Event</Link>
                                </p>)
                            }
                        </div>
                        <div className='event__details--2'>
                            <span className='event__details--date-short'>{shortDate}</span>
                            <div>
                                <h2 className='event__details--title'>{name}</h2>
                                <span className={`event__details--flag event__details--flag-${categoryId}`}>{Category.name}</span>
                            </div>

                            <div className='event__details--date-full'>
                                <h4>Date and Time</h4>
                                {dateInfo}
                            </div>
                        </div>
                        <div className='event__details--3'>
                            <h4>
                                About this Event
                            </h4>
                            {description}

                        </div>
                        <div className='event__details--4'>
                            <h4>
                                Event Location
                            </h4>
                            {locationInfo}

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default EventDetails;
