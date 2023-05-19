import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUpPage from './components/SignUpPage/SignUpPage';
import LoginPage from './components/LoginPage/LoginPage';
import ChatPage from './components/ChatPage/ChatPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './redux/actions/user_action';
import Loader from './utils/components/Loader';

const App = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user_reducer.isLoading);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser(user));
        navigate('/');
      } else {
        dispatch(clearUser());
        navigate('/login');
      }
    })
  }, []);

  if (isLoading) {
    return (
      <Loader />
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    )
  }
}

export default App