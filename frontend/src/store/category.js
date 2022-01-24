import { csrfFetch } from "./csrf";

const LOAD_CATEGORIES = 'event/loadCategories';
const LOAD_EVENTS_BY_CAT = 'event/loadEventsByCat';

// action creators
export const loadCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
};

export const loadEventsByCat = (events, catId) => {
    return {
        type: LOAD_EVENTS_BY_CAT,
        events,
        catId
    }
};

// thunk action creators
export const getAllCategories = () => async (dispatch) => {
    const res = await csrfFetch('/api/categories');

    const data = await res.json();
    dispatch(loadCategories(data));
};

export const getPublishedByCat = (catId) => async (dispatch) => {
    const res = await csrfFetch(`/api/categories/${catId}/events`);

    const data = await res.json();
    dispatch(loadEventsByCat(data, catId));
};

// initial state
const initialState = { categories: {}, events: {} };

// category reducer
const categoryReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_CATEGORIES:
            newState = { ...state };
            newState.categories = action.categories.reduce((categories, category) => {
                categories[category.id] = category;
                return categories;
            }, {});
            return newState;
        case LOAD_EVENTS_BY_CAT:
            newState = { ...state };
            newState.events[action.catId] = action.events.map((event) => {
                return event.id;
            }, {});
            return newState;
        default:
            return state;
    }
};

export default categoryReducer;
