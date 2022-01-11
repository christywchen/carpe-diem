import { csrfFetch } from "./csrf";

const LOAD_CATEGORIES = 'event/loadCategories';

// action creators
export const loadCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
};

// thunk action creators
export const getAllCategories = () => async (dispatch) => {
    const res = await csrfFetch('/api/categories');

    const data = await res.json();
    dispatch(loadCategories(data));
};

// initial state
const initialState = { categories: {} };

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
        default:
            return state;
    }
};

export default categoryReducer;
