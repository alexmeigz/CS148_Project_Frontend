// PublicProfileView.js
// Engineer: Alex Mei

import React, {useState} from 'react';
import "./MyProfilePage.css"
import MyPostsList from "./MyPostsList";

function PublicProfileView(props) {
    const [displayInfo] = useState(
        props.vendor ? {
            ...props.vendor
        }:
        {
            ...props.user
        }
    )
    
    return (
        <div>
            <div className="vendor-picture-pane">
                <img className="vendor-picture"
                    src={displayInfo.vendor_image_url}
                    alt="Vendor Profile"
                />
                <h1> Welcome to {displayInfo.username}'s Profile </h1>
            </div>
            <div className="vendor-details">
                <MyPostsList isLoggedIn={props.isLoggedIn} user={props.user} onUserChange={props.onUserChange} vendor_id={displayInfo.user_id}/>
            </div>
        </div>
    )
}

export default PublicProfileView;