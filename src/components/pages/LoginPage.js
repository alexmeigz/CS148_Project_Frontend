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

    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <LoginForm onLoginChange={handleLoginChange}/>

            <ContactUsFooter />
        </div>
    );
};

export default LoginPage;