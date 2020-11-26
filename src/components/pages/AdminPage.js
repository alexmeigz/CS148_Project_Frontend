// AdminPage.js
// Engineer: Alex Mei

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import VendorApps from "./VendorApps"
//import ReportList from "./ReportList"

function AdminPage (props) {
    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    function handleUserChange(value) {
        props.onUserChange(value)
    }
    return (
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange} user={props.user} />
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange}/> : null}

            <h1> Admin Panel </h1>

            <VendorApps user={props.user} onUserChange={handleUserChange} />

            <ContactUsFooter />
        </div>
    );
};

export default AdminPage;