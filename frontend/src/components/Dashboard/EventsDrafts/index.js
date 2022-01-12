
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDraftsByUser } from '../../../store/event';

import EventsTable from '../EventsTable';

function EventsDrafts() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    const draftEventsObj = useSelector((state) => state.event.drafts);
    const draftEvents = Object.values(draftEventsObj);

    useEffect(() => {
        dispatch(getDraftsByUser(userId));
    }, [dispatch])

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
