import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEvents } from '../../../store/event';

import EventCard from '../EventCard';

import './EventsList.css';

function Events() {
    const dispatch = useDispatch();
    const eventsObj = useSelector((state) => state.event.events);
    const events = Object.values(eventsObj)

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    return (
        <>
            <div className='events__container--title'>
                <h1>Tonight's Top Events</h1>
            </div>

            <div id='content'>
                <div className='events__container--items'>
                    {events.map((event) =>
                        (< EventCard key={event.id} event={event} />)
                    )}
                </div>
            </div>
        </ >
    )
}

export default Events;
