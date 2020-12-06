// ReportView.js
// Engineer: Pranav

import React from "react";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar";

// import ProductPane from "./ProductPane.js"

function ReportView(props) {
    return (
        <div className="application_view">
            <div className="row">
                <div className="appview_header">ID of Report Submitter: </div>
                <div className="appview_text"> {props["reportData"]["userReporter_id"]} </div>
            </div>
            <div className="row">
                <div className="appview_header">ID of Reported User: </div>
                <div className="appview_text"> {props["reportData"]["reportedUser_id"]} </div>
            </div>
            <div className="row">
                <div className="appview_header"> Report Date: </div>
                <div className="appview_text"> {props["reportData"]["reportDate"]} </div>
            </div>
            <div className="row">
                <div className="appview_header"> Reason: </div>
                <div className="appview_text"> {props["reportData"]["reportText"]} </div>
            </div>
        </div>
    );
};

export default ReportView;