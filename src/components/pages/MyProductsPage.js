// MyProductsPage.js
// Engineer: Joseph Ng, Alex Mei

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import ProductForm from "./CreateProduct";
import MyProductsList from "./MyProductsList"

function MyProductsPage (props) {
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

            <ProductForm user={props.user}/>

            <MyProductsList user={props.user} onUserChange={handleUserChange} />

            <ContactUsFooter />
        </div>
    );
};

export default MyProductsPage;

/*
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
*/