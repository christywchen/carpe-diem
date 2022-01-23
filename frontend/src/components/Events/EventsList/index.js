import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEvents } from '../../../store/event';
import { getAllCategories, getPublishedByCat } from '../../../store/category';
import { sortByDate } from '../../../utils/date-time';

import EventCard from '../EventCard';

import './EventsList.css';
import { getRegistrations } from '../../../store/registration';

function EventsList() {
    const { catId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const eventsObj = useSelector((state) => {
        if (state.event.events) return state.event.events;
        else return null;
    });
    const eventIdsByCat = useSelector((state) => {
        if (state.category.events[catId]) return state.category.events[catId];
        else return null;
    });
    const registeredEvents = useSelector((state) => {
        if (state.registration.registrations) return state.registration.registrations;
        else return null;
    })

    useEffect(() => {
        if (catId) {
            dispatch(getAllEvents());
            if (catId !== 'all') dispatch(getPublishedByCat(catId));
        }

        if (sessionUser) {
            dispatch(getRegistrations(sessionUser.id));
        }
    }, [dispatch, catId]);


    let sortedByDate;
    if (eventIdsByCat) {
        const eventsByCat = eventIdsByCat.map((eventId) => {
            return eventsObj[eventId];
        });
        sortedByDate = sortByDate(eventsByCat);
    } else {
        const events = Object.values(eventsObj);
        sortedByDate = sortByDate(events);
        sortedByDate = sortedByDate.filter((event) => {
            return event.published === true;
        });
    }

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
