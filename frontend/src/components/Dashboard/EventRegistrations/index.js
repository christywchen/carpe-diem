import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAllEvents } from '../../../store/event';
import { getRegistrations } from '../../../store/registration';
import { sortByDate } from '../../../utils/date-time';

import EventCard from '../../Events/EventCard';

function EventRegistrations() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const eventsObj = useSelector((state) => {
        if (state.event.events) return state.event.events;
        else return null;
    });
    const eventRegistrationsObj = useSelector((state) => state.registration.registrations)
    const registeredEventIds = Object.keys(eventRegistrationsObj);

    useEffect(() => {
        if (!sessionUser) {
            navigate('/login')
        } else {
            dispatch(getAllEvents());
            dispatch(getRegistrations(sessionUser.id));
        }
    }, [dispatch, sessionUser]);

    let sortedByDate;
    if (registeredEventIds) {
        const eventRegistrations = registeredEventIds.map((eventId) => {
            return eventsObj[eventId];
        });
        sortedByDate = sortByDate(eventRegistrations);
        console.log(sortedByDate)
    }

    if (!sortedByDate.length) {
        return (
            <div className='events__container--title'>
                <h1>Your Tickets</h1>
                <div id='content'>
                    <div className='error__content--none'>
                        There's nothing here! Why not look for your next event? <Link className='text__link--colored' to='/'>Start browsing.</Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <div className='events__container--title'>
                    <h1>Your Tickets</h1>
                    <div id='content'>
                        <div className='events__container--items'>
                            {registeredEventIds && sortedByDate.map((event) =>
                                (<EventCard key={event?.id} event={event} />)
                            )}
                        </div>
                    </div>
                </div>

            </ >
        )
    }
}

export default EventRegistrations;
