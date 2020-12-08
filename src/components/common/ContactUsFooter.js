// ContactUsFooter.js
// Engineer: Joseph Ng

import React from "react";
import {Link} from "react-router-dom";

import "./ContactUsFooter.css"

function ContactUsFooter() {
    return (
        <div >
            <footer className="footer">
                <ul>
                    <li className="contact-us"><Link to="/contact-us">Contact Us</Link></li>
                    <li className="email"> <a href="mailto:nutriflix.help@gmail.com"> nutriflix.help@gmail.com </a> </li>
                    <li className="address"> Santa Barbara, CA </li>
                </ul>
            </footer>
        </div>
    );
};

export default ContactUsFooter;