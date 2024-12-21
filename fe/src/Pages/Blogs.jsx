import React from "react";
import transition from "../transition";
import NavBar from "../Comp/Navbar";



const Blogs = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#dadada]">
            <NavBar />
            <h1 className="text-6xl text-[#222222]">SMIR Blog Page</h1>
        </div>
    );
};

export default transition(Blogs);
