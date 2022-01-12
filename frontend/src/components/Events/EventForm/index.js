import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { getAllCategories } from "../../../store/category";
import { createVenue, updateVenue } from "../../../store/venue";
import { createEvent, updateEvent } from "../../../store/event";
import { validateEventForm } from '../../../utils/form-validations';

import './EventForm.css';

function EventForm({ formProps, formType }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const categoriesObj = useSelector(state => state.category.categories);
    const categories = Object.values(categoriesObj);

    const [name, setName] = useState(formProps?.name || '');
    const [startTime, setStartTime] = useState(formProps?.startTime || '');
    const [endTime, setEndTime] = useState(formProps?.endTime || '');
    const [description, setDescription] = useState(formProps?.description || '');
    const [capacity, setCapacity] = useState(formProps?.capacity || '');;
    const [virtualEvent, setVirtualEvent] = useState((formProps?.virtualEvent === true || formProps?.virtualEvent === false) ? formProps?.virtualEvent : 'empty');
    const [secretLocation, setSecretLocation] = useState(false);
    const [eventUrl, setEventUrl] = useState(formProps?.eventUrl || '');
    const [imageUrl, setImageUrl] = useState(formProps?.imageUrl || '');
    const [categoryId, setCategoryId] = useState(formProps?.categoryId || '');
    const [published, setPublished] = useState(formProps?.published || true);

    const [venueName, setVenueName] = useState(formProps?.venueName || '');
    const [venueAddress, setVenueAddress] = useState(formProps?.venueAddress || '');
    const [venueCity, setVenueCity] = useState(formProps?.venueCity || '');
    const [venueState, setVenueState] = useState(formProps?.venueState || '');
    const [venueZip, setVenueZip] = useState(formProps?.venueZip || '');
    const [validateEvent, setValidateEvent] = useState({});
    const [validateVenue, setValidateVenue] = useState({})

    /* HOOKS */
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    // if user is not authenticated, redirect user to log in page
    useEffect(() => {
        if (!sessionUser) navigate('/login');
    }, []);

    // show additional input fields depending on if the event is physical or virtual
    // listen for updates to validations
    useEffect(() => { }, [validateEvent, validateVenue, virtualEvent]);

    /* HELPER FUNCTIONS */
    async function createRecord() {
        let venueId;

        if (virtualEvent === false) {
            const venue = {
                name: venueName ? venueName : null,
                address: venueAddress ? venueAddress : null,
                city: venueCity ? venueCity : null,
                state: venueState ? venueState : null,
                zip: venueZip ? venueZip : null,
                published: published
            };

            const venueRecord = await dispatch(createVenue(venue, published));
            venueId = venueRecord.id;
        } else {
            setCapacity('');
        }

        const event = {
            name: name ? name : 'Untitled Event',
            startTime: startTime ? startTime : null,
            endTime: endTime ? endTime : null,
            description: description ? description : null,
            capacity: capacity ? capacity : null,
            secretLocation: secretLocation === true || secretLocation === false ? secretLocation : null,
            virtualEvent: virtualEvent === true || virtualEvent === false ? virtualEvent : null,
            eventUrl: eventUrl ? eventUrl : null,
            imageUrl: imageUrl ? imageUrl : null,
            venueId: venueId ? venueId : null,
            categoryId: categoryId ? categoryId : null,
            published: published
        }

        const eventRecord = await dispatch(createEvent(event, published));
        const eventId = eventRecord.id;

        return eventId;
    }

    async function updateRecord() {
        let venueId = formProps.venueId;
        let eventId = formProps.eventId;

        if (virtualEvent === false) {
            const venue = {
                name: venueName ? venueName : null,
                address: venueAddress ? venueAddress : null,
                city: venueCity ? venueCity : null,
                state: venueState ? venueState : null,
                zip: venueZip ? venueZip : null,
                published: published
            };

            if (venueId) {
                await dispatch(updateVenue(venueId, venue, published));
            } else {
                const venueRecord = await dispatch(createVenue(venue, published));
                venueId = venueRecord.id;
            }
        } else {
            setCapacity('');
        }

        const event = {
            name: name ? name : 'Untitled Event',
            startTime: startTime ? startTime : null,
            endTime: endTime ? endTime : null,
            description: description ? description : null,
            capacity: capacity ? capacity : null,
            secretLocation: secretLocation === true || secretLocation === false ? secretLocation : null,
            virtualEvent: virtualEvent === true || virtualEvent === false ? virtualEvent : null,
            eventUrl: eventUrl ? eventUrl : null,
            imageUrl: imageUrl ? imageUrl : null,
            venueId: venueId,
            categoryId: categoryId ? categoryId : null,
            published: published
        }

        dispatch(updateEvent(eventId, event, published));

        return eventId;
    }

    function runValidations() {
        // run validations if user chooses to publish the event
        // otherwise, clear the validation errors
        const validationItems = {
            name, startTime, endTime, description, categoryId, virtualEvent, capacity,
            venueName, venueAddress, venueCity, venueState, venueZip
        };

        const errors = validateEventForm({ validationItems });
        let [eventErrors, venueErrors] = errors;

        if (virtualEvent === true) {
            venueErrors = {};
        }

        return errors;
    }

    /* HANDLE SUBMISSION */
    async function handleSubmit(e) {
        e.preventDefault();

        if (published) {
            const errors = runValidations();

            const [eventErrors, venueErrors] = errors;

            setValidateEvent(eventErrors)
            setValidateVenue(venueErrors)

            if (Object.keys(eventErrors).length ||
                Object.keys(venueErrors).length) {
                return;
            }
        }

        setValidateEvent({});
        setValidateVenue({});

        // move forward with form submission if there are no errors:
        // update record using form data if event id exists
        // otherwise, use form data to create a new record
        let eventId;

        if (formProps?.eventId) {
            eventId = formProps.eventId;;
            await updateRecord();
        } else {
            eventId = await createRecord();
        }

        if (published) navigate(`/events/${eventId}`);
        else navigate('/events');
    }

    // render this subcomponent depending event
    // being virtual or physical
    let getLocationInfo;

    if (virtualEvent) {
        getLocationInfo = (
            <>

                <div className='event__form--venue-container'>
                    <div className='event__form--section-venue'>
                        <div className='event__form--title'>
                            <label htmlFor='event-url'>
                                Stream URL:
                            </label>
                        </div>
                        <div className='event__form--description'>
                            <p>
                                This will be shared on the day of the event.
                            </p>
                        </div>
                        <input
                            name='event-url'
                            type='text'
                            value={eventUrl}
                            onChange={(e) => setEventUrl(e.target.value)}
                        />
                    </div>
                </div>
            </>
        );
    } else {
        getLocationInfo = (
            <>
                <div className='event__form--venue-container'>
                    <div className='event__form--section-venue'>
                        <div className='event__form--title'>
                            <label htmlFor='venue-name'>
                                Venue Name*
                            </label>
                            {'venueName' in validateVenue && (
                                <span className='form__submit--error'>{validateVenue.venueName}</span>
                            )}
                        </div>
                        <input
                            name='venue-name'
                            type='text'
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className='event__form--venue'>
                            <div className='event__form--title'>
                                <label htmlFor='venue-address'>
                                    Address:
                                </label>
                                {'venueAddress' in validateVenue && (
                                    <div className='form__submit--error'>{validateVenue.venueAddress}</div>
                                )}
                            </div>
                            <input
                                name='venue-address'
                                type='text'
                                value={venueAddress}
                                onChange={(e) => setVenueAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='event__form--venue'>
                        <div className='event__form--title'>
                            <label htmlFor='venue-city'>
                                City:
                            </label>
                            {'venueCity' in validateVenue && (
                                <div className='form__submit--error'>{validateVenue.venueCity}</div>
                            )}
                        </div>
                        <input
                            name='venue-city'
                            type='text'
                            value={venueCity}
                            onChange={(e) => setVenueCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className='event__form--title'>
                            <label htmlFor='venue-state'>
                                State:
                            </label>
                            {'venueState' in validateVenue && (
                                <div className='form__submit--error'>{validateVenue.venueState}</div>
                            )}
                        </div>
                        <input
                            name='venue-state'
                            type='text'
                            value={venueState}
                            onChange={(e) => setVenueState(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className='event__form--title'>
                            <label htmlFor='venue-zip'>
                                Zip:
                            </label>
                            {'venueZip' in validateVenue && (
                                <div className='form__submit--error'>{validateVenue.venueZip}</div>
                            )}
                        </div>
                        <input
                            name='venue-zip'
                            type='text'
                            value={venueZip}
                            onChange={(e) => setVenueZip(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className='event__form--title'>
                            <div>
                                <label htmlFor='event-capacity'>
                                    Capacity*
                                </label>
                                {'capacity' in validateEvent && (
                                    <div className='form__submit--error'>{validateEvent.capacity}</div>
                                )}
                            </div>
                            <input
                                name='event-capacity'
                                type='number'
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='event__form--title'>
                            <label htmlFor='secret-location'>
                                Secret Location?
                            </label>
                            <input
                                name='secret-location'
                                type='checkbox'
                                value='true'
                                checked={secretLocation === true}
                                onChange={(e) => setSecretLocation(!secretLocation)}
                            />
                        </div>
                        {secretLocation && (
                            <div className='event__form--description'>
                                <p>
                                    Address specifics will be kept secret until the day of the event.
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </>

        )
    }

    return (
        <>
            <p>Tell us about your event and give people a reason to come! Don't forget to share what makes your event unique. You can always make edits later on if you change your mind about something.</p>
            <div id='event__form--container'>
                <form
                    onSubmit={handleSubmit}
                    className='event__form--content'
                >
                    <div className='event__form--section'>
                        <div className='event__form--title'>
                            <label htmlFor='name'>
                                Event Name*
                            </label>
                            {'name' in validateEvent && (
                                <span className='form__submit--error'>{validateEvent.name}</span>
                            )}
                        </div>
                        <input
                            name='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='event__form--section'>
                        <div className='event__form--title'>
                            <label htmlFor='image'>
                                Event Image URL
                            </label>
                        </div>
                        <input
                            name='image'
                            type='text'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <div className='event__form--section'>
                        <div className='event__form--title'>
                            <label htmlFor='description'>
                                Description*
                            </label>
                            {'description' in validateEvent && (
                                <div className='form__submit--error'>{validateEvent.description}</div>
                            )}
                        </div>
                        <textarea
                            name='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='event__form--section'>
                        <div className='event__form--title'>
                            <div>
                                <label htmlFor='start-time'>
                                    Start Time*
                                </label>
                                {'startTime' in validateEvent && (
                                    <div className='form__submit--error'>{validateEvent.startTime}</div>
                                )}
                            </div>
                            <input
                                name='start-time'
                                type='datetime-local'
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='event__form--section'>
                        <div className='event__form--title'>
                            <div>
                                <label htmlFor='end-time'>
                                    End Time*
                                </label>
                                {'endTime' in validateEvent && (
                                    <div className='form__submit--error'>{validateEvent.endTime}</div>
                                )}
                            </div>
                            <input
                                name='end-time'
                                type='datetime-local'
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='event__form--section'>
                        <div className='event__form--title'>
                            <div>
                                <label htmlFor='event-type'>
                                    Event Type*
                                </label>
                                {'categoryId' in validateEvent && (
                                    <div className='form__submit--error'>{validateEvent.categoryId}</div>
                                )}
                            </div>
                            <select
                                name='event-type'
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}>
                                <option value=''>Select</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='event__form--section'>
                        <div className='event__form--title'>
                            <div>
                                <label htmlFor='virtual-event'>
                                    Virtual or Physical Event*
                                </label>
                            </div>
                            <div className='event__form--box'>
                                <input
                                    name='virtual-event'
                                    type='radio'
                                    value='true'
                                    checked={virtualEvent === true}
                                    onChange={(e) => setVirtualEvent(true)}
                                /> Virtual
                            </div>
                            <div className='event__form--radio'>
                                <input
                                    name='virtual-event'
                                    type='radio'
                                    value='false'
                                    checked={virtualEvent === false}
                                    onChange={(e) => setVirtualEvent(false)}
                                /> Physical
                            </div>
                        </div>
                        {'virtualEvent' in validateEvent && (
                            <div className='form__submit--error'>{validateEvent.virtualEvent}</div>
                        )}

                    </div>
                    {virtualEvent === true || virtualEvent === false ? getLocationInfo : null}
                    <div className='event__form--submit'>
                        {formType === 'editPublished' ?
                            (
                                <>
                                    <button
                                        className='button button__submit--primary'
                                        type="submit"
                                        onClick={() => setPublished(true)}
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) :
                            (
                                <>
                                    <button
                                        className='button button__submit--grey'
                                        type="submit"
                                        onClick={() => setPublished(false)}
                                    >
                                        Save Draft
                                    </button>
                                    <button
                                        className='button button__submit--primary'
                                        type="submit"
                                        onClick={() => setPublished(true)}
                                    >
                                        Publish Now
                                    </button>
                                </>
                            )}

                    </div>
                </form>
            </div>
        </>
    )
}

export default EventForm;
