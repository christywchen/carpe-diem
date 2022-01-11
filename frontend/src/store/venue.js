import { csrfFetch } from "./csrf";

const LOAD_VENUES = 'venue/loadVenues';
const ADD_VENUE = 'venue/addVenue';
const EDIT_VENUE = 'venue/editVenue';

// action creators
export const loadVenues = (venues) => {
    return {
        type: LOAD_VENUES,
        venues
    }
};

export const addVenue = (newVenue) => {
    return {
        type: ADD_VENUE,
        newVenue
    }
};

export const editVenue = (venueId, updatedVenue) => {
    return {
        type: EDIT_VENUE,
        venueId,
        updatedVenue
    }
};

// thunk action creators
export const getVenue = () => async (dispatch) => {
    const res = await csrfFetch(`/api/venues`);

    const data = await res.json();
    dispatch(loadVenues(data));
};

export const createVenue = (published, newVenue) => async (dispatch) => {
    const res = await csrfFetch('/api/venues', {
        method: 'POST',
        body: JSON.stringify(newVenue)
    });

    const data = await res.json();
    if (published) dispatch(addVenue(data));
    return data;
};

export const updateVenue = (venueId, updatedVenue) => async (dispatch) => {
    const res = await csrfFetch(`/api/venues/${venueId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedVenue)
    });

    const data = await res.json();
    dispatch(editVenue(data));
    return data;
};

// initial state
const initialState = { venues: {} }

// venue reducer
const venueReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_VENUES:
            newState = { ...state };
            newState.venues = action.venues.reduce((venues, venue) => {
                venues[venue.id] = venue;
                return venues;
            }, {});
            return newState;
        case ADD_VENUE:
            newState = { ...state };
            newState.venues = { ...newState.venues, [action.newVenue.id]: action.newVenue };
            return newState;
        case EDIT_VENUE:
            newState = { ...state };
            newState.venues[action.venueId] = action.updatedVenue;
            return newState;
        default:
            return state;
    }
};

export default venueReducer;
