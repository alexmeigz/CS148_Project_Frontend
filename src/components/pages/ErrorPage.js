// ErrorPage.js
// Engineer: Joseph Ng

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar"

function ErrorPage (props) {

    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    function handleUserChange(value) {
        props.onUserChange(value)
    }

    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange}/> : null}

            <img style={{width: "50%", marginLeft: "25%"}}
                src="https://www.ideasmama.com/wp-content/uploads/pepega.jpg"
                alt="Error"
                
            />
            <h1>404: Page does not exist</h1>

            <ContactUsFooter />
        </div>
    );
};

export default ErrorPage;