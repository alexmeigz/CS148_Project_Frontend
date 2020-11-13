// MyProductsPage.js
// Engineer: Joseph Ng

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

import ProductForm from "./CreateProduct";

function MyProductsPage (props) {
    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <ProductForm />

            <ContactUsFooter />
        </div>
    );
};

export default MyProductsPage;