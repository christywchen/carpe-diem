import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEvents } from '../../../store/event';
import { sortByDate } from '../../../utils/date-time';

import EventCard from '../EventCard';

import './EventsList.css';

function Events() {
    const dispatch = useDispatch();
    const eventsObj = useSelector((state) => state.event.events);
    const events = Object.values(eventsObj)

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    const sortedByDate = sortByDate(events)

    return (
        <>
            <div className='events__container--title'>
                <h1>Upcoming Events</h1>
            </div>

            <div id='content'>
                <div className='events__container--items'>
                    {sortedByDate.map((event) =>
                        (<EventCard key={event.id} event={event} />)
                    )}
                </div>
            </div>
        </ >
    )
}

export default Events;
