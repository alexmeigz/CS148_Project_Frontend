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
    function onUserChange(value) {
        props.onUserChange(value)
    }
    if (redirect) {
        return <Redirect to="/" />
    } else {
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onLoginChange={handleLoginChange}/>
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}

            <LoginForm isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={handleLoginChange} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/>

            <ContactUsFooter />
        </div>
    );
    }
};

export default LoginPage;