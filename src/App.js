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
import MyProductsPage from "./components/pages/MyProductsPage";

import ErrorPage from './components/pages/ErrorPage';
// import ContactUsFooter from './components/common/ContactUsFooter';

import ProductForm from './components/pages/CreateProduct';
//import LoggedInHomePage from './components/pages/LoggedInHomePage';

function App() {
    const isLoggedIn = true; // testing conditional rendering
    return (
        // TODO: Change to new Nutriflix components
        <main>
            <Switch>
		        <Route path="/" exact>
                    <DefaultHomePage isLoggedIn={isLoggedIn}/>
                </Route>
                <Route path="/maps">
                    <MapsPage isLoggedIn={isLoggedIn}/>
                </Route>
                <Route path="/vendors">
                    <VendorsPage isLoggedIn={isLoggedIn}/>
                </Route>
                <Route path="/recipes">
                    <RecipesPage isLoggedIn={isLoggedIn}/>
                </Route>
                <Route path="/products">
                    <ProductsPage isLoggedIn={isLoggedIn}/>
                </Route>
                <Route path="/login">
                    <LoginPage isLoggedIn={isLoggedIn}/>
                </Route>
                <Route path="/logout">
                    <LogoutPage isLoggedIn={isLoggedIn}/>
                </Route>
                <Route path="/contact-us">
                    <ContactUsPage isLoggedIn={isLoggedIn}/>
                </Route>

                {/* Must be signed in to access pages */}
                {isLoggedIn 
                    ? (<Route path="/my-profile">
                        <MyProfilePage isLoggedIn={isLoggedIn}/>
                    </Route>)
                    : null
                }
                {isLoggedIn
                    ? (<Route path="/my-products">
                        <MyProductsPage isLoggedIn={isLoggedIn}/>
                    </Route>)
                    : null
                }
                
                <Route path="/create-product">
                    <ProductForm isLoggedIn={isLoggedIn}/>
                </Route>

	            <Route>
                    <ErrorPage isLoggedIn={isLoggedIn}/>
                </Route>
            </Switch>
        </main>
    );
};
export default App;
