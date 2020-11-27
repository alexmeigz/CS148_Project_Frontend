// VendorsPane.js
// Engineer: Joseph Ng

import React, {useState} from 'react';

import "./Vendor.css"

function VendorPane(props) {
    // eslint-disable-next-line
    const [result, setResult] = useState({
        ...props.vendor
    })

    // let server = "https://nutriflix-flask-backend.herokuapp.com/api"
    // // let server = "http://localhost:8118/api"

    // let url = `${server}/user/?user_id=${props.vendor_id}`

    // fetch(url, 
    //     {
    //       method: 'GET',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },           
    //     })
    //     .then(response => response.json()) 
    //       .then(data => {
    //         setResult(data)
    //     })
    //     .catch((error) => console.log("User update error: "+ error))

    return (
        <div className="vendor_pane">
            <img className="vendor_image" alt=""
                src={result.vendor_image_url !== null 
                    ? result.vendor_image_url
                    : "https://longsshotokan.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                }
            />
            <div className="vendor_description">
                <div className="row">
                    <div className="vendor_name">
                        Vendor Name: {result.username}
                    </div>
                    <div className="vendor_email">
                        Email: {result.email}
                    </div>
                </div>
                <div className="row">
                    <div className="vendor_type">
                        Resturant Type: {result.account_type}
                    </div>
                    <div className="vendor_location">
                        {result.vendor_location || "No Location Listed"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorPane;