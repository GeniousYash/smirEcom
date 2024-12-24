import React, { useEffect, useState } from "react";
import transition from "../transition";
import NavBar from "../Comp/Navbar";
import axios from "axios";


const Shop = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:4040/products"); // Using axios to get data
                setData(response.data); // Axios returns data inside 'data' property
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#dadada]">
            <NavBar />
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-6xl text-[#222222] mb-8">SMIR Shop Page</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
                    {Object.entries(data.products).map(([category, products]) => (
                        <div key={category}>
                            <h3>{category}</h3>
                            <ul>
                                {products.map((product) => (
                                    <li key={product._id}>{product.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default transition(Shop);
