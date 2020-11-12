// LoginPage.js
// Engineer: Joseph Ng

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";


import LoginForm from "./LoginForm";

function LoginPage (props) {
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <LoginForm />

            <ContactUsFooter />
        </div>
    );
};

export default LoginPage;