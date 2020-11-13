// ProfileView.js
// Engineer: Joseph Ng

import React from 'react';
import "./MyProfilePage.css"

function ProfileView(props) {
    // TODO: Make updating settings possible

    // eslint-disable-next-line
    function handleUserChange(value) {
        props.onUserChange(value)
    }

    return (
        <div>
            <h1>
                My Profile
            </h1>
            <div className="user-info">
                <img className="profile-picture"
                    src="https://www.cnam.ca/wp-content/uploads/2018/06/default-profile.gif"
                    alt="Profile"
                />
                <div className="user-details">
                    <p>Username: {props.user.username}</p>
                    <p>Account Type: {props.user.account_type}</p>
                    <p>Email: {props.user.email}</p>
                </div>
                

            </div>

        </div>
    );
};

export default ProfileView;