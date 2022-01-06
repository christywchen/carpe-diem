import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginForm from './components/LoginForm';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginForm />} />
    </Routes >
  );
}

export default App;
