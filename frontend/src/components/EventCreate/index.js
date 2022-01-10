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
    const [secretLocation, setSecretLocation] = useState('');
    const [eventUrl, setEventUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [venueId, setVenueId] = useState('');
    const [eventType, setEventType] = useState('');

    let locationInfo;
    useEffect(() => {
        console.log(virtualEvent)
        if (virtualEvent === 'true') {
            locationInfo = (
                <>
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
                </>
            )
        } else {
            locationInfo = (
                <p>Get the address</p>
            )
        }

        console.log(locationInfo)
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

    // create event form for authenticated users

    return (
        <>

            <h1>Host an Event</h1>
            <p>Tell us about your event and give people a reason to come! Don't forget to share what makes your event unique.</p>
            <form className='create__event--form'>

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
                    <label htmlFor='name'>
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
                    <label htmlFor='name'>
                        End Time:
                    </label>
                    <input
                        name='start-time'
                        type='datetime-local'
                        value={endTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='name'>
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
                        checked={virtualEvent === 'true'}
                        onChange={(e) => setVirtualEvent(e.target.value)}
                    /> Virtual
                    <input
                        name='virtual-event'
                        type='radio'
                        value='false'
                        checked={virtualEvent === 'false'}
                        onChange={(e) => setVirtualEvent(e.target.value)}
                    /> Physical
                </div>
                {locationInfo}
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
