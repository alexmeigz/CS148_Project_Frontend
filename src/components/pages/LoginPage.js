// LoginPage.js
// Engineer: Joseph Ng

import React, {useState} from 'react';
import {Redirect} from "react-router-dom";

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";


import LoginForm from "./LoginForm";

function LoginPage (props) {
    const [redirect, setRedirect] = useState(false)

    function handleLoginChange(value) {
        props.onLoginChange(value)
        if (value) {
            setRedirect(value)
        }
    }
    function handleUserChange(value) {
        props.onUserChange(value)
    }
    if (redirect) {
        return <Redirect to="/" />
    } else {
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} user={props.user} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange}/> : null}

            <LoginForm isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange} user={props.user} onUserChange={handleUserChange}/>

            <ContactUsFooter />
        </div>
    );
    }
};

export default LoginPage;