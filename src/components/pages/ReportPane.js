// ReportPane.js
// Engineer: Pranav

import React from 'react';

function ReportPane(props) {
    return (
        <div className="report_pane">
            <div className="userReporter">
                {props["userReporter"]}
            </div>
            <div className="reportedUser">
                {props["reportedUser"]}
            </div>
            <div className="reportDate">
                {props["reportDate"]}
            </div>
        </div>
    ); 
};

export default ReportPane;