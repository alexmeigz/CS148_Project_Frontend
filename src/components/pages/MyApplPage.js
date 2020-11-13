import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

import ApplForm from "./CreateAppl";

function MyApplPage(props) {
    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <ApplForm />

            <ContactUsFooter />
        </div>
    );
};

export default MyApplPage;