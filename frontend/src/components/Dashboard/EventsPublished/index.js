import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEvents, getPublishedByUser } from '../../../store/event';

import EventsTable from '../EventsTable';

function EventsPublished() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);
    const eventsObj = useSelector((state) => state.event.events);
    const publishedIdsObj = useSelector((state) => state.event.userEvents.publishedIds);

    const events = Object.values(eventsObj);
    const publishedIds = Object.values(publishedIdsObj);

    useEffect(() => {
        if (!sessionUser) {
            navigate('/login');
        }
        else {
            dispatch(getAllEvents());
            dispatch(getPublishedByUser(sessionUser.id));
        }
    }, [dispatch]);

    let publishedEvents;
    if (publishedIds && events.length) {
        // using publishedIds array, perform a lookup of events in eventsObj and return an array of the events
        publishedEvents = publishedIds.reduce((events, eventId) => {
            if (eventsObj[eventId]) {
                events.push(eventsObj[eventId]);
            }
            return events;
        }, []);
    }


    return (
        <>
            <div className='events__dashboard--table'>
                <h2>Published Events</h2>
                {publishedEvents && (<EventsTable events={publishedEvents} />)}
            </div>
        </>
    )
}

export default EventsPublished;
