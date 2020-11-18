// LoginPage.js
// Engineer: Joseph Ng

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";


import LoginForm from "./LoginForm";

function LoginPage (props) {

    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    function handleUserChange(value) {
        props.onUserChange(value)
    }

    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} user={props.user} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange}/> : null}

            <LoginForm isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange} user={props.user} onUserChange={handleUserChange}/>

            <ContactUsFooter />
        </div>
    );
};

export default LoginPage;