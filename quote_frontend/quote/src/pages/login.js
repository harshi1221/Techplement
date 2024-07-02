// importing necessary modules from corresponding packages
import React, { useState } from 'react'
import '../Styles/signup.css'
import { API_BASE_URL } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";

const Login = () => {
    // defining state variables for username, password
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // initializing the dispatch , navigate functions to dispatch redux actions and navigating to different routes respectively
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    // function for handling login form submission
    const loginForm = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            // created a post request connected to backend with same endpoint to make use of request data
            const request = { userName, password };
            const response = await axios.post(`${API_BASE_URL}/login`, request);
            // storing the token and user information to local storage if succesful login
            if (response.status === 200) {
                localStorage.setItem('token', response.data.result.token);
                localStorage.setItem('user', JSON.stringify(response.data.result.user));
                // Dispatching a LOGIN_SUCCESS action with user data to Redux store and smoothly navigates to home page
                dispatch({ type: "LOGIN_SUCCESS", payload: response.data.result.user });
                setLoading(false);
                navigate('/home');

            }
            setUserName('');
            setPassword('');

        } catch (error) {
            console.log(error);
            setLoading(false);
            // displaying an error occured with sweetalert if there is an error 
            Swal.fire({
                icon: 'error',
                title: 'some error occured please try again'
            })
        }
    }
    return (
        <div>
            {/* created a container that includes form having various different input fields  */}
            <div className='container shadow w-50 mx-auto p-4 w-25'>
                <h3 className='text-center fw-bold'>Login</h3>
                <form onSubmit={(e) => { loginForm(e) }}>
                    {/* input field for username */}
                    <div className='mb-3'>
                        <label htmlFor="InputUserName" className='form-label' >UserName</label>
                        <input type='text' className='form-control' id='InputUserName' placeholder='Enter your UserName' value={userName}
                            onChange={(e) => setUserName(e.target.value)}></input>
                    </div>
                    <div className='mb-3'>
                        {/* input field for password */}
                        <label htmlFor="InputPassword" className='form-label'>Password</label>
                        <input type='password' className='form-control' id='InputPassword' placeholder='Enter your Passowrd' value={password}
                            onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    {/* created a condition which says Loading spinner or login button based on loading state */}
                    <div className='mt-2 mb-2'>
                        {loading ? (
                            <div className='col-md-12 mt-3 text-center'>
                                <div className="spinner-border text-primary" role="status">
                                </div>
                            </div>
                        ) : (
                            <button type='submit' className='btn btn-secondary loginbtn'>Login</button>
                        )}
                    </div>
                    {/* Link to signup page */}
                    <div className='mb-4 mt-4'>
                        <span className='text-muted fs-6'>Don't have an account?</span>
                        <Link to='/signup' className='fw-bold ms-1 signup'>SignUp</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login