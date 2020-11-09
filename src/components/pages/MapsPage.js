// MapsPage.js
// Engineer: Joseph Ng

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar"

function MapsPage (props) {
    return (
        // TODO:
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <h1>[MapsPage]</h1>

            <ContactUsFooter />
        </div>
    );
};

export default MapsPage;