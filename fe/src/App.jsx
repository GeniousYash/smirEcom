import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import WhatsAppBtn from "./Componants/WhatsAppBtn";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Blogs from "./Pages/Blogs";
import Contact from "./Pages/Contact";
import Shop from "./Pages/Shop";
import "./App.css";
import BestSeller from "./Pages/BestSeller";
import ScrollToTop from "./Componants/ScrollToTop";
import UserSignup from "./Pages/UserSignup";
import UserLogin from "./Pages/UserLogin";
import UserProtectedWrapper from "./Pages/UserProtectedWrapper";
import UserLogout from "./Pages/UserLogout";





function App() {
    const locomotiveScroll = new LocomotiveScroll();
    const location = useLocation();


    return (
        <div className="w-full h-[100%]">
            <WhatsAppBtn />
            <AnimatePresence mode="wait">
                <ScrollToTop />
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                        <Home />
                    } />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/BestSeller" element={<BestSeller />} />
                    <Route path="/signup" element={<UserSignup />} />
                    <Route path="/login" element={<UserLogin />} />
                    <Route path='/user/logout'
                        element={<UserProtectedWrapper>
                            <UserLogout />
                        </UserProtectedWrapper>} />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App
