import React, { useEffect } from "react";
// import NavBar from "../Componants/Navbar";
// import SliderComp from "../HomeComp/SliderComp";
import transition from "../transition";
// import LocomotiveScroll from 'locomotive-scroll';
// import 'locomotive-scroll/dist/locomotive-scroll.css';
import About from "../Comp/About";
import Hero from "../Comp/Hero";
import NavBar from "../Comp/Navbar";
// import Features from "../Comp/Features";
// import Story from "../Comp/Story";
import Contact from "../Comp/Contact";
import Footer from "../Comp/Footer";
// import { UserContext } from '../context/UserContext';


const Home = () => {
    // useEffect(() => {
    //     const scroll = new LocomotiveScroll({
    //         el: document.querySelector('[data-scroll-container]'),
    //         smooth: true,
    //     });

    //     return () => {
    //         if (scroll) scroll.destroy();
    //     };
    // }, []);

    return (
        // <div data-scroll-container className="w-full">
        //     <NavBar />
        //     <SliderComp />
        //     <h1 className="text-6xl text-[#222222]">SMIR Home Page</h1>
        // </div>
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            {/* <UserContext> */}
            <NavBar />
            {/* </UserContext> */}
            <Hero />
            <About />
            {/* <Features /> */}
            {/* <Story /> */}
            <Contact />
            <Footer />
        </main>
    );
};

export default transition(Home);
