import { csrfFetch } from "./csrf";

const LOAD_EVENTS = 'event/loadEvents';
const ADD_EVENT = 'event/addEvent';
const EDIT_EVENT = 'event/editEvent';
const REMOVE_EVENT = 'event/removeEvent';

// action creators
export const loadEvents = (events) => {
    return {
        type: LOAD_EVENTS,
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

export const removeEvent = (eventId) => {
    return {
        type: REMOVE_EVENT,
        eventId
    }
};

// thunk action creators
export const getAllEvents = () => async (dispatch) => {
    const res = await csrfFetch('/api/events');

    const data = await res.json();
    dispatch(loadEvents(data));
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

export const updateEvent = (eventId, updatedEvent) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedEvent)
    });

    const data = await res.json();
    dispatch(editEvent(data));
    return data;
};

export const deleteEvent = (eventId) => async (dispatch) => {
    await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });
};

// initial state
const initialState = { events: {} }

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
        case ADD_EVENT:
            newState = { ...state };
            newState.events = { ...newState.events, [action.newEvent.id]: action.newEvent };
            return newState;
        case EDIT_EVENT:
            newState = { ...state };
            newState.events[action.eventId] = action.updatedEvent;
            return newState;
        case REMOVE_EVENT:
            newState = { ...state };
            delete newState[action.eventId];
            return newState;
        default:
            return state;
    }
};

export default eventReducer;
