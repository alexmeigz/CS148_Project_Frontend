// AccountInfoBar.js
// Engineer: Joseph Ng

import React from 'react';
// import { Link } from 'react-router-dom';

import "./AccountInfoBar.css";

function AccountInfoBar() {
    // TODO: get account info from backend
    var accountType = "Vendor (Home)";
    var pendingCredits = 10;
    var credits = 20;
    return (
        <div>
            <ul className="account-info-bar">
                <li className="account-type">Account Type: {accountType}</li>
                <li className="credits">
                    <ul>
                        {accountType === "Vendor (Resturant)" || accountType === "Vendor (Home)"
                            ? <li>Pending Credits: ${pendingCredits}</li>
                            : null
                        } 
                        <li>Credits: ${credits}</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default AccountInfoBar;