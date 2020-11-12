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

    return (
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            {isProfileView 
            ? <div>
                <button className="vendor-application-button" onClick={toggleView}>Vendor Application</button>
                <ProfileView />
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