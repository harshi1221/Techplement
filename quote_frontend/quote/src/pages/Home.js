import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NavBar from '../components/NavBar'
import '../Styles/home.css'
import { API_BASE_URL } from '../config'


const Home = () => {
    // defining state variables for quote and author functions, search author quotes
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [QuotesAuthor, setQuotesAuthor] = useState([]);
    const [searchAuthor, setSearchAuthor] = useState('');

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    // Initial fetch of a random quote when component mounts
    useEffect(() => {
        RandomQuote();
    }, []);

    // function to fetch random quote
    const RandomQuote = async () => {
        try {
            // making a get request to fetch random quote
            const response = await axios.get(`${API_BASE_URL}/randomquote`, CONFIG_OBJ);
            // setting the fetched content and author in state
            setQuote(response.data.content);
            setAuthor(response.data.author);
        } catch (error) {
            console.error('Error fetching random quote', error);
        }
    };


    // function to fetch quote by a specific author
    const QuotesByAuthor = async (author) => {
        try {
            // making a get request to fetch all quotes of the author
            const response = await axios.get(`${API_BASE_URL}/quote/${author}`, CONFIG_OBJ);
            // setting the fetched content and author in state
            setQuotesAuthor(response.data);
        } catch (error) {
            console.error('Error fetching quotes by author', error);
        }
    };



    return (
        <div>
            {/* Rendering the navabr component which is defined in component file */}
            <div><NavBar /></div>
            {/* created a container which displays the random quote along with author name and container is placed at center to the page*/}
            <div className='container mb-2 mx-auto d-flex flex-column justify-content-center'>
                <div className='flex flex-column text-center p-4 '>
                    <h2 className='fw-bold'>Quote of the Day</h2>
                    <p className='fs-3 my-3'>"{quote}"</p>
                    <p className="text-lg mb-4">- {author}</p>
                    <button onClick={RandomQuote} className="getQuote btn px-4 py-2  " type='button'>
                        Get Quote
                    </button>
                </div>
            </div>

            {/* created a container which includes search input and button */}
            <div className='container mt-4 mx-auto p-2 flex flex-column justify-content-center text-center'>
                <div className='flex flex-row items-center justify-content-between'>
                    {/* input field for author to search */}
                    <input
                        type="text"
                        value={searchAuthor}
                        onChange={(e) => setSearchAuthor(e.target.value)}
                        placeholder="Search by author"
                        className="border p-2 rounded max-w-md w-full mb-2"
                    />
                    {/* a button for fetching all quotes of the author searched by the user with onclick event*/}
                    <button
                        onClick={() => QuotesByAuthor(searchAuthor)}
                        className=" px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </div>
                {/* Displaying all quotes of the author searched by the user */}
                <div className="mt-6">
                    {QuotesAuthor.length > 0 && (
                        <div >
                            <h2 className="text-xl font-bold mb-4">Quotes by {searchAuthor}</h2>
                            <ul>
                                {QuotesAuthor.map((quo, index) => (
                                    <li key={index} className="mb-2">"{quo.content}"</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>


    )
}

export default Home