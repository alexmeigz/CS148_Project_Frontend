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

            <div>
                <div className="button-bar">
                    {isProfileView
                        ? <div>
                            {/* {props.user.account_type !== "Business" && props.user.account_type !== "Admin" */}
                            {props.user.account_type !== "Business"
                                ? <button className="vendor-application-button" onClick={toggleView}>Vendor Application</button>
                                : null
                            }
                            {props.user.account_type === "Business" || props.user.account_type === "Admin"
                                ? <button className="vendor-profile-button" onClick={toggleView}>Vendor Profile</button>
                                : null
                            }
                        </div>
                        : <button className="back-button" onClick={toggleView}>Back</button>
                    }
                </div>

                <div className="contents">
                    {isProfileView
                        ? <ProfileView isLoggedIn={props.isLoggedIn} user={props.user} onUserChange={handleUserChange}/>
                        : null
                    }
                    {isVendorApplicationView
                        ? <ApplForm isLoggedIn={props.isLoggedIn} user={props.user} onUserChange={handleUserChange}/>
                        : null
                    }
                    {isVendorProfileView
                        ? <MyVendorProfileView isLoggedIn={props.isLoggedIn} user={props.user} onUserChange={handleUserChange}/>
                        : null
                    }


                </div>
            </div>
            
            
            <ContactUsFooter />
            
        </div>
    );
};

export default MyProfilePage;