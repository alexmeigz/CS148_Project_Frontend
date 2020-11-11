// MyProfilePage.js
// Engineer: Joseph Ng

import React from 'react';
// import { Link } from 'react-router-dom';

// import "./MyProfilePage.css"

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import ApplForm from "./CreateAppl";

function MyProfilePage (props) {
    return (
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <ApplForm />

            <ContactUsFooter />
            
        </div>
    );
};

export default MyProfilePage;