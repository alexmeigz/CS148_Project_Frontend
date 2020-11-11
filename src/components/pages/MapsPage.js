// MapsPage.js
// Engineer: Joseph Ng

import React from 'react';
// import BingMapsReact from "bingmaps-react";
// import { ReactBingmaps } from 'react-bingmaps';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar"
import BingMapsReact from "bingmaps-react";
import "../common/Maps.css"

function MapsPage(props) {
    return (
        // TODO:
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} />
            {props.isLoggedIn ? <AccountInfoBar /> : null}

            <h1>[MapsPage]</h1>


            <div className="maps__container">
                <div>
                    {/* DO NOT DELETE THIS DIV WITHOUT UPDATING GRID TEMPLATE */}
                </div>
                {/* ADAPTED FROM https://github.com/milespratt/bingmaps-react */}
                <div key="bingMap" className="map__card">
                    <BingMapsReact
                        bingMapsKey="Al6xM6_6DfVwdCAvRULkiOWrW0SYTDfS13YApD5QUruQJ-fIi4IuobDFRNzHeFQB"
                    />
                </div>
            </div>

            <ContactUsFooter />
        </div>
    );
};

export default MapsPage;