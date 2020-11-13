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
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <h1>[ContactUsPage]</h1>

            <ContactUsFooter />
        </div>
    );
};

export default ContactUsPage;