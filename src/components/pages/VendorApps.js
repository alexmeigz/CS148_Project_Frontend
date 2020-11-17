// MyProductsList.js
// Engineer: Alex Mei

import React, { useState, useEffect } from 'react';

import "./Product.css"
import ProductView from "./ProductView";

function VendorApps (props) {   
    const [results, setResults] = useState({});
    const [isListView, setIsListView] = useState(true);
    const [productView, setProductView] = useState(<ProductView />)

    useEffect(() => {
        const url = `http://localhost:8118/api/application/?display_all=True`
        fetch(url, {
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
                <h1> Vendor Applications </h1>

                    <div className="title">
                        Active Applications (Total: {Object.keys(results).length})
                    </div>
                    <table>
                        <tr className="header_row">
                            <th> User </th>
                            <th> Apply Date </th>
                            <th> App Type </th>
                        </tr>
                        
                        {Object.values(results).map(application => (
                            <tr> 
                                <td> {application["user_id"]} </td>
                                <td> {application["applsDate"]} </td>
                                <td> {application["vendorType"]} </td>
                                <td> <button> See Details </button></td>
                            </tr>      
                        ))}
                    </table>
                    
                </div>
            }
        </div>
    );
};

export default VendorApps;