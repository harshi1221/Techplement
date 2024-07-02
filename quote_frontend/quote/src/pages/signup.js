// importing necessary modules from corresponding packages
import React, { useState } from 'react'
import '../Styles/signup.css'
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
    // defining the state variables for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // defining navigate function for different routes, loading function to handle loading functionality based on state
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    // function to handle the signup functionality
    const signupForm = async (event) => {
        event.preventDefault();
        setLoading(true);
        const request = { name, email, userName, password }
        try {
            // created a POST request to the signup endpoint with the request data
            const result = await axios.post(`${API_BASE_URL}/signup`, request)

            // This tells if the signup is successful, display a success message
            if (result.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'User successfully registered'
                });
                // after succesfull signup  smoothly navigates to login page
                navigate('/login');
            }
            // Resetting the form input fields to original state
            setName('');
            setEmail('');
            setUserName('');
            setPassword('');
        } catch (err) {
            // displaying an error message in console
            console.log(err);
            setLoading(false);
            // displaying an error occured with sweetalert if there is an error 
            Swal.fire({
                icon: 'error',
                title: 'Some error occured please try again'
            })
        }
    }


    return (
        <div>
            {/* creating a container that includes form having various different input fields */}
            <div className='container shadow w-25 mx-auto p-4'>
                <h3>SignUp</h3>
                <form onSubmit={(e) => { signupForm(e) }} className='mt-3'>
                    {/* input field for full name */}
                    <div className='mb-3'>
                        <label htmlFor="InputFullName" className='form-label'><strong>Name</strong></label>
                        {/* binding the input value to the state variable and event onchange updates the value's state */}
                        <input type='text' className='form-control' id="InputFullName" placeholder='Enter your Full Name' value={name}
                            onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className='mb-3'>
                        {/* input field for email */}
                        <label htmlFor="InputEmail" className='form-label'><strong>Email</strong></label>
                        <input type='email' className='form-control' id="InputEmail" placeholder='Enter your Email Id' value={email}
                            onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    {/* input field for username */}
                    <div className='mb-3'>
                        <label htmlFor="InputUserName" className='form-label'><strong>UserName</strong></label>
                        <input type='text' className='form-control' id="InputUserName" placeholder='Enter your UserName' value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    {/* input field for password */}
                    <div className='mb-3'>
                        <label htmlFor="InputPassword" className='form-label'><strong>password</strong></label>
                        <input type='password' className='form-control' id="InputPassword" placeholder='Enter your password' value={password}
                            onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    {/* button to submit the form */}
                    <div className='mt-2 mb-2'>
                        {loading ? (
                            // if loading is true, shows the spinner to state about laoding status
                            <div className='col-md-12 mt-3 text-center'>
                                <div className="spinner-border text-primary" role="status">
                                </div>
                            </div>
                        ) : (
                            // if loading is false, shows signup button
                            <button type='submit' className='btn btn-block btn-secondary signupbtn'>SignUp</button>
                        )}
                    </div>
                    
                    {/* Displaying a text prompt asking if the user has signed up and if not, provided a link to navigate to login page*/}
                    <div className='mb-4 mt-2'>
                        <span className='text-muted fs-6'>Already have an account?</span>
                        <Link to='/login' className='ms-1 fw-bold login'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

// exporting the signup to use it in the application
export default Signup