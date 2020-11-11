import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

import ApplForm from "./CreateAppl";

function MyApplPage(props) {
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} />
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <ApplForm />

            <ContactUsFooter />
        </div>
    );
};

export default MyApplPage;