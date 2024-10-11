import React, { useEffect } from 'react';
import Home from './pages/Home';
import './index.css';
import AllTasks from './pages/AllTasks';
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import IncompletedTasks from './pages/IncompletedTasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { Routes, Route, useNavigate } from 'react-router-dom';
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // Allow access to /signup and /login even if not logged in
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login()); // Dispatch the login action if the token exists
    }
  }, [dispatch]); // Include 'dispatch' as a dependency

  useEffect(() => {
    // Redirect to signup if not logged in and not on the signup/login page
    if (!isLoggedIn && window.location.pathname !== '/signup' && window.location.pathname !== '/login') {
      navigate('/signup');
    }
  }, [isLoggedIn, navigate]); // Check the login status and navigate accordingly

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="importantTasks" element={<ImportantTasks />} />
          <Route path="completedTasks" element={<CompletedTasks />} />
          <Route path="incompletedTasks" element={<IncompletedTasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;




