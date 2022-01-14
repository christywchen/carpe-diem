import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import EventForm from '../EventForm';
import { getEvent } from '../../../store/event';

import { getDateTime } from '../../../utils/date-time';

function EventEdit() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.event.events[eventId]);
    const sessionUser = useSelector(state => state.session.user);

    let formType = 'editPublished';
    let formProps;

    useEffect(() => {
        dispatch(getEvent(eventId));
    }, [dispatch]);

    if (event) {
        if (sessionUser && sessionUser.id !== event.hostId) {
            return <Navigate to={`/events/${event.id}`} />
        }

        if (!event.published) formType = 'editDraft';

        console.log(event.startTime, event.endTime)
        formProps = {
            eventId: event.id,
            name: event.name,
            startTime: event.startTime ? getDateTime(event.startTime) : null,
            endTime: event.startTime ? getDateTime(event.endTime) : null,
            description: event.description,
            capacity: event.capacity,
            virtualEvent: event.virtualEvent,
            secretLocation: event.secretLocation,
            eventUrl: event.eventUrl,
            imageUrl: event.imageUrl,
            categoryId: event.categoryId,
            published: event.published,
            capacity: event.capacity,

            venueId: event.Venue?.id,
            venueName: event.Venue?.name,
            venueAddress: event.Venue?.address,
            venueCity: event.Venue?.city,
            venueState: event.Venue?.state,
            venueZip: event.Venue?.zip
        }
    }

    return (
        <div id='main__narrow'>
            <h1>Edit Your Event</h1>

            <div id='content'>
                {event !== undefined && <EventForm formProps={formProps} formType={formType} />}
            </div>
        </div>
    )
}

export default EventEdit;
