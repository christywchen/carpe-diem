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

export const removeRegistration = (registrationId) => {
    return {
        type: REMOVE_REGISTRATION,
        registrationId
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
// initial state
const initialState = { registrations: {} }

// registration reducer
const registrationReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_REGISTRATIONS:
            newState = { ...state };
            newState.registrations = action.registrations.reduce((registrations, registration) => {
                registrations[registration.id] = registration;
                console.log('REGISTRRIOATNS', registrations)
                return registrations;
            }, {});
            return newState;
        case ADD_REGISTRATION:
            newState = { ...state };
            newState.registrations = { ...state.registrations, [action.newRegistration.id]: action.newRegistration };
            return newState;
        default:
            return state;
    }
};

export default registrationReducer;
