import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { getAllCategories } from "../../../store/category";
import { createVenue, updateVenue } from "../../../store/venue";
import { createEvent, updateEvent } from "../../../store/event";
import { validateEventForm, validateImage } from '../../../utils/form-validations';

import { getDateTime } from "../../../utils/date-time";

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
    const [secretLocation, setSecretLocation] = useState(formProps?.secretLocation || false);
    const [eventUrl, setEventUrl] = useState(formProps?.eventUrl || '');
    const [categoryId, setCategoryId] = useState(formProps?.categoryId || '');
    const [published, setPublished] = useState(formProps?.published || true);

    const [venueName, setVenueName] = useState(formProps?.venueName || '');
    const [venueAddress, setVenueAddress] = useState(formProps?.venueAddress || '');
    const [venueCity, setVenueCity] = useState(formProps?.venueCity || '');
    const [venueState, setVenueState] = useState(formProps?.venueState || '');
    const [venueZip, setVenueZip] = useState(formProps?.venueZip || '');
    const [validateEvent, setValidateEvent] = useState({});
    const [validateVenue, setValidateVenue] = useState({})

    const [minStartTime, setMinStartTime] = useState(getDateTime());
    const [minEndTime, setMinEndTime] = useState(startTime || getDateTime());

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(formProps?.imageName || null);
    const [uploadPrompt, setUploadPrompt] = useState(formProps?.imageName || 'No file selected.');
    const [validImage, setValidImage] = useState(true);

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
    useEffect(() => { }, [validateEvent, validateVenue, minEndTime, virtualEvent]);

    /* HELPER FUNCTIONS */
    async function handleFile(e) {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setUploadPrompt(file.name);
            setImageName(file.name);
            setValidImage(validateImage(file.type));
        } else {
            setValidImage(true);
        }
    }

    async function handleRemoveFile(e) {
        setImage(null);
        setUploadPrompt('No file selected.');
        setValidImage(true);
        setImageName(null);
    }

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
            venueId: venueId ? +venueId : null,
            categoryId: categoryId ? +categoryId : null,
            published: published,
            image: image ? image : null,
            imageName: imageName ? imageName : null
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
            venueId: +venueId,
            categoryId: categoryId ? +categoryId : null,
            published: published,
            image: image ? image : null,
            imageName: imageName ? imageName : null
        }

        dispatch(updateEvent(eventId, event, published));

        return eventId;
    }

    function runValidations() {
        // run validations if user chooses to publish the event
        // otherwise, clear the validation errors
        const validationItems = {
            name, startTime, endTime, description, categoryId, virtualEvent, capacity,
            venueName, venueAddress, venueCity, venueState, venueZip, image
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

        let errors = {};

        if (published) {
            errors = runValidations();

            const [eventErrors, venueErrors] = errors;

            setValidateEvent(eventErrors)
            setValidateVenue(venueErrors)

            if (Object.keys(eventErrors).length ||
                Object.keys(venueErrors).length) {
                return;
            }
        }

        if (!validImage) {
            errors.image = 'Image type must be one of the accepted formats';
            return;
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
        else navigate('/dashboard/drafts');
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
                                Stream URL
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
                                    Address*
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
                                City*
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
                                State*
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
                                Zip*
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
                            Event Image
                            {!validImage && (
                                <span className='form__submit--error'>Image type must be one of the accepted formats.</span>
                            )}
                        </div>
                        <div className='event__form--description'>
                            <p>
                                Upload a PNG, JPG, or JPEG.
                            </p>
                        </div>
                        <div className='event__form--upload'>
                            <label htmlFor='file' className='event__form--upload-inp'>
                                <input id='file' type="file" onChange={handleFile} />
                                Choose a File
                            </label>
                            <div className='event__form--upload-prompt'>
                                {uploadPrompt} {imageName && (<i className="fa-solid fa-s fa-xmark event__form--upload-icon" onClick={handleRemoveFile}></i>)}
                            </div>
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
                                min={minStartTime}
                                value={startTime}
                                onChange={(e) => {
                                    setStartTime(e.target.value);
                                    setMinEndTime(e.target.value);
                                    return;
                                }}
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
                                min={minEndTime}
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

                    {Object.keys(validateEvent).length > 0 || Object.keys(validateVenue).length > 0 || !validImage ? (
                        <div className='event__form--errors'>Something seems to be missing. Check above to see what went wrong.</div>
                    ) : null}
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
                    {/* {Object.keys(validateEvent).length > 0 || Object.keys(validateVenue).length > 0 ? (
                        <div className='event__form--errors'>Something seems to be missing. Check above to see what went wrong.</div>
                    ) : null} */}
                </form>
            </div>
        </>
    )
}

export default EventForm;
