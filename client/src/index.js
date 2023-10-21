import React from 'react';
import reactDom from 'react-dom/client';
import App from './App';
import "./index.css";

import { BrowserRouter as Router } from 'react-router-dom';

const root = reactDom.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
)