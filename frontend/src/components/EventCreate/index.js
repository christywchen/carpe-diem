import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { validateEventForm } from '../../utils/form-validations';



function EventCreate() {
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate();

    const [published, setPublished] = useState(true);

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
    const [category, setCategory] = useState('');

    const [venueName, setVenueName] = useState('');
    const [venueAddress, setVenueAddress] = useState('');
    const [venueCity, setVenueCity] = useState('');
    const [venueState, setVenueState] = useState('');
    const [venueZip, setVenueZip] = useState('');
    const [validateEvent, setValidateEvent] = useState({});
    const [validateVenue, setValidateVenue] = useState({})

    /* HOOKS */
    // if user is not authenticated, redirect user to log in page
    useEffect(() => {
        if (!sessionUser) {
            setTimeout(() => {
                navigate('/signup');
            }, 1500);
        } else {
            return null;
        }
    }, []);

    // show additional input fields depending on if the event is physical or virtual
    useEffect(() => {
    }, [validateEvent, validateVenue, virtualEvent]);

    /* HELPER FUNCTIONS */
    function createRecord() {
        // if (!published) {
        //     setPublished(false);
        // }

        // CREATE THE RECORD WITH DISPATCH
    }

    function resetForm() {

    }

    /* HANDLE SUBMISSION */
    function handleSubmit(e) {
        e.preventDefault();
        const validationItems = {
            name, startTime, endTime, description, category, virtualEvent, capacity,
            venueName, venueAddress, venueCity, venueState, venueZip
        };

        const errors = validateEventForm({ validationItems });
        const [eventErrors, venueErrors] = errors;

        if (Object.keys(eventErrors).length) {
            if (venueErrors && Object.keys(venueErrors).length) {
                setValidateVenue(venueErrors);
            }

            return setValidateEvent(eventErrors);
        }

        createRecord();
        resetForm()

        console.log('herro');
    }

    /* OTHER THINGS */
    // show unauthenticated user a message before redirecting
    if (!sessionUser) {
        return (
            <p>You must be logged in to create an event. Redirecting to the login page.</p>
        )
    }

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
                    {'venueName' in validateVenue && (
                        <div className='form__submit--error'>{validateVenue.venueName}</div>
                    )}
                    <input
                        name='venue-name'
                        type='text'
                        value={venueName}
                        onChange={(e) => setVenueName(e.target.value)}
                    />
                </div>
                <div>
                    {'venueInfo' in validateVenue && (
                        <div className='form__submit--error'>{validateVenue.venueInfo}</div>
                    )}
                    <label htmlFor='venue-address'>
                        Address:
                    </label>
                    {'venueAddress' in validateVenue && (
                        <div className='form__submit--error'>{validateVenue.venueAddress}</div>
                    )}
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
                    {'venueCity' in validateVenue && (
                        <div className='form__submit--error'>{validateVenue.venueCity}</div>
                    )}
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
                    {'venueState' in validateVenue && (
                        <div className='form__submit--error'>{validateVenue.venueState}</div>
                    )}
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
                    {'venueZip' in validateVenue && (
                        <div className='form__submit--error'>{validateVenue.venueZip}</div>
                    )}
                    <input
                        name='venue-zip'
                        type='text'
                        value={venueZip}
                        onChange={(e) => setVenueZip(e.target.value)}
                    />
                </div>
                {'capacity' in validateEvent && (
                    <div className='form__submit--error'>{validateEvent.capacity}</div>
                )}
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
                    {'name' in validateEvent && (
                        <div className='form__submit--error'>{validateEvent.name}</div>
                    )}
                    <input
                        name='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='image'>
                        Event Image:
                    </label>
                    <input
                        name='image'
                        type='text'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='description'>
                        Description:
                    </label>
                    {'description' in validateEvent && (
                        <div className='form__submit--error'>{validateEvent.description}</div>
                    )}
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
                    {'startTime' in validateEvent && (
                        <div className='form__submit--error'>{validateEvent.startTime}</div>
                    )}
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
                    {'endTime' in validateEvent && (
                        <div className='form__submit--error'>{validateEvent.endTime}</div>
                    )}
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
                    {'category' in validateEvent && (
                        <div className='form__submit--error'>{validateEvent.category}</div>
                    )}
                    <input
                        name='start-time'
                        type='text'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='virtual-event'>
                        Virtual or Physical Event:
                    </label>
                    {'virtualEvent' in validateEvent && (
                        <div className='form__submit--error'>{validateEvent.virtualEvent}</div>
                    )}
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
