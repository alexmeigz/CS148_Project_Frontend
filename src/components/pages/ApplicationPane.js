// ApplicationPane.js
// Engineer: Alex Mei

import React from 'react';

function ApplicationPane(props) {
    return (
        <div className="application_pane">
            <div className="application_user">
                {props["user"]}
            </div>
            <div className="application_date">
                {props["date"]}
            </div>
            <div className="application_type">
                {props["type"]}
            </div>
        </div>
    ); 
};

export default ApplicationPane;