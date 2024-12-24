// File: src/pages/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [prodCount, setProdCount] = useState(0);
    const [categCount, setCategCount] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        stock: "",
        image: null,
    });

    const [deleteProductId, setDeleteProductId] = useState("");
    const [categoryName, setCategoryName] = useState("");



    const getCookie = (name) => {
        const cookieArr = document.cookie.split(";");
        for (const cookie of cookieArr) {
            const trimmed = cookie.trim();
            if (trimmed.startsWith(name + "=")) {
                return trimmed.substring(name.length + 1);
            }
        }
        return null;
    };

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = getCookie("token");
                if (!token) {
                    navigate("/admin-login");
                    return;
                }

                const response = await axios.get(`http://localhost:4040/admin/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                setProdCount(response.data.prodcount || 0);
                setCategCount(response.data.categcount || 0);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data. Please log in again.");
            }
        };

        fetchDashboardData();
    }, [navigate]);

    // Handle product form submission
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getCookie("token");
            console.log(token)
            if (!token) {
                alert("You need to log in.");
                navigate("/admin-login");
                return;
            }
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            await axios.post(`http://localhost:4040/products`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                });

            alert("Product created successfully!");
            setFormData({
                name: "",
                price: "",
                category: "",
                description: "",
                stock: "",
                image: null,
            });
            setProdCount((prev) => prev + 1);
        } catch (error) {
            alert("Error creating product: " + error.message);
        }
    };

    // Handle product deletion
    const handleProductDelete = async (e) => {
        e.preventDefault();
        try {
            const token = getCookie("token");
            await axios.post(
                `http://localhost:4040/products/delete`,
                { product_id: deleteProductId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            alert("Product deleted successfully!");
            setProdCount((prev) => Math.max(prev - 1, 0));
            setDeleteProductId("");
        } catch (error) {
            alert("Error deleting product: " + error.message);
        }
    };

    // Handle category creation
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getCookie("token");
            await axios.post(
                `http://localhost:4040/categories/create`,
                { name: categoryName },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                },
            );

            alert("Category created successfully!");
            setCategoryName("");
            setCategCount((prev) => prev + 1);
        } catch (error) {
            alert("Error creating category: " + error.message);
        }
    };

    return (
        <div className="w-full h-[100%] py-[10vh] bg-[#dadada]">
            <div className="max-w-7xl mx-auto p-4">
                <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>

                {error && (
                    <div className="text-red-600 text-center mb-4">
                        {error}{" "}
                        <a href="/admin-login" className="text-blue-600 underline">
                            Login
                        </a>
                    </div>
                )}

                <div className="mb-8 bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 mx-[20vw] ">
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                            <h3 className="text-lg font-medium text-gray-600">Total Products</h3>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{prodCount}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                            <h3 className="text-lg font-medium text-gray-600">Total Categories</h3>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{categCount}</p>
                        </div>
                        {/* <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-600">New Orders</h3>
                        <p className="mt-2 text-2xl font-bold text-gray-900">30</p>
                    </div> */}
                    </div>
                    <div className="w-full m-auto mt-4 flex justify-center">
                        <Link to="/admin-products"><button className="w-[100%] py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500">Go To Admin's Product Page</button></Link>
                    </div>
                </div>

                {/* Forms Section */}
                <div className="w-[full] gap-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Manage Products</h2>
                        <form onSubmit={handleProductSubmit} className="mt-4">
                            <h3 className="text-lg font-medium text-gray-700">Create Product</h3>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Product Price"
                                    value={formData.price}
                                    onChange={(e) =>
                                        setFormData({ ...formData, price: e.target.value })
                                    }
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div className="mt-2">
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Hoodie">Hoodie</option>
                                    <option value="TShirt">TShirt</option>
                                    <option value="TShirt">Shirt</option>
                                    <option value="Jeans">Shacket</option>
                                    <option value="Jeans">Sweat Shirt</option>
                                    <option value="Jeans">Jeans</option>
                                    <option value="Jeans">Pants</option>
                                    <option value="Jeans">Sweater</option>
                                    <option value="Jeans">Eye Wear</option>
                                </select>
                            </div>
                            <div className="mt-2">
                                <textarea
                                    name="description"
                                    placeholder="Product Description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    rows="4"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                ></textarea>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="stock"
                                    placeholder="Stock Quantity"
                                    value={formData.stock}
                                    onChange={(e) =>
                                        setFormData({ ...formData, stock: e.target.value })
                                    }
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={(e) =>
                                        setFormData({ ...formData, image: e.target.files[0] })
                                    }
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    Create Product
                                </button>
                            </div>
                        </form>
                        <form onSubmit={handleProductDelete} className="mt-6">
                            <h3 className="text-lg font-medium text-gray-700">Delete Product</h3>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="product_id"
                                    placeholder="Product ID"
                                    value={deleteProductId}
                                    onChange={(e) => setDeleteProductId(e.target.value)}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                                >
                                    Delete Product
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Manage Categories */}
                    {/* <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Manage Categories</h2>
                    <form onSubmit={handleCategorySubmit} className="mt-4">
                        <h3 className="text-lg font-medium text-gray-700">Create Category</h3>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Category Name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700"
                            >
                                Save Category
                            </button>
                        </div>
                    </form>
                </div> */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
