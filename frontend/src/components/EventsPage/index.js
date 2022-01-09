import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEvents } from '../../store/event';
import EventCard from '../EventCard';

import './Events.css';

function Events() {
    const dispatch = useDispatch();
    const eventsObj = useSelector((state) => state.event.events);
    const events = Object.values(eventsObj)

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    return (
        <>
            <h1>Tonight's Top Events</h1>

            <div className='events__container--items'>
                {events.map((event) =>
                    (< EventCard eventId={event.id} />)
                )}
            </div>
        </ >
    )
}

export default Events;
