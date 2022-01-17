import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEvents, getPublishedByCat } from '../../../store/event';
import { sortByDate } from '../../../utils/date-time';

import EventCard from '../EventCard';

import './EventsList.css';

function EventsList() {
    const { catId } = useParams();
    const dispatch = useDispatch();
    const eventsObj = useSelector((state) => state.event.events);
    const eventsIdsByCat = useSelector((state) => {
        if (state.event.published.byCat[catId]) return Object.keys(state.event.published.byCat[catId])
        else return null;
    });

    const events = Object.values(eventsObj);

    useEffect(() => {
        if (catId) {
            dispatch(getAllEvents());
            if (catId !== 'all') dispatch(getPublishedByCat(catId));
        }
    }, [dispatch, catId]);


    let sortedByDate;
    if (eventsIdsByCat && events.length) {
        const catEvents = eventsIdsByCat.map((id) => {
            return eventsObj[id];
        });
        sortedByDate = sortByDate(catEvents);
    } else {
        sortedByDate = sortByDate(events);
    }

    console.log(sortedByDate)

    sortedByDate = sortedByDate.filter((event) => {
        return event.published === true;
    });

    if (!sortedByDate.length) {
        return (
            <div id='content'>
                <div className='error__content--none'>
                    There's nothing here! Perhaps you could be the one to change that? <Link className='text__link--colored' to='/events/new'>Host your own event.</Link>
                </div>
            </div>
        )
    } else {
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
}

export default EventsList;
