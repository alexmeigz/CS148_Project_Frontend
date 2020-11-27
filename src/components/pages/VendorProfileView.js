// VendorProfileView.js
// Engineer: Joseph Ng

import React, {useState} from 'react';
import "./MyProfilePage.css"
import MyProductsList from "./MyProductsList";

function VendorProfileView(props) {
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
                <h1> Welcome to {displayInfo.username}'s Store </h1>
            </div>
            <div className="vendor-details">
                <MyProductsList isLoggedIn={props.isLoggedIn} user={props.user} onUserChange={props.onUserChange} vendor_id={displayInfo.user_id}/>
            </div>
        </div>
    )
}

export default VendorProfileView;