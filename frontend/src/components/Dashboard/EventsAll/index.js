
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
                <EventsPublished />
                <hr className='table__divider' />

                <EventsDrafts />
            </div>
        </>
    )
}

export default EventsAll;
