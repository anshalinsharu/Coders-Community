import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logoImage from './Images/Logo.webp'; // Importing the logo image
import { useNavigate } from 'react-router-dom';

function Home() {
    const [uploads, setUploads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/uploads')
            .then(response => {
                setUploads(response.data);
            })
            .catch(error => {
                console.error('Error fetching uploads:', error);
            });
    }, []);

    return (
        <div>
            {/* Navbar */}
            <nav className="bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <img src={logoImage} alt="Logo" className="h-8" /> {/* Using the logo image */}
                            <span className="text-white text-lg ml-2">Admin Dashboard</span>
                        </div>
                        <div className="flex">
                            <button
                                onClick={() => navigate('/email')}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Send Review
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Uploaded Images</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {uploads.map((upload, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{upload.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{upload.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a href={`http://localhost:8080/images/${upload.image}`} target="_blank" rel="noopener noreferrer">
                                            <img src={`http://localhost:8080/images/${upload.image}`} alt={upload.name} className="h-12 w-12 rounded-full cursor-pointer" />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;
