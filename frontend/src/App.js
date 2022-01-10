import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginFormModal';
import SignUpForm from './components/SignUpFormModal';
import Navigation from './components/Navigation';
import Footer from "./components/Footer";
import Events from './components/EventsPage'
import EventDetails from './components/EventDetails';
import EditEvent from './components/EditEvent';
import PageNotFound from './components/PageNotFound';

import * as sessionActions from "./store/session";

import './App.css';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div id='container'>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <div id='main'>
            <Routes>
              <Route path='*' element={<Navigate to='/not-found' />} />
              <Route path='/' element={<Navigate to='/events' />} />
              <Route path='/events' element={<Events />} />
              <Route path='/events/:eventId' element={<EventDetails />} />
              <Route path='/events/:eventId/edit' element={<EditEvent />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/signup' element={<SignUpForm />} />
              <Route path='/not-found' element={<PageNotFound />} />
            </Routes >

            <Footer />
          </div>
        )}

      </div>
    </>
  );
}

export default App;
