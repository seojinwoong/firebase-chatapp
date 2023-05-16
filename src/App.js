import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUpPage from './components/SignUpPage/SignUpPage';
import LoginPage from './components/LoginPage/LoginPage';

const App = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<SignUpPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  )
}

export default App