import { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEvents } from '../../../store/event';
import { sortByDate } from '../../../utils/date-time';

import EventCard from '../EventCard';

import './EventsList.css';

function EventsList() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const eventsObj = useSelector(state => state.event.events);
    const events = Object.values(eventsObj);

    // console.log(id)
    useEffect(() => {
        if (id === 'all') dispatch(getAllEvents());
    }, [dispatch]);

    const sortedByDate = sortByDate(events);
    console.log(events)

    return (
        <div id='content'>
            <div className='events__container--items'>
                {sortedByDate.map((event) =>
                    (<EventCard key={event.id} event={event} />)
                )}
            </div>
        </div>
    )
}

export default EventsList;
