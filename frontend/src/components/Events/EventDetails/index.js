import { useEffect, } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAllEvents, getPublishedByUser } from '../../../store/event';

import './EventDetails.css'
import { getDateShort } from '../../../utils/date-time';
import { populateDate, populateLocation } from '../../../utils/event-data';

function EventDetails() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const published = useSelector((state) => state.event.published);
    const event = useSelector((state) => state.event.events[eventId]);

    useEffect(() => {
        dispatch(getPublishedByUser(sessionUser.id));
        dispatch(getAllEvents(eventId));
    }, [dispatch]);

    const errorMsg = (
        <div id='main__narrow'>
            <h1>Event Not Found</h1>

            <div id='content'>
                <div className='error__content--none'>
                    Uh oh, this event doesn't exist yet. Perhaps you could be the one to make it happen? <Link className='text__link--colored' to='/events'>Continue browsing events.</Link>
                </div>
            </div>
        </div>
    )

    if (!event) {
        return (
            <>
                {errorMsg}
            </>
        )
    } else if (!event?.published) {
        return (
            <>
                {errorMsg}
            </>
        )
    }
    else {
        const {
            name,
            startTime,
            endTime,
            description,
            virtualEvent,
            hostId,
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
                    {!virtualEvent && (
                        <div className='event__details--alert'>
                            This is an in-person event. Have fun, stay safe, and don't forget to take the necessary health precautions before attending!
                        </div>
                    )}
                    < div id='event__details--grid'>

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
                                <span className={`event__details--flag event__details--flag-${categoryId}`}>{Category?.name}</span>
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
