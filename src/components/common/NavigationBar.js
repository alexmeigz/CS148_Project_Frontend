// NavigationBar.js
// Engineer: Joseph Ng

import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        // TODO
        <div>
            <Link to="/">Home</Link>
            {" "}
            <Link to="/maps">Maps</Link>
            {" "}
            <Link to="/vendors">Vendors</Link>
            {" "}
            <Link to="/recipes">Recipes</Link>
            {" "}
            <Link to="/products">Products</Link>
            {" "}
            <Link to="/login">Login</Link>


        </div>
    );
};

export default NavigationBar;