import { csrfFetch } from "./csrf";

const LOAD_EVENTS = 'event/loadEvents';
const LOAD_PUBLISHED_EVENTS = 'event/loadPublishedEvents';
const LOAD_DRAFT_EVENTS = 'event/loadDraftEvents';
const ADD_EVENT = 'event/addEvent';
const EDIT_EVENT = 'event/editEvent';
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

export const addEvent = (newEvent) => {
    return {
        type: ADD_EVENT,
        newEvent
    }
};

export const editEvent = (eventId, updatedEvent) => {
    return {
        type: EDIT_EVENT,
        eventId,
        updatedEvent
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
    const res = await csrfFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(newEvent)
    });

    const data = await res.json();
    if (published) dispatch(addEvent(data));
    return data;
};

export const updateEvent = (eventId, updatedEvent, published) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedEvent)
    });

    const data = await res.json();
    if (published) dispatch(addEvent(data));
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
const initialState = { events: {}, published: {}, drafts: {} }

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
            newState.published = action.events.reduce((events, event) => {
                events[event.id] = event;
                return events;
            }, {});
            return newState;
        case LOAD_DRAFT_EVENTS:
            newState = { ...state };
            newState.drafts = action.events.reduce((events, event) => {
                events[event.id] = event;
                return events;
            }, {});
            return newState;
        case ADD_EVENT:
            newState = { ...state };
            newState.events = { ...newState.events, [action.newEvent.id]: action.newEvent };
            return newState;
        case EDIT_EVENT:
            newState = { ...state };
            newState.events[action.eventId] = action.updatedEvent;
            return newState;
        case REMOVE_PUBLISHED_EVENT:
            newState = { ...state };
            delete newState.events[action.eventId];
            delete newState.published[action.eventId];
            return newState;
        case REMOVE_DRAFT_EVENT:
            newState = { ...state };
            delete newState.events[action.eventId];
            delete newState.drafts[action.eventId];
            return newState;
        default:
            return state;
    }
};

export default eventReducer;
