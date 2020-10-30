// App.js
// Modified by: Joseph Ng

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavigationBar from './components/common/NavigationBar';
import ContactUsFooter from "./components/common/ContactUsFooter";

import DefaultHomePage from './components/pages/DefaultHomePage';
import LoggedInHomePage from './components/pages/LoggedInHomePage';

function App() {
    return (
        // TODO: Change to new Nutriflix components
        <main>
            <NavigationBar />
            <Switch>
		        <Route path="/" component={DefaultHomePage} exact />
                <Route path="/home" component={LoggedInHomePage} />
	            <Route component={Error} />
            </Switch>
            <ContactUsFooter />
        </main>
    );
};
export default App;
