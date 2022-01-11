import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { ModalProvider } from "./context/Modal";
import reportWebVitals from './reportWebVitals';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';

import * as sessionActions from './store/session';
import * as eventActions from './store/event';
import * as categoryActions from './store/category';
import * as venueActions from './store/venue';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch; // attach the csrfFetch function onto the window
  window.store = store;
  window.sessionActions = sessionActions;
  window.eventActions = eventActions;
  window.categoryActions = categoryActions;
  window.venueActions = venueActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
