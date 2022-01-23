import { csrfFetch } from "./csrf";

const LOAD_REGISTRATION = 'event/loadRegistration';
const ADD_REGISTRATION = 'event/addRegistration';
const REMOVE_REGISTRATION = 'event/removeRegistration';

// action creators
export const loadRegistration = (registration) => {
    return {
        type: LOAD_REGISTRATION,
        registration
    }
}

export const addRegistration = (newRegistration) => {
    return {
        type: ADD_REGISTRATION,
        newRegistration
    }
}

export const removeRegistration = (registrationId) => {
    return {
        type: REMOVE_REGISTRATION,
        registrationId
    }
}

// thunk action creators
export const getAllRegistrations = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/registrations/${userId}/events/all`);

    const data = await res.json();
    dispatch(loadRegistration(data));
}

// initial state
const initialState = { registrations: {} }

// registration reducer
const registrationReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_REGISTRATION:
            newState = { ...state };
            newState.registrations = action.registrations.reduce((registrations, registration) => {
                registrations[registration.id] = registration;
                return registrations;
            }, {});
        default:
            return state;
    }
};

export default registrationReducer;
