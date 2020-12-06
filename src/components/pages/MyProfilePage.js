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
import MyVendorProfileView from "./MyVendorProfileView";

import "./MyProfilePage.css";

function MyProfilePage (props) {
    // eslint-disable-next-line
    const [isProfileView, setIsProfileView] = useState(true);
    // eslint-disable-next-line
    const [isVendorApplicationView, setIsVendorApplicationView] = useState(false);
    // eslint-disable-next-line
    const [isVendorProfileView, setIsVendorProfileView] = useState(false);

    function toggleView(e) {
        if (e.target.className === "vendor-application-button") {
            setIsProfileView(false);
            setIsVendorApplicationView(true);
            setIsVendorProfileView(false);
        } else if (e.target.className === "vendor-profile-button") {
            setIsProfileView(false);
            setIsVendorApplicationView(false);
            setIsVendorProfileView(true);
        } else if (e.target.className === "back-button") {
            setIsProfileView(true);
            setIsVendorApplicationView(false);
            setIsVendorProfileView(false);
        }
        
    }

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

            <div>
                <div className="button-bar">
                    {isProfileView
                        ? <div>
                            {JSON.parse(sessionStorage.getItem("user")).account_type !== "Business"
                            // {JSON.parse(sessionStorage.getItem("user")).account_type !== "Business"
                                ? <button className="vendor-application-button" onClick={toggleView}>Vendor Application</button>
                                : null
                            }
                            {JSON.parse(sessionStorage.getItem("user")).account_type === "Business" || JSON.parse(sessionStorage.getItem("user")).account_type === "Home" || JSON.parse(sessionStorage.getItem("user")).account_type === "Admin"
                                ? <button className="vendor-profile-button" onClick={toggleView}>Vendor Profile</button>
                                : null
                            }
                        </div>
                        : <button className="back-button" onClick={toggleView}>Back</button>
                    }
                </div>

                <div className="contents">
                    {isProfileView
                        ? <ProfileView isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/>
                        : null
                    }
                    {isVendorApplicationView
                        ? <ApplForm isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/>
                        : null
                    }
                    {isVendorProfileView
                        ? <MyVendorProfileView isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/>
                        : null
                    }


                </div>
            </div>
            
            
            <ContactUsFooter />
            
        </div>
    );
};

export default MyProfilePage;