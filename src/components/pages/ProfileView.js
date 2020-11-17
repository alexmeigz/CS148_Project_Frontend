// ProfileView.js
// Engineer: Joseph Ng

import React, { useState } from 'react';
import "./MyProfilePage.css"

function ProfileView(props) {
    // TODO: Make updating settings possible
    // eslint-disable-next-line
    const [settingsMode, setSettingsMode] = useState(false);
    // eslint-disable-next-line
    const [newUserInfo, setNewUserInfo] = useState({
        ...props.user
    })

    function resetNewUserInfo() {
        setNewUserInfo({
            ...props.user,
            email: ""
        })
    }

    function toggleView(e) {
        setSettingsMode(prevSettingsMode => !prevSettingsMode);
    }


    // eslint-disable-next-line
    function handleUserChange(value) {
        props.onUserChange(value)
    }

    function handleNewUserChange(event) {
        setNewUserInfo({
            ...newUserInfo,
            [event.target.name]: event.target.value
        })
    }

    function submitNewUserInfo(event) {
        event.preventDefault();
        let server = "https://nutriflix-flask-backend.herokuapp.com/api"
        if (process.env.REACT_APP_REMOTE) { //set this in .env file: REACT_APP_REMOTE=1
            server = "https://nutriflix-flask-backend.herokuapp.com/api"
        }
        if (process.env.NODE_ENV !== 'development') {
            server = "https://nutriflix-flask-backend.herokuapp.com/api"
        }

        let url = `${server}/user/?`

        for(const param in newUserInfo){
            url += `&${param}=${newUserInfo[param]}`
            console.log(`&${param}=${newUserInfo[param]}`);
        }
        
        
        fetch(url, 
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },           
            })
            .then(response => response.json()) 
              .then(data => {
              if(data["message"] === "User successfully updated"){
                alert(`${data["message"]}`)
              }
              else{
                alert(`Error updating user info: ${data["message"]}`)
              }
            })
            .catch((error) => console.log("User update error: "+ error))
    }

    return (
        <div>
            <h1>
                My Profile
                {!settingsMode 
                ? <div><button className="change-info" onClick={(event) => {toggleView(); resetNewUserInfo()}}>Change User Info/Settings</button></div>
                : <div>
                    <button className="cancel-info" onClick={(event)=> {toggleView()}}>Cancel</button>
                    <button className="submit-info" onClick={(event)=> {toggleView(); submitNewUserInfo(event)}}>Submit Changes</button>
                    </div>}
            </h1>
            <div className="user-info">
                <img className="profile-picture"
                    src="https://www.cnam.ca/wp-content/uploads/2018/06/default-profile.gif"
                    alt="Profile"
                />
                <div className="user-details">
                    <p>
                        Username: {props.user.username}
                    </p>
                    <p>
                        Account Type: {props.user.account_type}
                    </p>
                    <p>
                        Email: {props.user.email}
                        {settingsMode 
                        ? <div>
                            <label className="form-label" for="email"> New Email: </label>         
                            <input className="form-field" type="text" value={newUserInfo.email} name="email" onChange={handleNewUserChange} />
                            <br />
                        </div>
                        : null}
                    </p>
                    <p>
                        Credits: {props.user.credits}
                    </p>
                </div>
                

            </div>

        </div>
    );
};

export default ProfileView;