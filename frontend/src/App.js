import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from 'react-router-dom';

import LoginForm from './components/LoginFormModal';
import SignUpForm from './components/SignUpFormModal';
import Navigation from './components/Navigation';
import Footer from "./components/Footer";
import Events from './components/EventsPage'
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
              <Route path='/' element={<Events />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/signup' element={<SignUpForm />} />
            </Routes >
            <Footer />
          </div>
        )}

      </div>
    </>
  );
}

export default App;
