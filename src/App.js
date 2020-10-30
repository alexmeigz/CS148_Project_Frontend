// App.js
// Modified by: Joseph Ng

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavigationBar from './components/common/NavigationBar';
import ContactUsFooter from "./components/common/ContactUsFooter";

import DefaultHomePage from './components/pages/DefaultHomePage';
import MapsPage from '.components/pages/MapsPage';
import VendorsPage from '.components/pages/VendorsPage';
import RecipesPage from '.components/pages/RecipesPage';
import ProductsPage from './components/pages/ProductsPage';
import LoginPage from "./components/pages/LoginPage";

import LoggedInHomePage from './components/pages/LoggedInHomePage';

function App() {
    return (
        // TODO: Change to new Nutriflix components
        <main>
            <NavigationBar />
            <Switch>
		        <Route path="/" component={DefaultHomePage} exact />
                <Route path="/maps" component={MapsPage} exact />
                <Route path="/vendors" component={VendorsPage} />
                <Route path="/recipes" component={RecipesPage}  />
                <Route path="/products" component={ProductsPage} />
                <Route path="/login" component={LoginPage} />
                {/* <Route path="/home" component={LoggedInHomePage} /> */}
	            <Route component={Error} />
            </Switch>
            <ContactUsFooter />
        </main>
    );
};
export default App;
