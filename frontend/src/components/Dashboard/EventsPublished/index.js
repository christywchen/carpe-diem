import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getPublishedByUser } from '../../../store/event';

import EventsTable from '../EventsTable';

function EventsPublished() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);
    const eventsObj = useSelector((state) => state.event.events);
    const publishedIds = useSelector((state) => state.event.published.byId)

    let events = Object.values(eventsObj);

    let userId;
    useEffect(() => {
        if (!sessionUser) {
            navigate('/login');
        }
        else {
            userId = sessionUser.id;
            dispatch(getPublishedByUser(userId));
        }
    }, [dispatch]);

    let publishedEvents;
    if (publishedIds && events.length) {
        // using publishedIds array, perform a lookup of events in eventsObj and return an array of the events
        publishedEvents = publishedIds.map((id) => {
            return eventsObj[id];
        })
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
