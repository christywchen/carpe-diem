import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import EventForm from '../EventForm';
import { getEvent } from '../../../store/event';

import { getDateTime } from '../../../utils/date-time';

function EventEdit() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.event.events[eventId]);

    let formType = 'editPublished';
    let formProps;

    if (event) {
        if (!event.published) formType = 'editDraft';

        console.log(event.startTime)
        console.log(getDateTime(event.startTime))
        formProps = {
            eventId: event.id,
            name: event.name,
            startTime: getDateTime(event.startTime),
            endTime: getDateTime(event.endTime),
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

    useEffect(() => {
        dispatch(getEvent(eventId));
    }, [dispatch]);

    return (
        <div id='main__narrow'>
            <h1>Edit Your Event</h1>
            {event !== undefined && <EventForm formProps={formProps} formType={formType} />}
        </div>
    )
}

export default EventEdit;
