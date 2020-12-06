// AdminPage.js
// Engineer: Alex Mei

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import VendorApps from "./VendorApps"
import ReportList from "./ReportList"

function AdminPage (props) {
    function onLoginChange(value) {
        props.onLoginChange(value)
    }
    function onUserChange(value) {
        props.onUserChange(value)
    }
    return (
        <div>
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={onLoginChange} user={JSON.parse(sessionStorage.getItem("user"))} />
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}

            <h1> Admin Panel </h1>

            <VendorApps user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange} />

            <ReportList user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange} />

            <ContactUsFooter />
        </div>
    );
};

export default AdminPage;