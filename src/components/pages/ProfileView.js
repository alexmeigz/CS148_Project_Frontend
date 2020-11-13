// ProfileView.js
// Engineer: Joseph Ng

import React, { useState, useEffect } from 'react';
import "./MyProfilePage.css"

function ProfileView(props) {
    let id = 2; // user id number

    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useState({
        username: "Loading",
        account_type: "Loading",
        email: "Loading"
    })

    let server = "https://nutriflix-flask-backend.herokuapp.com/api"
    if (process.env.REACT_APP_REMOTE) { //set this in .env file: REACT_APP_REMOTE=1
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
	}
    if (process.env.NODE_ENV !== 'development') {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    let url = `${server}/user/?`
    

    function updateUserInfo(e, id) {
        fetch(url+"user_id="+id, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            setUserInfo(data)
        })
        .catch((error) => console.log("SaveCreds saveCreds: Fetch Failure (is server up?): "+ error))
    };

    useEffect( () => {
        fetch(url+"user_id="+id, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            setUserInfo(data)
        })
        .catch((error) => console.log("SaveCreds saveCreds: Fetch Failure (is server up?): "+ error))
    }, [url, id]);

    

    return (
        <div>
            <h1>
                My Profile
                <button className="refresh-info" onClick={(e) => updateUserInfo(e, id)}>Refresh Info</button>
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