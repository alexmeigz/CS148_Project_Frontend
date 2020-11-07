// App.js
// Modified by: Joseph Ng

import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import NavigationBar from './components/common/NavigationBar';
// import ContactUsFooter from "./components/common/ContactUsFooter";
// import AccountInfoBar from "./components/common/AccountInfoBar";

import DefaultHomePage from './components/pages/DefaultHomePage';
import MapsPage from './components/pages/MapsPage'
import VendorsPage from './components/pages/VendorsPage';
import RecipesPage from './components/pages/RecipesPage'
import ProductsPage from './components/pages/ProductsPage';
import LoginPage from "./components/pages/LoginPage";
import LogoutPage from "./components/pages/LogoutPage";
import ContactUsPage from "./components/pages/ContactUsPage";
import MyProfilePage from "./components/pages/MyProfilePage";

import ErrorPage from './components/pages/ErrorPage';
// import ContactUsFooter from './components/common/ContactUsFooter';

//import LoggedInHomePage from './components/pages/LoggedInHomePage';

function App() {
    const isLoggedIn = true; // testing conditional rendering
    return (
        // TODO: Change to new Nutriflix components
        <main>
            <Switch>
		        <Route path="/" exact>
                    <DefaultHomePage isLoggedIn={isLoggedIn? "LoggedIn": null}/>
                </Route>
                <Route path="/maps">
                    <MapsPage isLoggedIn={isLoggedIn? "LoggedIn": null}/>
                </Route>
                <Route path="/vendors">
                    <VendorsPage isLoggedIn={isLoggedIn? "LoggedIn": null}/>
                </Route>
                <Route path="/recipes">
                    <RecipesPage isLoggedIn={isLoggedIn? "LoggedIn": null}/>
                </Route>
                <Route path="/products">
                    <ProductsPage isLoggedIn={isLoggedIn? "LoggedIn": null}/>
                </Route>
                <Route path="/login">
                    <LoginPage isLoggedIn={isLoggedIn? "LoggedIn": null}/>
                </Route>
                <Route path="/logout">
                    <LogoutPage isLoggedIn={isLoggedIn? "LoggedIn": null}/>
                </Route>
                <Route path="/contact-us">
                    <ContactUsPage isLoggedIn={isLoggedIn? "LoggedIn": null}/>
                </Route>
                <Route path="/my-profile">
                    <MyProfilePage isLoggedIn={isLoggedIn? "LoggedIn": null}/>
                </Route>
	            <Route>
                    <ErrorPage isLoggedIn={isLoggedIn? "LoggedIn": null}/>
                </Route>
            </Switch>
        </main>
    );
};
export default App;
