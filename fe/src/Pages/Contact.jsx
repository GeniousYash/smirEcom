import React from "react";
import transition from "../transition";
import NavBar from "../Comp/Navbar";




const Contact = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#dadada]">
            <NavBar />
            <h1 className="text-6xl text-[#222222]">SMIR CONTACT US</h1>
        </div>
    );
};

export default transition(Contact);
