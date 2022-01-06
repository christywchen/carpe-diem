import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import * as sessionActions from "./store/session";

import logo from './logo.svg';
import './App.css';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Routes>
      <Route path='/login' element={<LoginForm />} />
      <Route path='/signup' element={<SignUpForm />} />
    </Routes >
  );
}

export default App;
