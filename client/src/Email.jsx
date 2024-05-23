import React, { useState } from 'react';
import axios from 'axios';
import LogoImage from './Images/Logo.webp'; // Import the Logo image

const Email = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSendEmail = () => {
        axios.get('http://localhost:8080/email', {
            params: {
                name: name,
                email: email,
                message: message
            }
        })
        .then(res => {
            alert("Email sent Successfully");
            setResponse(res.data);
            setName('');
            setEmail('');
            setMessage('');
        })
        .catch(err => {
            console.error(err);
            setResponse('Failed to send email');
        });
    };

    return (
        <div className="min-h-screen bg-gray-200">
            <nav className="bg-gray-800 py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img src={LogoImage} alt="Logo" className="h-8 mr-2" /> {/* Use the Logo image */}
                        <a href="#" className="text-white text-lg font-bold">Email Sender</a>
                    </div>
                    <div>
                        <a href="#" className="text-white">About</a>
                    </div>
                </div>
            </nav>
            <div className="flex justify-center items-center h-full">
                <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white p-8 rounded shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Send Email</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Name:</label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Email:</label>
                        <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Message:</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none" value={message} onChange={e => setMessage(e.target.value)} />
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSendEmail}>Send Email</button>
                    </div>
                    {response && <p className="mt-4">{response}</p>}
                </div>
            </div>
        </div>
    );
};

export default Email;
