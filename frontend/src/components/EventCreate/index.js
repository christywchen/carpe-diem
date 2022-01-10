import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


function EventCreate() {
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');;
    const [virtualEvent, setVirtualEvent] = useState('');
    const [secretLocation, setSecretLocation] = useState(false);
    const [eventUrl, setEventUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [venueId, setVenueId] = useState('');
    const [eventType, setEventType] = useState('');

    const [venueName, setVenueName] = useState('');
    const [venueAddress, setVenueAddress] = useState('');
    const [venueCity, setVenueCity] = useState('');
    const [venueState, setVenueState] = useState('');
    const [venueZip, setVenueZip] = useState('');

    useEffect(() => {
    }, [virtualEvent]);

    // if user is not authenticated
    // redirect to login page after showing a message
    useEffect(() => {
        if (!sessionUser) {
            setTimeout(() => {
                navigate('/signup');
            }, 1500);

        } else {
            return null;
        }
    }, []);

    if (!sessionUser) {
        return (
            <p>You must be logged in to create an event. Redirecting to the login page.</p>
        )
    }

    // otherwise, render form as normal

    // render this subcomponent depending event
    // being virtual or physical
    let getLocationInfo;

    if (virtualEvent) {
        getLocationInfo = (
            <>
                <div>
                    <label htmlFor='event-url'>
                        Stream Url: The Stream url will be shared on the day of the event.
                    </label>
                    <input
                        name='event-url'
                        type='text'
                        value={eventUrl}
                        onChange={(e) => setEventUrl(e.target.value)}
                    />
                </div>
            </>
        );
    } else {
        getLocationInfo = (
            <>
                <div>
                    <label htmlFor='venue-name'>
                        Venue Name:
                    </label>
                    <input
                        name='venue-name'
                        type='text'
                        value={venueName}
                        onChange={(e) => setVenueName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='venue-address'>
                        Address:
                    </label>
                    <input
                        name='venue-address'
                        type='text'
                        value={venueAddress}
                        onChange={(e) => setVenueAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='venue-city'>
                        City:
                    </label>
                    <input
                        name='venue-city'
                        type='text'
                        value={venueCity}
                        onChange={(e) => setVenueCity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='venue-state'>
                        State:
                    </label>
                    <input
                        name='venue-state'
                        type='text'
                        value={venueState}
                        onChange={(e) => setVenueState(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='venue-zip'>
                        Zip:
                    </label>
                    <input
                        name='venue-zip'
                        type='text'
                        value={venueZip}
                        onChange={(e) => setVenueZip(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='event-capacity'>
                        Event Capacity:
                    </label>
                    <input
                        name='event-capacity'
                        type='number'
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='secret-location'>
                        Secret Location? The address specifics will be shared with attendees on the day of the event.
                    </label>
                    <input
                        name='secret-location'
                        type='checkbox'
                        value='true'
                        checked={secretLocation === true}
                        onChange={(e) => setSecretLocation(!secretLocation)}
                    /> Secret
                </div>

            </>

        )
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log('herro');
    }

    return (
        <>
            <h1>Host an Event</h1>
            <p>Tell us about your event and give people a reason to come! Don't forget to share what makes your event unique.</p>
            <form
                onSubmit={handleSubmit}
                className='create__event--form'
            >
                <div>
                    <label htmlFor='name'>
                        Event Name:
                    </label>
                    <input
                        name='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='description'>
                        Description:
                    </label>
                    <textarea
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='start-time'>
                        Start Time:
                    </label>
                    <input
                        name='start-time'
                        type='datetime-local'
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='end-time'>
                        End Time:
                    </label>
                    <input
                        name='end-time'
                        type='datetime-local'
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='event-type'>
                        Event Type:
                    </label>
                    <input
                        name='start-time'
                        type='text'
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='virtual-event'>
                        Virtual or Physical Event:
                    </label>
                    <input
                        name='virtual-event'
                        type='radio'
                        value='true'
                        checked={virtualEvent === true}
                        onChange={(e) => setVirtualEvent(true)}
                    /> Virtual
                    <input
                        name='virtual-event'
                        type='radio'
                        value='false'
                        checked={virtualEvent === false}
                        onChange={(e) => setVirtualEvent(false)}
                    /> Physical
                </div>
                {virtualEvent === true || virtualEvent === false ? getLocationInfo : null}
                <button
                    type="submit"
                >
                    Submit
                </button>
            </form>

        </>
    )
}

export default EventCreate;
