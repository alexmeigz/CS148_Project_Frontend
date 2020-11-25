// VendorsPage.js
// Engineer: Joseph Ng

import React, {useState, useEffect} from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import VendorProfileView from "./VendorProfileView";
import VendorPane from "./VendorPane";

import "./Vendor.css"

function VendorsPage (props) {
    const [results, setResults] = useState({})

    const [isListView, setIsListView] = useState(true);
    const [vendorView, setVendorView] = useState(
        <VendorProfileView 
            isLoggedIn={props.isLoggedIn} 
            user={props.user} 
            onUserChange={props.onUserChange} 
        />
        )

    let server = "https://nutriflix-flask-backend.herokuapp.com/api"
    // let server = "http://localhost:8118/api"

    let url = `${server}/user/?display_all=True&filter=vendor`

    useEffect(() => {
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
              
                setResults(data)
            })
            .catch((error) => console.log("Vendor display error: "+ error))
    }, [isListView, url])

    

    function changeView(event, type, vendorData) {
        setIsListView(prevIsListView => !prevIsListView);
        if (type === "vendor-pane" && vendorData) {
            setVendorView(<VendorProfileView 
                isLoggedIn={props.isLoggedIn} 
                user={props.user} 
                onUserChange={props.onUserChange} 
                vendor_id={vendorData.vendor_id}
            />);
        } else {
            setVendorView(<VendorProfileView 
                isLoggedIn={props.isLoggedIn} 
                user={props.user} 
                onUserChange={props.onUserChange} 
            />);
        }
    };

    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    function handleUserChange(value) {
        props.onUserChange(value)
    }



    return (
    
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange} user={props.user}/>
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange}/> : null}

            <h1>Vendors Page</h1>
            {!isListView
            ? <div><button className="vendor_back_button" onClick={(e) => changeView(e, "vendor-view")}>Back</button>
                {vendorView}
            </div>
            : <div>
                    <div className="title">
                        Vendor Results (Total: {Object.keys(results).length})
                    </div>
                    {Object.values(results).map(vendor => (
                        <button className="vendor_panel_button" onClick={(e) => changeView(e, "vendor-pane", {
                            vendor_id: vendor.user_id
                        })}>
                            <VendorPane user={props.user} onUserChange={handleUserChange} vendor_id={vendor.user_id}/>
                        </button>
                    ))}
                
            
            </div>}

            <ContactUsFooter />
        </div>
    );
};

export default VendorsPage;