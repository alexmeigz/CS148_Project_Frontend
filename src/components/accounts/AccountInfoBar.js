// AccountInfoBar.js
// Engineer: Joseph Ng

import React from 'react';
import { Link } from 'react-router-dom';


function AccountInfoBar() {
    var accountType = "Normal";
    var pendingCredits = 10;
    var credits = 20;
    return (
        <div>
            <ul className="account-info-bar">
                <li className="account-type">Account Type: {accountType}</li>
                <li className="credits">
                    <ul>
                        {accountType === "vendor" ? <li>Pending Credits: {pendingCredits}</li>:} 
                        <li>Credits: {credits}</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default AccountInfoBar;