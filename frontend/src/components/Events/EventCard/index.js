import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createRegistration, deleteRegistration, getRegistrations } from '../../../store/registration';
import { getDateString } from '../../../utils/date-time';

import './EventCard.css';


function EventCard({ event }) {
    const { id, name, startTime, description, categoryId, imageUrl, virtualEvent, Category, Venue } = event;
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const eventRegistration = useSelector(state => state.registration.registrations[event.id])

    const backgroundImage = { backgroundImage: `url("${imageUrl}")` }
    const [date, time] = getDateString(startTime);

    useEffect(() => {
        dispatch(getRegistrations(sessionUser.id))
    }, [dispatch])

    useEffect(() => { }, [eventRegistration])

    function getDescSummary(description) {
        if (description?.length < 75) return description;
        else return description?.slice(0, 80) + '...';
    }

    async function handleRegistration(e) {
        if (eventRegistration) {
            // de-register if registration exists for this event id
            dispatch(deleteRegistration(sessionUser.id, event.id));
        } else {
            // register the user for the event
            dispatch(createRegistration({ userId: sessionUser.id, eventId: event.id }));
        }
    }

    return (
        <>
            <div className='event__card--container'>
                <button
                    onClick={handleRegistration}
                    className={'event__card--registration ' + (eventRegistration ? 'event__card--registered' : '')}>
                    <i className="fas fa-ticket-alt fa-md event__card--ticket"></i>
                </button>
                <Link to={`/events/${id}`}>
                    <div className='event__card--image event__card--image-default' style={imageUrl ? backgroundImage : null}>
                    </div>
                </Link>
                <div className='event__card--body'>
                    <div className={`event__card--flag event__card--flag-${categoryId}`}>{Category?.name}</div>
                    <h3 className='event__card--title'>
                        <Link to={`/events/${id}`}>
                            {name}
                        </Link>
                    </h3>
                    <div className='event__card--date'>{date}, {time}</div>
                    <div className='event__card--location'>
                        <i className="fas fa-map-marker-alt fa-sm event__card--pin" />
                        {!virtualEvent ? (<>{Venue?.city}, {Venue?.state?.toUpperCase()}</>) : (<>Virtual Event</>)}
                    </div>
                    <div className='event__card--description'>{getDescSummary(description)}</div>
                </div>
            </div >
        </>
    )
}

export default EventCard;
