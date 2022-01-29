import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import eventReducer from './event';
import categoryReducer from './category';
import venueReducer from './venue';
import registrationReducer from './registration';

const rootReducer = combineReducers({
    session: sessionReducer,
    event: eventReducer,
    category: categoryReducer,
    venue: venueReducer,
    registration: registrationReducer
});

let enhancer;

// set enhancer to different store enhancers depending on node enviornment
if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
