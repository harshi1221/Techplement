// importing necessary modules from corresponding packages
import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import '../Styles/navbar.css'


const NavBar = () => {
    // initializing the dispatch for different dispatch actions and navigate function for navigation to different routes
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // creating logout functionality , corresponding token and user will be removed from the storage and smootly navigates to login page
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: "LOGIN_ERROR" });
        navigate('/login');
    }

    return (
        <div>
            {/* created a navbar containing heading, home, contribute, logout navlinks */}
            <nav className='navbar navbar-expand-md navbar-expand-lg navbar-light bg-dark '>
                <div className='container-fluid'>
                    <NavLink to='/home' className='navbar-brand' id='header' href='head'><strong className='text-lg text-white fs-2'>Quote Generator</strong></NavLink>
                    {/* a button for toggling the navbar for smaller screens */}
                    <button className="navbar-toggler btn btn-outline-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* collapsable part of the navbar */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav ms-auto">
                            <NavLink to='/home' className='nav-link me-2 my-1'>
                                <button className='btn btn-outline-light' type='button'>Home</button>
                            </NavLink>
                            <NavLink to='/contribute' className='nav-link me-2 my-1'>
                                <button className='btn btn-outline-light' type='button'>Add</button>
                            </NavLink>
                            {/* a button for logout functionality */}
                            <a className="nav-link me-2 my-1" style={{ 'textDecoration': 'none' }} href='logout'>
                                <button onClick={() => logout()} className="btn btn-outline-light " id="loginID" type="button" aria-label="Login">Logout</button>
                            </a>
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default NavBar