const LOAD_EVENTS = 'events/getEvents';

// action creators
export const loadEvents = (events) => {
    return {
        type: LOAD_EVENTS,
        events
    }
}

// thunk action creators
export const getAllEvents = () => async (dispatch) => {
    const res = await fetch('/api/events');

    if (res.ok) {
        const data = await res.json();
        dispatch(loadEvents(data));
    } else {
        throw res;
    }
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
        default:
            return state;
    }
}

export default eventReducer;
