// MyProductsList.js
// Engineer: Alex Mei

import React, { useState, useEffect } from 'react';

import "./Product.css"
import ProductPane from "./ProductPane.js"

import ProductView from "./ProductView";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar"

function MyProductsList (props) { 
    let vendor_id = props.user.user_id;
    if (props.vendor_id) {
        vendor_id = props.vendor_id;
    }
    

    let server = "https://nutriflix-flask-backend.herokuapp.com/api"
    if (process.env.REACT_APP_REMOTE) { //set this in .env file: REACT_APP_REMOTE=1
        server = "http://localhost:8118/api"
	}
    if (process.env.NODE_ENV !== 'development') {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    // const url = `${server}/product/?display_all=True`
    
    const [results, setResults] = useState({});
    const [isListView, setIsListView] = useState(true);
    const [productView, setProductView] = useState(<ProductView />)

    useEffect(() => {
        // const interval = setInterval(() => {
        if (isListView) {
            let newUrl = `${server}/product/?display_all=True&vendor_id=${vendor_id}`
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
            })
            .catch((error) => console.log("Error: " + error))
        }
        // }, 1000);
        // return () => clearInterval(interval);
    }, [server, vendor_id, isListView])
    
    function changeView(event, type, productData) {
        setIsListView(prevIsListView => !prevIsListView);
        if (type === "product-pane") {
            setProductView(<ProductView 
                productData={productData} 
                isLoggedIn={props.isLoggedIn} 
                user={props.user} 
                onUserChange={props.onUserChange}
            />);
        }
    };


    return (
        <div>
            {/* clicking/back button toggles between product list view and individual product display */}
            {!isListView

            ? <div><button className="product_back_button" onClick={(e) => changeView(e, "product-view")}>Back</button>
                {productView}
            </div>

            : <div className="container">
                
                <div className="my_product_panel">
                    <div className="title">
                        Product Results (Total: {Object.keys(results).length})
                    </div>
                    {Object.values(results).map(product => (
                        <button className="product_panel_button" onClick={(e) => changeView(e, "product-pane", {
                            name: product["product_name"],
                            price: product["price"],
                            list_date: product["list_date"],
                            location: product["location"],
                            subscription: product["subscription"],
                            caption: product["caption"],
                            image_url: product["image_url"],
                            vendor_id: product["vendor_id"],
                            product_id: product["product_id"]
                        })}>
                            <ProductPane 
                                name={product["product_name"]} 
                                price={product["price"]}
                                list_date={product["list_date"]}
                                location={product["location"]}
                                subscription={product["subscription"]}
                                caption={product["caption"]}
                                image_url={product["image_url"]}
                                vendor_id={product["vendor_id"]}
                                product_id={product["product_id"]}
                            />
                        </button>
                    ))}
                </div>
            </div>
            }
        </div>
    );
};

export default MyProductsList;