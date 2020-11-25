// VendorProfileView.js
// Engineer: Joseph Ng

import React from 'react';
import "./MyProfilePage.css"
import MyProductsList from "./MyProductsList";

function VendorProfileView(props) {
    return (
        <div>
            <div className="vendor-picture-pane">
                <img className="vendor-picture"
                    src={props.user.vendor_image_url}
                    alt="Vendor Profile"
                />
            </div>
            <div className="vendor-details">
                <MyProductsList isLoggedIn={props.isLoggedIn} user={props.user} onUserChange={props.onUserChange} />
            </div>
        </div>
    )
}

export default VendorProfileView;