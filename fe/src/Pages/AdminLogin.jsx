// File: src/pages/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4040/admin/login", { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
            if (response.status === 200) {
                alert("Admin Logged in successfully");
                navigate("/admin-dashboard");
            } else {
                setErrorMessage("Unexpected response status");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="AdminSignupPage w-full h-screen flex justify-center items-center bg-[#dadada]">
            <div className="w-full max-w-sm mx-auto mt-20 bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Admin Login</h2>
                {errorMessage && (
                    <div className="text-red-600 text-center text-sm my-2">{errorMessage}</div>
                )}
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm focus:ring-black-500 focus:border-black-500 focus:outline-none"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm focus:ring-black-500 focus:border-black-500 focus:outline-none"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
