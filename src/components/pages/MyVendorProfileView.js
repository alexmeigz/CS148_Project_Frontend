// MyVendorProfileView.js
// Engineer: Joseph Ng

import React, { useState } from 'react';
import "./MyProfilePage.css"
import "./Vendor.css"

import VendorProfileView from "./VendorProfileView";


function MyVendorProfileView(props) {
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    
    const [settingsMode, setSettingsMode] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState({
        ...props.user
    })

    function resetNewUserInfo() {
        setNewUserInfo({
            ...props.user,
            vendor_image_url: ""
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
        let updatable_params = ["vendor_image_url"];

        event.preventDefault();
        

        let url = `${server}/user/?`


        required_params.forEach((param, index) => {
            if (newUserInfo[param] === "") {
                newUserInfo[param] = props.user[param]; 
            }
            url += `&${param}=${newUserInfo[param]}`
        });
            
        updatable_params.forEach((param, index) => {
            if (newUserInfo[param] !== "") {
                 url += `&${param}=${newUserInfo[param]}`
            } else {
                newUserInfo[param] = props.user[param]; 
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
            <div className="vendor-profile">
                <h1>
                    Vendor Profile
                    <h3>Info outlined in red shows how others will see your store:</h3>
                </h1>
            </div>
            <div className="settings-pane">
                {!settingsMode 
                    ? <div>
                        <button className="change-info" onClick={(event) => {toggleView(); resetNewUserInfo()}}>Change Vendor Info/Settings</button>
                    </div>
                    : <div>
                        <button className="cancel-info" onClick={(event)=> {toggleView()}}>Cancel</button>
                        <button className="submit-info" onClick={(event)=> {toggleView(); submitNewUserInfo(event)}}>Submit Changes</button>
                        <div>
                            <label className="form-label" for="vendor_image_url">New Vendor Profile Image URL: </label>         
                            <input className="form-field" type="text" value={newUserInfo.vendor_image_url} name="vendor_image_url" onChange={handleNewUserChange} />
                            <br />
                        </div>
                    </div>
                }
                
            </div>
            
            <div className="vendor-info">
                <VendorProfileView isLoggedIn={props.isLoggedIn} user={props.user} onUserChange={handleUserChange} vendor_id={props.user.user_id}/>
            </div>
        </div>
    )
}


export default MyVendorProfileView;