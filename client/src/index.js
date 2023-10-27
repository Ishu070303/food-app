import React from 'react';
import reactDom from 'react-dom/client';
import App from './App';
import "./index.css";
import myReducers from './context/reducers';


import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const myStore = createStore(myReducers);
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