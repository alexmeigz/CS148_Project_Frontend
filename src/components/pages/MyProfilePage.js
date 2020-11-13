// MyProfilePage.js
// Engineer: Joseph Ng

import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// import "./MyProfilePage.css"

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import ApplForm from "./CreateAppl";
import ProfileView from "./ProfileView";

import "./MyProfilePage.css";

function MyProfilePage (props) {
    const [isProfileView, setIsProfileView] = useState(true);

    function toggleView(e) {
        setIsProfileView(prevIsProfileView => !prevIsProfileView);
    }

    function handleLoginChange(value) {
        props.onLoginChange(value)
    }

    function handleUserChange(value) {
        props.onUserChange(value)
    }

    return (
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange}/> : null}

            {isProfileView 
            ? <div>
                <button className="vendor-application-button" onClick={toggleView}>Vendor Application</button>
                <ProfileView user={props.user} onUserChange={handleUserChange}/>
            </div>
            : <div>
                <button className="vendor-application-back-button" onClick={toggleView}>Back</button>
                <ApplForm />
            </div>
            }
            
            <ContactUsFooter />
            
        </div>
    );
};

export default MyProfilePage;