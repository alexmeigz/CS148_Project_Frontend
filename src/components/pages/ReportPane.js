// ReportPane.js
// Engineer: Pranav

import React from 'react';

function ReportPane(props) {
    return (
        <div className="application_pane">
           <div className="application_date">
                {props["reportDate"]}
            </div>
            <div className="application_user">
                {props["userReporter"]}
            </div>
            <div className="application_user">
                {props["reportedUser"]}
            </div>
        </div>
    ); 
};

export default ReportPane;