// VendorsPage.js
// Engineer: Joseph Ng

import React, {useState, useEffect} from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import VendorProfileView from "./VendorProfileView";
import VendorPane from "./VendorPane";

// eslint-disable-next-line
import FilterOption from "./FilterOption.js"

import "./Vendor.css"

function VendorsPage (props) {
    const [results, setResults] = useState({})
    // eslint-disable-next-line
    const [filters, setFilters] = useState({
        vendor_name: ""
    });

    const [isListView, setIsListView] = useState(true);
    const [vendorView, setVendorView] = useState()

    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }

    let url = `${server}/user/?display_all=True`

    useEffect(() => {
        if (isListView) {
            // let newUrl = url;
            // if (filters.vendor_name !== "") {
            //     newUrl += `&vendor_name=${filters.vendor_name}`
            // } else {
            //     newUrl += "&filter=vendor"
            // }
            fetch(url + "&filter=vendor", {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },              
            })
            .then(response => response.json()) 
            .then(data => {
                setResults(data)
                // console.log(data)
            })
            .catch((error) => console.log("Error: " + error))
        }
    }, [isListView, url])

    // eslint-disable-next-line
    function submitForm(event){
        event.preventDefault();
        let newUrl = url;
        if (filters.vendor_name !== "") {
            newUrl += `&vendor_name=${filters.vendor_name}`
        } else {
            newUrl += "&filter=vendor"
        }
        fetch(newUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },              
            })
        .then(response => response.json()) 
        .then(data => {
            setResults(data)
            // console.log(data)
        })
        .catch((error) => console.log("Fetch Failure (is server up?): "+ error))
    }

    function changeView(event, type, vendorData) {
        setIsListView(prevIsListView => !prevIsListView);
        if (type === "vendor-pane" && vendorData && isListView) {
            setVendorView(<VendorProfileView 
                isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} 
                user={JSON.parse(sessionStorage.getItem("user"))} 
                onUserChange={props.onUserChange} 
                vendor={vendorData.vendor}
            />);
        }
    };

    function onLoginChange(value) {
        props.onLoginChange(value)
    }
    function onUserChange(value) {
        props.onUserChange(value)
    }



    return (
    
        <div>
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={onLoginChange} user={JSON.parse(sessionStorage.getItem("user"))}/>
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}

            
            {!isListView
            ? <div><button className="vendor_back_button" onClick={(e) => changeView(e, "vendor-view")}>Back</button>
                {vendorView}
            </div>
            : <div className="container">
                <h1>Vendors</h1>
                <form onSubmit={submitForm}>
                    <div className="form_input">
                        <label className="form_label" for="q"> Search: </label>
                        <input className="form_field" type="text" value={filters.vendor_name} name="q" onChange={(event) => {setFilters({vendor_name: `${event.target.value}`})}} />
                    </div>
                    <center><input className="form_submit" type="submit" value="Submit" /></center>
                </form>
                <div className="vendor_panel">
                    <div className="title">
                        Vendor Results (Total: {Object.keys(results).length})
                    </div>
                    {Object.values(results).map(vendor => (
                        <button className="panel_button" onClick={(e) => changeView(e, "vendor-pane", {
                            vendor: vendor
                        })}>
                            <VendorPane user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange} vendor={vendor}/>
                        </button>
                    ))}
                </div>
                
            
            </div>}

            <ContactUsFooter />
        </div>
    );
};

export default VendorsPage;