import { csrfFetch } from "./csrf";

const LOAD_EVENTS = 'event/loadEvents';
const LOAD_PUBLISHED_EVENTS_BY_CAT = 'event/loadPublishedEventsByCat';
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

export const loadPublishedEventsByCat = (events, catId) => {
    return {
        type: LOAD_PUBLISHED_EVENTS_BY_CAT,
        events,
        catId
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

export const getPublishedByCat = (catId) => async (dispatch) => {
    const res = await csrfFetch(`/api/categories/${catId}/events`);

    const data = await res.json();
    dispatch(loadPublishedEventsByCat(data, catId));
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
    if (published) dispatch(addPublishedEvent(data));
    else dispatch(addDraftEvent(data));
    return data;
};

export const updateEvent = (eventId, updatedEvent, published) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedEvent)
    });

    const data = await res.json();

    if (published) {
        dispatch(addPublishedEvent(data));
    } else {
        dispatch(addDraftEvent(data));
    }
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
const initialState = { events: {}, published: { byId: {}, byCat: {} }, drafts: {} }

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
        case LOAD_PUBLISHED_EVENTS_BY_CAT:
            newState = { ...state };
            newState.published.byCat[action.catId] = action.events.reduce((events, event) => {
                events[event.id] = event.id;
                return events
            }, {});
            return newState;
        case LOAD_PUBLISHED_EVENTS:
            newState = { ...state };
            newState.published.byId = action.events.reduce((events, event) => {
                events[event.id] = event.id;
                return events;
            }, {});
            return newState;
        case LOAD_DRAFT_EVENTS:
            newState = { ...state };
            newState.drafts.byId = action.events.reduce((events, event) => {
                events[event.id] = event.id;
                return events;
            }, {});
            return newState;
        case ADD_PUBLISHED_EVENT:
            newState = { ...state };
            console.log(action.newEvent.categoryId, action.newEvent.Category)
            newState.events = { ...state.events, [action.newEvent.id]: action.newEvent };
            newState.published.byId[action.newEvent.id] = action.newEvent.id;
            return newState;
        case ADD_DRAFT_EVENT:
            newState = { ...state };
            newState.events = { ...state.events, [action.newEvent.id]: action.newEvent };
            newState.drafts.byId[action.newEvent.id] = action.newEvent.id;
            return newState;
        case REMOVE_PUBLISHED_EVENT:
            newState = { ...state };
            newState.events = { ...state.events };

            delete newState.events[action.eventId];
            delete newState.published.byId[action.eventId];
            return newState;
        case REMOVE_DRAFT_EVENT:
            newState = { ...state };
            newState.events = { ...state.events };

            delete newState.events[action.eventId];
            delete newState.drafts.byId[action.eventId];
            return newState;
        default:
            return state;
    }
};

export default eventReducer;
