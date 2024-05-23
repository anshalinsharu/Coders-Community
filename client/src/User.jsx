import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logoImage from './Images/Logo.webp';
import errorImage from './Images/Error.png';

function User() {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Fetch the logged-in user details
        axios.get('http://localhost:8080/user')
            .then(response => {
                setLoggedInUser(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the user details!", error);
            });
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', name);
        formData.append('email', email);

        axios.post('http://localhost:8080/upload', formData)
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log("Succeeded");
                } else {
                    console.log("Failed");
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div>
            <nav className="bg-gray-800 py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img 
                            src={logoImage} 
                            alt="Logo Icon"
                            className="w-8 h-8 mr-2"
                        />
                        <a href="#" className="text-white text-lg font-bold">User Dashboard</a>
                    </div>
                    {/* <div>
                        {loggedInUser && <span className="text-white text-xl">{loggedInUser.name}</span>}
                    </div> */}
                </div>
            </nav>
            <div className="flex h-screen">
                <div className="w-1/2">
                    <img 
                        src={errorImage} 
                        alt="Error Image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-1/2 flex items-center justify-center bg-white">
                    <div className="max-w-md p-8 rounded-lg shadow-md">
                        <div className="text-center mb-6">
                            <img 
                                src={logoImage} 
                                alt="Logo Icon"
                                className="mx-auto w-16 h-16 mb-4"
                            />
                            <h2 className="text-2xl font-bold">Upload your queries and errors here!!</h2>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Upload Image</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                        <button
                            onClick={handleUpload}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
            <nav className="bg-darkblue p-4 mt-8">
                <div className="container mx-auto flex justify-center">
                    <span className="text-white text-sm">&copy; 2023 User Dashboard</span>
                </div>
            </nav>
        </div>
    );
}

export default User;
