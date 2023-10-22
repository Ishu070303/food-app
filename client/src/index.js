import React from 'react';
import reactDom from 'react-dom/client';
import App from './App';
import "./index.css";

import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const root = reactDom.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Router>
            <AnimatePresence>
                <App />
            </AnimatePresence>
        </Router>
    </React.StrictMode>
)