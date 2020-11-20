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
            email: "",
            coupon_code: "",
            coupon_amount: ""
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
        let updatable_params = ["email"];
        // handle coupon code adding logic
        if (newUserInfo["coupon_code"] === "dev") {
            if (isNaN(newUserInfo["coupon_amount"])) {
                alert("User update error: Invalid coupon amount.");
                return;
            }
            newUserInfo["credits"] = parseFloat(props.user["credits"]) + parseFloat(newUserInfo["coupon_amount"]);
            updatable_params.push("credits")
        } else if (newUserInfo["coupon_code"] !== "") {
            alert("User update error: Invalid coupon code.");
            return;
        }


        event.preventDefault();
        let server = "https://nutriflix-flask-backend.herokuapp.com/api"
        // let server = "http://localhost:8118/api"

        let url = `${server}/user/?`

        // TODO: fix bug with email

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
            <h1>
                My Profile
            </h1>
            <div className="user-info">
                <img className="profile-picture"
                    src="https://www.cnam.ca/wp-content/uploads/2018/06/default-profile.gif"
                    alt="Profile"
                />
                <div className="user-details">
                    {!settingsMode 
                        ? <div><button className="change-info" onClick={(event) => {toggleView(); resetNewUserInfo()}}>Change User Info/Settings</button></div>
                        : <div>
                            <button className="cancel-info" onClick={(event)=> {toggleView()}}>Cancel</button>
                            <button className="submit-info" onClick={(event)=> {toggleView(); submitNewUserInfo(event)}}>Submit Changes</button>
                        </div>
                     }
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
                            <label className="form-label" for="email">New Email: </label>         
                            <input className="form-field" type="text" value={newUserInfo.email} name="email" onChange={handleNewUserChange} />
                            <br />
                        </div>
                        : null}
                    </p>
                    <p>
                        Credits: ${props.user.credits}
                        {settingsMode 
                        ? <div>
                            <label className="form-label" for="coupon_code">Coupon Code: </label>         
                            <input className="form-field" type="text" value={newUserInfo.coupon_code} name="coupon_code" onChange={handleNewUserChange} />
                            <br />
                            <label className="form-label" for="coupon_amount">Coupon Amount: </label>         
                            <input className="form-field" type="text" value={newUserInfo.coupon_amount} name="coupon_amount" onChange={handleNewUserChange} />
                            <br />
                        </div>
                        : null}
                    </p>
                </div>
                

            </div>

        </div>
    );
};

export default ProfileView;