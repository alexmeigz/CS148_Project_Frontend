// MyProductsPage.js
// Engineer: Joseph Ng, Alex Mei

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import ProductForm from "./CreateProduct";
import MyProductsList from "./MyProductsList"

function MyProductsPage (props) {
    function onLoginChange(value) {
        props.onLoginChange(value)
    }
    function onUserChange(value) {
        props.onUserChange(value)
    }

    
    return (
        <div>
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={onLoginChange} user={JSON.parse(sessionStorage.getItem("user"))}/>
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}

            <ProductForm user={JSON.parse(sessionStorage.getItem("user"))}/>

            <h1> My Products </h1>
            <MyProductsList isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange} />

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

    function onLoginChange(value) {
        props.onLoginChange(value)
    }

    function onUserChange(value) {
        props.onUserChange(value)
    }

    return (
        <div>
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={onLoginChange}/>
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}

            {isProfileView 
            ? <div>
                <button className="vendor-application-button" onClick={toggleView}>Vendor Application</button>
                <ProfileView user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/>
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