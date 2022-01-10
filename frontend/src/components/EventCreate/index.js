import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


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
    const [eventType, setEventType] = useState('');

    const [venueName, setVenueName] = useState('');
    const [venueAddress, setVenueAddress] = useState('');
    const [venueCity, setVenueCity] = useState('');
    const [venueState, setVenueState] = useState('');
    const [venueZip, setVenueZip] = useState('');
    const [validateErrors, setValidateErrors] = useState({});
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

    // additional input fields depending on if the event is physical or virtual
    useEffect(() => {
    }, [validateForm, validateVenue, virtualEvent]);

    /* HELPER FUNCTIONS */
    function validateForm() {
        const errors = {};
        let venueErrors;

        if (!name.length) errors.name = 'Please include a name for your event.';
        else if (name.length > 75) errors.name = 'Maximum character length is 75 characters.';

        if (!startTime) errors.startTime = 'Please enter a start time.';
        if (!endTime) errors.endTime = 'Please enter an end time.';
        if (!description) errors.description = 'Please provide a short description about your event.';
        if (!eventType.length) errors.eventType = 'Let us know what type of event you\'re hosting.'

        if (!virtualEvent) {
            errors.virtualEvent = 'Let us know if your event is virtual or in-person.';

            if (virtualEvent === false) {
                venueErrors = validateVenueForm();

                if (!capacity) errors.capacity = 'Please provide an attendee capacity for your event.';
            }
        }

        return [errors, venueErrors];
    }

    function validateVenueForm() {
        const errors = {};
        const zipString = /^\d{5}(?:[-\s]?\d{4})?$/;
        const venueStr = String(venueZip);

        if (!venueName) errors.venueName = 'Please provide the name of the venue';
        if (!venueAddress || !venueCity || !venueState || !venueZip) errors.venueAddress = 'Please provide location information for the venue.';
        if (venueState.length > 2) errors.venueState = 'Please provide a two-letter abbreviation for the state.';
        if (!zipString.test(venueStr)) errors.venueZip = 'Please provide zip code in the following formats: 12345, 12345-6789, or 123456789.'

        return errors;
    }

    function createRecord() {
        if (published) {
            validateForm();
        } else {
            setPublished(false);
        }

        // CREATE THE RECORD WITH DISPATCH
    }

    function resetForm() {

    }

    /* HANDLE SUBMISSION */
    function handleSubmit(e) {
        e.preventDefault();

        const errors = validateForm();
        const [formErrors, venueErrors] = errors;

        if (Object.keys(formErrors).length) {
            if (venueErrors && Object.keys(venueErrors).length) {
                setValidateVenue(venueErrors);
            }

            return setValidateErrors(formErrors);
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
                    {'venueAddress' in validateVenue && (
                        <div className='form__submit--error'>{validateVenue.venueAddress}</div>
                    )}
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
                {'capacity' in validateErrors && (
                    <div className='form__submit--error'>{validateErrors.capacity}</div>
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
                    {'name' in validateErrors && (
                        <div className='form__submit--error'>{validateErrors.name}</div>
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
                    {'description' in validateErrors && (
                        <div className='form__submit--error'>{validateErrors.description}</div>
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
                    {'startTime' in validateErrors && (
                        <div className='form__submit--error'>{validateErrors.startTime}</div>
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
                    {'endTime' in validateErrors && (
                        <div className='form__submit--error'>{validateErrors.endTime}</div>
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
                    {'eventType' in validateErrors && (
                        <div className='form__submit--error'>{validateErrors.eventType}</div>
                    )}
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
                    {'virtualEvent' in validateErrors && (
                        <div className='form__submit--error'>{validateErrors.virtualEvent}</div>
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
