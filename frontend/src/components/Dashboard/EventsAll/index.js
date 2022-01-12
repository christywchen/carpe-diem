
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import EventsDrafts from '../EventsDrafts';
import EventsPublished from '../EventsPublished';

function EventsAll() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (!sessionUser) navigate('/login');
    }, []);

    return (
        <>
            <div className='events__dashboard--table'>
                <h2>Published Events</h2>
                <EventsPublished />
                <hr />

                <h2>Draft Events</h2>
                <EventsDrafts />
                <hr />
            </div>
        </>
    )
}

export default EventsAll;
