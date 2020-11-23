// ProductsPage.js
// Engineer: Alex Mei

import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

import PostsList from "./PostsList";

function PostsPage (props) {
    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    function handleUserChange(value) {
        props.onUserChange(value)
    }
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange} user={props.user} />
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange}/> : null}

            <PostsList isLoggedIn={props.isLoggedIn} user={props.user} onUserChange={handleUserChange}/>

            <ContactUsFooter />
        </div>
    );
};

export default PostsPage;