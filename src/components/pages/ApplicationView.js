// ProductView.js
// Engineer: Joseph Ng

import React from "react";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar";

// import ProductPane from "./ProductPane.js"

function ApplicationView(props) {
    return (
        <div className="application_view">
            <div className="row">
                <div className="appview_header"> User ID: </div>
                <div className="appview_text"> {props["applicationData"]["user"]} </div>
            </div>
            <div className="row">
                <div className="appview_header"> Application Type: </div>
                <div className="appview_text"> {props["applicationData"]["type"]} </div>
            </div>
            <div className="row">
                <div className="appview_header"> Business Name: </div>
                <div className="appview_text"> {props["applicationData"]["name"]} </div>
            </div>
            <div className="row">
                <div className="appview_header"> Application Date: </div>
                <div className="appview_text"> {props["applicationData"]["date"]} </div>
            </div>
            <div className="row">
                <div className="appview_header"> Reason: </div>
                <div className="appview_text"> {props["applicationData"]["reason"]} </div>
            </div>
        </div>
    );
};

export default ApplicationView;