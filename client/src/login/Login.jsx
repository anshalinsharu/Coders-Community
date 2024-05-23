import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../App.css";

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        role: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = await validate(values);
        setErrors(validationErrors);

        if (Object.values(validationErrors).every(error => error === "")) {
            try {
                const res = await axios.post('http://localhost:8080/login', values);
                if (res.data === "ADMIN") {
                    navigate('/home');
                } else if (res.data === "USER") {
                    navigate('/user');
                } else {
                    alert("Login failed");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email is invalid";
        }

        if (!values.password) {
            errors.password = "Password is required";
        }

        if (!values.role) {
            errors.role = "Role is required";
        }

        return errors;
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Log in to your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            onChange={handleInput}
                            name="email"
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400"
                        />
                        {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Choose Role</label>
                        <select
                            onChange={handleInput}
                            name="role"
                            className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400"
                        >
                            <option value="">Select</option>
                            <option value="admin">Admin</option>
                            <option value="normaluser">Student</option>
                        </select>
                        {errors.role && <span className="text-sm text-red-500">{errors.role}</span>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            onChange={handleInput}
                            name="password"
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400"
                        />
                        {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Log in
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;

