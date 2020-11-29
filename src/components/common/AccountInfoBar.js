// AccountInfoBar.js
// Engineer: Joseph Ng

import React from 'react';
// import { Link } from 'react-router-dom';

import "./AccountInfoBar.css";

function AccountInfoBar(props) {
    // TODO: get account info from backend
    // var accountType = "Home";
    // var pendingCredits = 10;
    // var credits = 20;
    return (
        <div>
            <ul className="account-info-bar">
                <li className="account-type">Account Type: {props.user.account_type}</li>
                <li className="credits">
                    Credits: ${props.user.credits}
                </li>
            </ul>
        </div>
    );
};

export default AccountInfoBar;