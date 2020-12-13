// PublicProfileView.js
// Engineer: Alex Mei

import React, {useState} from 'react';
import "./MyProfilePage.css"
import MyPostsList from "./MyPostsList";

function PublicProfileView(props) {
    const [displayInfo] = useState(
        {
            ...JSON.parse(sessionStorage.getItem("user"))
        }
    )
    // console.log(displayInfo)
    
    return (
        <div className="view-pane">
            <div className="row">
                <img className="public-profile-photo" alt=""
                    src={displayInfo.profile_image_url}/>
                <h1> {displayInfo.username} </h1>
                <div className="social"> 
                    <a href={`mailto:${displayInfo.email}`}> 
                        Email: {displayInfo.email}
                    </a> 
                </div>
                <div className="social"> 
                    <a href={`https://www.instagram.com/${displayInfo.instagram}`}> 
                        Instagram: {displayInfo.instagram}
                    </a> 
                </div>
            </div>
            <div className="vendor-details">
                <MyPostsList isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={props.onUserChange}/>
            </div>
        </div>
    )
}

export default PublicProfileView;