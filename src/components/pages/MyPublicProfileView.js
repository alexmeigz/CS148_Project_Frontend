// MyPublicProfileView.js
// Engineer: Alex Mei

import React, { useState } from 'react';
import "./MyProfilePage.css"
import "./Vendor.css"

import PublicProfileView from "./PublicProfileView";


function MyPublicProfileView(props) {

    const [settingsMode, setSettingsMode] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState({
        ...JSON.parse(sessionStorage.getItem("user"))
    })

    function resetNewUserInfo() {
        setNewUserInfo({
            ...JSON.parse(sessionStorage.getItem("user")),
            instagram: "",
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
        let required_params = ["user_id"];
        let updatable_params = ["email", "instagram"];

        event.preventDefault();
        let server = "http://localhost:8118/api"
        if (process.env.REACT_APP_REMOTE === "1") { 
            server = "https://nutriflix-flask-backend.herokuapp.com/api"
        }
        if (process.env.NODE_ENV !== "development") {
            server = "https://nutriflix-flask-backend.herokuapp.com/api"
        }
        let url = `${server}/user/?`

        required_params.forEach((param, index) => {
            if (newUserInfo[param] === "") {
                newUserInfo[param] = JSON.parse(sessionStorage.getItem("user"))[param]; 
            }
            url += `&${param}=${newUserInfo[param]}`
        });
            
        updatable_params.forEach((param, index) => {
            if (newUserInfo[param] !== "") {
                 url += `&${param}=${newUserInfo[param]}`
            } else {
                newUserInfo[param] = JSON.parse(sessionStorage.getItem("user"))[param]; 
            }
        });
        
        fetch(url, 
            {
              method: 'PATCH',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },           
            })
            .then(response => response.json()) 
              .then(data => {
              if(data["message"] === "User successfully updated"){
                alert(`${data["message"]}`)
                handleUserChange(newUserInfo);
              }
              else{
                alert(`Error updating user info: ${data["message"]}`)
              }
            })
            .catch((error) => console.log("User update error: "+ error))
    }

    return (
        <div>
            <div className="vendor-profile row">
                <h1>
                    Public Profile
                    <h3>Info outlined in red shows how others will see your profile:</h3>
                </h1>
            </div>
            <div className="settings-pane">
                {!settingsMode 
                    ? <div>
                        <button className="change-info" onClick={(event) => {toggleView(); resetNewUserInfo()}}> Update Profile Information </button>
                    </div>
                    : <div>
                        <button className="cancel-info" onClick={(event)=> {toggleView()}}>Cancel</button>
                        <button className="submit-info" onClick={(event)=> {toggleView(); submitNewUserInfo(event)}}>Submit Changes</button>
                        <div>
                            <div>
                                <label className="form-label" for="email"> Email </label>         
                                <input className="form-field" type="text" value={newUserInfo.email} name="email" onChange={handleNewUserChange} />
                            </div>
                            <div>
                                <label className="form-label" for="instagram"> Instagram </label>         
                                <input className="form-field" type="text" value={newUserInfo.instagram} name="instagram" onChange={handleNewUserChange} />
                            </div>
                            <br />
                        </div>
                    </div>
                }
                
            </div>
            
            <div className="vendor-info">
                <PublicProfileView isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={handleUserChange} user_id={JSON.parse(sessionStorage.getItem("user")).user_id}/>
            </div>
        </div>
    )
}


export default MyPublicProfileView;