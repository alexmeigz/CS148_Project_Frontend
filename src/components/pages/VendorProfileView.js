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
            ...JSON.parse(sessionStorage.getItem("user"))
        }
    )
    
    return (
        <div>
            <div className="vendor-picture-pane">
                <img className="vendor-picture"
                    src={displayInfo.vendor_image_url}
                    alt="Vendor Profile"
                />
                <h1> Welcome to {displayInfo.vendor_name || "[No Name Listed]"}'s Store </h1>
            </div>
            <div className="vendor-details">
                <MyProductsList isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={props.onUserChange} vendor_id={displayInfo.user_id}/>
            </div>
        </div>
    )
}

export default VendorProfileView;