import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/Modals/LoginFormModal';
import SignUpForm from './components/Modals/SignUpFormModal';
import Navigation from './components/Navigation';
import UserDashboard from './components/Dashboard/DashboardMain';
import Events from './components/Events/EventsPage'
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
              <Route path='/' element={<Navigate to='/events' />} />
              <Route path='/events' element={<Events />} />
              <Route path='*' element={<Navigate to='/not-found' />} />
              {/* <Route path='/dashboard' element={<UserDashboard />} /> */}
              {/* <Route path='/dashboard' element={<Navigate to='/dashboard/events/all' />} /> */}
              <Route path='/dashboard/*' element={<UserDashboard />} />
              <Route path='/events/new' element={<EventCreate />} />
              <Route path='/events/:eventId' element={<EventDetails />} />
              <Route path='/events/:eventId/edit' element={<EventEdit />} />
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
