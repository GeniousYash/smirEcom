import React, { useEffect, useState } from 'react';
import axios from "axios";
import NavBar from '../Comp/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const AdminProducts = () => {
    const [data, setData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // Get Cookies:-
    function getCookie(name) {
        let cookieArr = document.cookie.split(";");

        for (let i = 0; i < cookieArr.length; i++) {
            let cookie = cookieArr[i].trim();

            if (cookie.startsWith(name + "=")) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    // Fetch Products
    useEffect(() => {
        const fetchproducts = async () => {
            let token = getCookie("token");
            if (!token) {
                navigate("/admin-login");
                return;
            }

            try {
                const categoryResponse = await axios.get("http://localhost:4040/categories/getcateg", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setCategories(categoryResponse.data.categories);

                const response = await axios.get("http://localhost:4040/admin/products", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchproducts();
    }, [navigate]);

    // Delete Product
    const deleteProduct = async (productId) => {
        try {
            let token = getCookie("token");
            if (!token) {
                navigate("/admin-login");
                return;
            }

            await axios.get(`http://localhost:4040/products/delete/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            setData((prevData) => {
                const updatedProducts = { ...prevData.products };
                for (const category in updatedProducts) {
                    updatedProducts[category] = updatedProducts[category].filter(
                        (product) => product._id !== productId
                    );
                }
                return { ...prevData, products: updatedProducts };
            });

            alert("Product Deleted successfully")
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Reduce Stock via 1
    const reduceStock = async (productId) => {
        try {
            let token = getCookie("token");
            if (!token) {
                navigate("/admin-login");
                return;
            }
            const response = await axios.patch(`http://localhost:4040/products/reduce-stock/${productId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });


            if (response.status === 200) {
                alert("Stock reduced by 1");

                setData((prevData) => {
                    const updatedProducts = { ...prevData.products };

                    for (const category in updatedProducts) {
                        updatedProducts[category] = updatedProducts[category].map((product) =>
                            product._id === productId
                                ? { ...product, stock: product.stock - 1 }
                                : product
                        );
                    }
                    return { ...prevData, products: updatedProducts };
                });
            } else {
                alert("Failed to reduce stock");
            }
        } catch (error) {
            alert("Error reducing stock: " + error.message);
        }
    };

    // Increase Stock via 1
    const addStock = async (productId) => {
        try {
            let token = getCookie("token");
            if (!token) {
                navigate("/admin-login");
                return;
            }

            const response = await axios.patch(
                `http://localhost:4040/products/add-stock/${productId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                alert("Stock increased by 1");

                setData((prevData) => {
                    const updatedProducts = { ...prevData.products };

                    for (const category in updatedProducts) {
                        updatedProducts[category] = updatedProducts[category].map((product) =>
                            product._id === productId
                                ? { ...product, stock: product.stock + 1 }
                                : product
                        );
                    }

                    return { ...prevData, products: updatedProducts };
                });
            } else {
                alert("Failed to add stock");
            }
        } catch (error) {
            alert("Error adding stock: " + error.message);
        }
    };

    if (loading) return <div className='w-full h-screen flex justify-center items-center bg-[#222222]'><p className='text-8xl text-[#deb887] font-black'>Loading...</p></div>;
    if (error) return <div className='w-full h-screen flex justify-center items-center bg-[#222222]'><p className='text-4xl text-[#deb887]'>Error: {error.message}</p></div>;

    return (
        <div className="w-full !h-[100%] py-[10vh] bg-[#dadada]">
            {/* <NavBar /> */}
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl text-[#222222] mb-8">Product Management</h1>
                <Link to="/admin-dashboard"><button className="lg:w-[30vw] sm:w-[100vw] m-auto ml-4 py-4 px-6 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500">Go To Admin's Dashboard Page</button></Link>

                {/* Product List by Category */}
                <div className="max-w-[90%] h-auto mx-auto py-6 sm:px-6 lg:px-8">
                    {Object.entries(data.products).map(([categoryName, products]) => {
                        const category = categories.find(cat => cat.name === categoryName);
                        return (
                            <div key={categoryName} className="bg-white shadow rounded-lg mb-6 p-6">
                                <h2 className="text-2xl flex items-center font-semibold text-gray-800">
                                    {categoryName}
                                    <span key={category._id} className="text-sm text-gray-500 pl-6"> (ID: {category ? category._id : "N/A"})</span>
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                    {products.map((product) => (
                                        <div key={product._id} className="bg-gray-50 p-4 rounded-lg shadow">
                                            <img
                                                className="w-32 h-32 mb-3"
                                                src={`data:image/png;base64, ${product.image.toString('base64')}`}
                                                alt={product.name}
                                            />
                                            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                            <p className="mt-2 text-gray-600">Price: {product.price}</p>
                                            <p className={`mt-2 ${product.stock > 0 ? "text-gray-600" : "text-red-600"}`}>
                                                Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
                                            </p>
                                            <p className="mt-2 text-gray-600">{product.description}</p>
                                            <p className="mt-2 text-sm text-gray-500">Product ID: {product._id}</p>

                                            <div className="mt-5 flex gap-4">
                                                <button
                                                    onClick={() => deleteProduct(product._id)}
                                                    className="capitalize inline-block text-red-600"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => reduceStock(product._id)}
                                                    disabled={product.stock === 0}
                                                    className={`capitalize inline-block text-blue-600 ${product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                                                        }`}
                                                >
                                                    Reduce Stock
                                                </button>
                                                <button
                                                    onClick={() => addStock(product._id)}
                                                    className="capitalize inline-block text-green-600"
                                                >
                                                    Add Stock
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
