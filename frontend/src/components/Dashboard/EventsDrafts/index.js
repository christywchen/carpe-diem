import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllEvents, getDraftsByUser } from '../../../store/event';

import EventsTable from '../EventsTable';

function EventsDrafts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);
    const eventsObj = useSelector((state) => state.event.events);
    const draftIds = useSelector((state) => state.event.userEvents.draftIds);

    const events = Object.values(eventsObj);

    useEffect(() => {
        if (!sessionUser) {
            navigate('/login');
        } else {
            dispatch(getDraftsByUser(sessionUser.id));
            dispatch(getAllEvents());
        }
    }, [dispatch]);

    let draftEvents;
    console.log(draftIds, 'draft ids')
    if (draftIds && events.length) {
        // using draftIds array, perform a lookup of events in eventsObj and return an array of the events
        draftEvents = draftIds.map((id) => {
            return eventsObj[id];
        });
    }

    return (
        <>
            <div className='events__dashboard--table'>
                <h2>Drafted Events</h2>
                {draftEvents && (<EventsTable events={draftEvents} />)}
            </div>
        </>
    )
}

export default EventsDrafts;
