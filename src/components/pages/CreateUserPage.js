// CreateUserPage.js
// Engineer: Pranav Acharya

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

import UserForm from "./CreateUser";

function CreateUserPage (props) {

    function handleLoginChange(value) {
        props.onLoginChange(value)
    }

    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <UserForm />

            <ContactUsFooter />
        </div>
    );
};

export default CreateUserPage;