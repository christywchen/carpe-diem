import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Navigation from './components/Navigation';
import UserDashboard from './components/Dashboard/DashboardMain';
import EventsMain from './components/Events/EventsMain'
import EventDetails from './components/Events/EventDetails';
import EventCreate from './components/Events/EventCreate';
import EventEdit from './components/Events/EventEdit';
import PageNotFound from './components/PageNotFound';
import Footer from "./components/Footer";

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
      <Navigation isLoaded={isLoaded} />
      <div id='container'>
        {isLoaded && (
          <div id='main'>
            <Routes>
              <Route path='/' element={<Navigate to='/categories/all/events' />} />
              <Route path='/*' element={<EventsMain />} />
              <Route path='*' element={<Navigate to='/not-found' />} />
              <Route path='/dashboard/*' element={<UserDashboard />} />
              <Route path='/events/new' element={<EventCreate />} />
              <Route path='/events/:eventId' element={<EventDetails />} />
              <Route path='/events/:eventId/edit' element={<EventEdit />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignUpPage />} />
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
