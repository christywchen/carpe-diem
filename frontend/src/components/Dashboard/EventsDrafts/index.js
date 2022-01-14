
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getDraftsByUser } from '../../../store/event';

import EventsTable from '../EventsTable';

function EventsDrafts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);
    const draftEventsObj = useSelector((state) => state.event.drafts);
    const draftEvents = Object.values(draftEventsObj);

    let userId;
    useEffect(() => {
        if (!sessionUser) {
            navigate('/login');
        } else {
            userId = sessionUser.id;
            dispatch(getDraftsByUser(userId));
        }
    }, [dispatch]);

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
