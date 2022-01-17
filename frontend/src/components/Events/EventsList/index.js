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
    const events = useSelector((state) => {
        if (state.event.events) return Object.values(state.event.events);
        else return null;
    });
    const eventsByCat = useSelector((state) => {
        if (state.event.published.byCat[catId]) return Object.values(state.event.published.byCat[catId])
        else return null;
    });

    useEffect(() => {
        if (catId) {
            dispatch(getAllEvents());
            if (catId !== 'all') dispatch(getPublishedByCat(catId));
        }
    }, [dispatch, catId]);


    let sortedByDate;
    if (eventsByCat) {
        sortedByDate = sortByDate(eventsByCat);
    } else {
        sortedByDate = sortByDate(events);
    }

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
