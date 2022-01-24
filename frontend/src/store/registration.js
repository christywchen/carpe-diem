import { csrfFetch } from "./csrf";

const LOAD_REGISTRATIONS = 'event/loadRegistrations';
const ADD_REGISTRATION = 'event/addRegistration';
const REMOVE_REGISTRATION = 'event/removeRegistration';

// action creators
export const loadRegistrations = (registrations) => {
    return {
        type: LOAD_REGISTRATIONS,
        registrations
    }
}

export const addRegistration = (newRegistration) => {
    return {
        type: ADD_REGISTRATION,
        newRegistration
    }
}

export const removeRegistration = (eventId) => {
    return {
        type: REMOVE_REGISTRATION,
        eventId
    }
}

// thunk action creators
export const getRegistrations = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/events/registered`);

    const data = await res.json();
    dispatch(loadRegistrations(data));
}

export const createRegistration = (newRegistration) => async (dispatch) => {
    const res = await csrfFetch('/api/registrations', {
        method: 'POST',
        body: JSON.stringify(newRegistration)
    });

    const data = await res.json();
    dispatch(addRegistration(data));
    return data;
}

export const deleteRegistration = (userId, eventId) => async (dispatch) => {
    await csrfFetch(`/api/registrations/events/${eventId}/users/${userId}`, {
        method: 'DELETE'
    });

    dispatch(removeRegistration(eventId));
}

// initial state
const initialState = { registrations: {} }

// registration reducer
const registrationReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_REGISTRATIONS:
            newState = { ...state };
            newState.registrations = action.registrations.reduce((registrations, registration) => {
                registrations[registration.eventId] = registration;
                return registrations;
            }, {});
            return newState;
        case ADD_REGISTRATION:
            newState = { ...state };
            newState.registrations = { ...state.registrations, [action.newRegistration.eventId]: action.newRegistration };
            return newState;
        case REMOVE_REGISTRATION:
            newState = { ...state };
            delete newState.registrations[action.eventId];
            return newState;
        default:
            return state;
    }
};

export default registrationReducer;
