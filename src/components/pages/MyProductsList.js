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
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE) { //set this in .env file: REACT_APP_REMOTE=1
        server = "http://localhost:8118/api"
	}
    if (process.env.NODE_ENV !== 'development') {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    const url = `${server}/product/?display_all=True`
    
    const [results, setResults] = useState({});
    const [isListView, setIsListView] = useState(true);
    const [productView, setProductView] = useState(<ProductView />)

    useEffect((url) => {
        let newUrl = `http://localhost:8118/api/product/?display_all=True&vendor_id=9`
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
    }, [])
    
    function changeView(event, type, productData) {
        setIsListView(prevIsListView => !prevIsListView);
        if (type === "product-pane") {
            setProductView(<ProductView productData={productData} />);
            console.log(url)
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
                <h1> Products </h1>

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
                            image_url: product["image_url"]
                        })}>
                            <ProductPane 
                                name={product["product_name"]} 
                                price={product["price"]}
                                list_date={product["list_date"]}
                                location={product["location"]}
                                subscription={product["subscription"]}
                                caption={product["caption"]}
                                image_url={product["image_url"]}
                            />
                        </button>
                    ))}
                </div>
            }
        </div>
    );
};

export default MyProductsList;