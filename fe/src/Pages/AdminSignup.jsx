import React from "react";
import axios from "axios";

const AdminSignup = () => {
    // Function to handle Admin Signup on button click
    const handleAdminSignup = async () => {
        try {
            const response = await axios.get("http://localhost:4040/admin/create");

            if (response.status === 200) {
                alert("Admin created successfully!");
                window.location.href = "/admin-login"; // Redirect to login page
            } else {
                alert("Failed to create admin. Please try again.");
            }
        } catch (error) {
            alert("Error creating admin: " + error.message);
        }
    };

    return (
        <div className="AdminSignupPage w-full h-screen flex justify-center items-center bg-[#dadada]">
            <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Admin Signup</h2>
                <p className="text-center text-gray-600 mb-4">
                    Click the button below to create an admin user.
                </p>
                <button
                    onClick={handleAdminSignup}
                    className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700"
                >
                    Create Admin
                </button>
            </div>
        </div>
    );
};

export default AdminSignup;
