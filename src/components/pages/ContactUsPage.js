// ContactUsPage.js
// Engineer: Joseph Ng

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

function ContactUsPage (props) {

    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    function handleUserChange(value) {
        props.onUserChange(value)
    }
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange} user={props.user} />
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange}/> : null}

            <div className="container">
                <h1> Contact Us </h1>

                <p>
                    This website is designed for educational purposes for UC Santa Barbara's CS 148: Computer Science Project class during the Fall of 2020 under Professor Chandra Krintz. 
                </p>

                <p>
                    For inquiries, please email us at:
                    <ul>
                        <li> <a href="mailto:nutriflix.help@gmail.com"> nutriflix.help@gmail.com</a> </li>
                    </ul>
                </p>

                <p>
                    To contact the creators of the site, please email us at:
                    <ul>
                        <li> <a href="mailto:alexmei@cs.ucsb.edu"> alexmei@cs.ucsb.edu</a> </li>
                        <li> <a href="mailto:joseph_ng@cs.ucsb.edu"> joseph_ng@cs.ucsb.edu</a> </li>
                        <li> <a href="mailto:pranavacharya@cs.ucsb.edu"> pranavacharya@cs.ucsb.edu</a> </li>
                        <li> <a href="mailto:sriyaaluru@cs.ucsb.edu"> sriyaaluru@cs.ucsb.edu</a> </li>
                    </ul>
                </p>
            </div>
            
            

            <ContactUsFooter />
        </div>
    );
};

export default ContactUsPage;