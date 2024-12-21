import React, { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import UserContext from './context/UserContext.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserContext>
            <Router>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </Router>
        </UserContext>
    </StrictMode>
);
