// RecipesPage.js
// Engineer: Joseph Ng

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

function RecipesPage (props) {
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn? "LoggedIn": null}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <h1>[RecipesPage]</h1>

            <ContactUsFooter />
        </div>
    );
};

export default RecipesPage;