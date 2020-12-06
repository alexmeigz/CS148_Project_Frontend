import React from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import RecipeCall from "./RecipeCall"

function RecipesPage(props) {
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
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange} /> : null}
            <div className="container">
                <h1>Search Recipes</h1>

                <RecipeCall />
            </div>

            <ContactUsFooter />
        </div>
    );
};

export default RecipesPage;