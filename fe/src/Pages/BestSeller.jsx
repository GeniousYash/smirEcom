import React from "react";
import transition from "../transition";
import NavBar from "../Comp/Navbar";



const BestSeller = () => {
    return (
        <div className="BestSellerPage w-full h-screen flex justify-center items-center bg-[#dadada]">
            <NavBar />
            <h1 className="text-6xl text-[#222222]">SMIR Best Seller Page</h1>
        </div>
    );
};

export default transition(BestSeller);
