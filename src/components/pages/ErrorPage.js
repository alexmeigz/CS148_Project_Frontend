// ErrorPage.js
// Engineer: Joseph Ng

import React from 'react';
import { Link } from 'react-router-dom';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import "./Error.css";

function ErrorPage (props) {

    function onLoginChange(value) {
        props.onLoginChange(value)
    }
    function onUserChange(value) {
        props.onUserChange(value)
    }

    return (
        <div>
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={onLoginChange} user={JSON.parse(sessionStorage.getItem("user"))} />
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}
            
            <div className="container">
                <h1 className="text"> Sorry! We couldn't find the page you were looking for. </h1>
                <h1 className="text"> Would you like to browse some of our <Link to="./products" className="text"> delicious products </Link> instead? </h1>
                <img className="error-image" src="https://i.imgur.com/TU6089W.jpg" alt=""/>
            </div>

            <ContactUsFooter />
        </div>
    );
};

export default ErrorPage;