import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUpPage from './components/SignUpPage/SignUpPage';

const App = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<SignUpPage />}></Route>
    </Routes>
  )
}

export default App