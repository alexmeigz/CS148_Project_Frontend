// LogoutPage.js
// Engineer: Joseph Ng

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

function LogoutPage (props) {
    function onLoginChange(value) {
        props.onLoginChange(value)
    }
    function onUserChange(value) {
        props.onUserChange(value)
    }
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={onLoginChange}/>
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}

            <h1>[LogoutPage]</h1>

            <ContactUsFooter />
        </div>
    );
};

export default LogoutPage;