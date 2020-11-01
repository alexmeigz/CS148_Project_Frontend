// ContactUsFooter.js
// Engineer: Joseph Ng

import React from "react";
import {Link} from "react-router-dom";

import "./ContactUsFooter.css"

function ContactUsFooter() {
    return (
        // TODO
        <div >
            <footer className="footer">
                <ul>
                    <li className="email" >Email: placeholder@placeholder.com</li>
                    <li className="address">Address: placeholder</li>
                    <li className="contact-us"><Link to="/contact-us">Contact Us</Link></li>
                </ul>
            </footer>
        </div>
    );
};

export default ContactUsFooter;