import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Home from './pages/Home.js';
import Contribute from './pages/contribute.js';


function App() {
  function DynamicRouting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect hook to check user authentication on component mount
    useEffect(() => {
      // Retrieving  user data from local storage
      const userData = JSON.parse(localStorage.getItem("user"));
      console.log('userData app.js: ', userData);
      // Checking if user data exists
      if (userData) {
        // Dispatch a Redux action for successful login and navigate to the home page
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        navigate('/home');
      } else {
        // if condition is false, removing the token,user data from local storage.
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // dispatching login error and navigating to login page
        dispatch({ type: "LOGIN_ERROR" });
        navigate('/login');
      }
    }, [])


    return (
      // routes for various paths
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/signup' element={<Signup />}></Route>
        <Route exact path='/home' element={<Home />}></Route>
        <Route exact path='/contribute' element={<Contribute />}></Route>
      </Routes>
    )
  }
  return (
    <div className='app-bg'>
      <Router>
        <DynamicRouting />
      </Router>
    </div>
  );
}

export default App;
