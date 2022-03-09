import { csrfFetch } from "./csrf";

const LOAD_EVENTS = 'event/loadEvents';
const LOAD_PUBLISHED_EVENTS = 'event/loadPublishedEvents';
const LOAD_DRAFT_EVENTS = 'event/loadDraftEvents';
const ADD_PUBLISHED_EVENT = 'event/addPublishedEvent';
const ADD_DRAFT_EVENT = 'event/addDraftEvent';
const REMOVE_PUBLISHED_EVENT = 'event/removePublishedEvent';
const REMOVE_DRAFT_EVENT = 'event/removeDraftEvent';

// action creators
export const loadEvents = (events) => {
    return {
        type: LOAD_EVENTS,
        events
    }
};

export const loadPublishedEvents = (events) => {
    return {
        type: LOAD_PUBLISHED_EVENTS,
        events
    }
};

export const loadDraftEvents = (events) => {
    return {
        type: LOAD_DRAFT_EVENTS,
        events
    }
};

export const addPublishedEvent = (newEvent) => {
    return {
        type: ADD_PUBLISHED_EVENT,
        newEvent
    }
};

export const addDraftEvent = (newEvent) => {
    return {
        type: ADD_DRAFT_EVENT,
        newEvent
    }
};

export const removePublishedEvent = (eventId) => {
    return {
        type: REMOVE_PUBLISHED_EVENT,
        eventId
    }
};

export const removeDraftEvent = (eventId) => {
    return {
        type: REMOVE_DRAFT_EVENT,
        eventId
    }
};

// thunk action creators
export const getAllEvents = () => async (dispatch) => {
    const res = await csrfFetch('/api/events');

    const data = await res.json();
    dispatch(loadEvents(data));
};

export const getPublishedByUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/events/published`);

    const data = await res.json();
    dispatch(loadPublishedEvents(data));
};

export const getDraftsByUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/events/drafts`);

    const data = await res.json();
    dispatch(loadDraftEvents(data));
};

export const getEvent = (eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`);

    const data = await res.json();
    dispatch(loadEvents([data]));
};

export const createEvent = (newEvent, published) => async (dispatch) => {
    const { name, startTime, endTime, description, capacity, virtualEvent, secretLocation, eventUrl, categoryId, published, image, imageName } = newEvent;
    const formData = new FormData();

    if (name) formData.append('name', name);
    if (startTime) formData.append('startTime', startTime);
    if (endTime) formData.append('endTime', endTime);
    if (description) formData.append('description', description);
    if (capacity) formData.append('capacity', capacity);
    if (virtualEvent !== null) formData.append('virtualEvent', virtualEvent);
    if (secretLocation !== null) formData.append('secretLocation', secretLocation);
    if (eventUrl) formData.append('eventUrl', eventUrl);
    if (categoryId) formData.append('categoryId', categoryId);
    if (image) formData.append('image', image);
    if (imageName) formData.append('imageName', imageName);

    formData.append('published', published);

    for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1])
        console.log(typeof key[1])
    }

    const res = await csrfFetch('/api/events', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    });

    const data = await res.json();
    if (published) dispatch(addPublishedEvent(data));
    else dispatch(addDraftEvent(data));
    return data;
};

export const updateEvent = (eventId, updatedEvent, published) => async (dispatch) => {
    const { name, startTime, endTime, description, capacity, virtualEvent, secretLocation, eventUrl, categoryId, published, image, imageName } = updatedEvent;
    const formData = new FormData();

    if (name) formData.append('name', name);
    if (startTime) formData.append('startTime', startTime);
    if (endTime) formData.append('endTime', endTime);
    if (description) formData.append('description', description);
    if (capacity) formData.append('capacity', capacity);
    if (virtualEvent !== null) formData.append('virtualEvent', virtualEvent);
    if (secretLocation !== null) formData.append('secretLocation', secretLocation);
    if (eventUrl) formData.append('eventUrl', eventUrl);
    if (categoryId) formData.append('categoryId', categoryId);
    if (image) formData.append('image', image);
    if (imageName) formData.append('imageName', imageName);

    formData.append('published', published);

    const res = await csrfFetch(`/api/events/${eventId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    });

    const data = await res.json();

    if (published) dispatch(addPublishedEvent(data));
    else dispatch(addDraftEvent(data));

    return data;
};

export const deleteEvent = (eventId, published) => async (dispatch) => {
    await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });

    if (published) dispatch(removePublishedEvent(eventId));
    else dispatch(removeDraftEvent(eventId));
};

// initial state
const initialState = { events: {}, user: { drafts: {}, published: {} } }

// event reducer
const eventReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_EVENTS:
            newState = { ...state };
            newState.events = action.events.reduce((events, event) => {
                events[event.id] = event;
                return events;
            }, {});
            return newState;
        case LOAD_PUBLISHED_EVENTS:
            newState = { ...state };
            newState.user.published = action.events.reduce((events, event) => {
                events[event.id] = event;
                return events;
            }, {});
            return newState;
        case LOAD_DRAFT_EVENTS:
            newState = { ...state };
            newState.user.drafts = action.events.reduce((events, event) => {
                events[event.id] = event;
                return events;
            }, {});
            return newState;
        case ADD_PUBLISHED_EVENT:
            newState = { ...state };
            newState.events = { ...state.events, [action.newEvent.id]: action.newEvent };
            newState.user.published[action.newEvent.id] = action.newEvent.id;
            return newState;
        case ADD_DRAFT_EVENT:
            newState = { ...state };
            newState.events = { ...state.events, [action.newEvent.id]: action.newEvent };
            newState.user.drafts[action.newEvent.id] = action.newEvent.id;
            return newState;
        case REMOVE_PUBLISHED_EVENT:
            newState = { ...state };
            newState.events = { ...state.events };

            delete newState.events[action.eventId];
            delete newState.user.published[action.eventId];
            return newState;
        case REMOVE_DRAFT_EVENT:
            newState = { ...state };
            newState.events = { ...state.events };

            delete newState.events[action.eventId];
            delete newState.user.drafts[action.eventId];
            return newState;
        default:
            return state;
    }
};

export default eventReducer;
