// imported necessary modules ftom corresponding packages
import React, { useState } from 'react'
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2'
import NavBar from '../components/NavBar';

const Contribute = () => {
    const [loading, setLoading] = useState(false);
    // defining state variables of input fields of the form
    const [addQuoteContent, setAddQuoteContent] = useState('');
    const [addQuoteAuthor, setAddQuoteAuthor] = useState('');

    
    // configuration for user authentication
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    // created a functionality responsible for handling form submission
    const AddQuote = async (event) => {
        // Prevents the default behaviour of the event
        event.preventDefault();
        setLoading(true);
        try {
            // created a post request connected to backend with same endpoint to make use of request
            const newQuote = { content: addQuoteContent, author: addQuoteAuthor };
            const response = await axios.post(`${API_BASE_URL}/addquote`, newQuote, CONFIG_OBJ);
            // Displaying the success message with sweetalert after successful response
            if (response.status === 200) {
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Quote successfully added'
                });
                setAddQuoteContent('');
                setAddQuoteAuthor('');
            }
        } catch (error) {
            console.error('Error adding new quote', error);
            setLoading(false);
            if(error.response.data == 'Quote already exists'){
                Swal.fire({
                    icon: 'error',
                    title: 'Quote already exists',
                    text: `The quote by ${addQuoteAuthor} already exists.`,
                })
            }
            // displaying an error occured with sweetalert if there is an error 
            Swal.fire({
                icon: 'error',
                title: 'Failed to add quote, please try again'
            });
        }
    };
    return (
        <div>
            {/* Rendering navbar component */}
            <div><NavBar /></div>
            {/* created a container div placed at center includes form having different input fields responsible for handling adding quote,author */}
            <div className='container mx-auto shadow p-4'>
                <h3 className='text-center'>Add Quote</h3>
                <form onSubmit={(e) => AddQuote(e)} className='mt-3'>
                    {/* input field for adding new quote */}
                    <div className="mb-3">
                        <label htmlFor="InputTextarea" className="form-label">Quote</label>
                        <input
                            type="text"
                            value={addQuoteContent}
                            onChange={(e) => setAddQuoteContent(e.target.value)}
                            className="form-control"
                            placeholder='Write Quote..'
                            id="InputTextarea"
                            rows="3"></input>
                    </div>
                    {/* input field responsible for adding corresponding author of new quote */}
                    <div className='mb-3'>
                        <label htmlFor='InputAuthor' className='form-label'>Author</label>
                        <input
                            value={addQuoteAuthor}
                            onChange={(e) => setAddQuoteAuthor(e.target.value)}
                            type="text"
                            id='InputAuthor'
                            placeholder="Author"
                            className="form-control border p-2 rounded max-w-md w-full mb-2"></input>
                    </div>
                    {/* created a condition which says Loading spinner or login button based on loading state  */}
                    <div className=' mb-2'>
                        {loading ? (
                            <div className='col-md-12 mt-3 text-center'>
                                <div className="spinner-border text-primary" role="status">
                                </div>
                            </div>
                        ) : (
                            <button type='submit' className='btn btn-block btn-secondary signupbtn'>Add</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contribute