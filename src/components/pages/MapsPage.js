// MapsPage.js
// Engineer: Joseph Ng, Sriya Aluru, Alex Mei

import React from 'react';
import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar"
import Maps from "./Maps";
import "../common/Maps.css"

function MapsPage(props) {
    function onLoginChange(value) {
        props.onLoginChange(value)
    }
    function onUserChange(value) {
        props.onUserChange(value)
    }
    return (
        // TODO:
        <div>
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={onLoginChange} user={JSON.parse(sessionStorage.getItem("user"))} />
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}

            <div className="container">
                <h1>Search Map</h1>

                <div className="maps__container">
                        <Maps />
                </div>
            </div>

            <ContactUsFooter />
        </div>
    );
};

export default MapsPage;
