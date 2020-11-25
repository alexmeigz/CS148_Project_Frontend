// VendorProfileView.js
// Engineer: Joseph Ng

import React, {useState} from 'react';
import "./MyProfilePage.css"
import MyProductsList from "./MyProductsList";

function VendorProfileView(props) {
    const [displayInfo, setDisplayInfo] = useState(props.user)

    if (props.vendor_id && props.user.user_id !== props.vendor_id) {
        // Fetch vendor info
        let server = "https://nutriflix-flask-backend.herokuapp.com/api"
        // let server = "http://localhost:8118/api"

        let url = `${server}/user/?user_id=${props.vendor_id}`

        fetch(url, 
            {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },           
            })
            .then(response => response.json()) 
              .then(data => {
                setDisplayInfo(data)
              
            })
            .catch((error) => console.log("Vendor fetch error: "+ error))
    }
    
    return (
        <div>
            <div className="vendor-picture-pane">
                <img className="vendor-picture"
                    src={displayInfo.vendor_image_url}
                    alt="Vendor Profile"
                />
            </div>
            <div className="vendor-details">
                <MyProductsList isLoggedIn={props.isLoggedIn} user={props.user} onUserChange={props.onUserChange} vendor_id={props.vendor_id}/>
            </div>
        </div>
    )
}

export default VendorProfileView;