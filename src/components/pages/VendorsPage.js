// VendorsPage.js
// Engineer: Joseph Ng

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

function VendorsPage (props) {
    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    function handleUserChange(value) {
        props.onUserChange(value)
    }
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange} user={props.user}/>
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange}/> : null}

            <h1>[VendorsPage]</h1>

            <ContactUsFooter />
        </div>
    );
};

export default VendorsPage;