// OrderPane.js
// Engineer: Joseph Ng

import React, { useState, useEffect } from 'react';
import "./Order.css"


function OrderPane(props) {
    // eslint-disable-next-line
    const [result, setResult] = useState({
        product_name: "Loading"
    })

    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    let url = `${server}/product/?product_id=${props.orderData.product_id}`
    

    useEffect(() => {
        if (props.isListView) {
            fetch(url, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },              
            })
            .then(response => response.json()) 
            .then(data => {
                setResult(data)
            })
            .catch((error) => console.log("Error: " + error))
        }
        
    }, [props.isListView, url])

    return (
        <div className="order-pane">
            <div className="order-description">
                <div className="row">
                    <div className="product-name">
                        {result.product_name}
                    </div>
                    <div className="product-id">
                        Product Id: {props.orderData.product_id}
                    </div>
                </div>
                <div className="row">
                    <div className="order-id">
                        Order Id: {props.orderData.order_id}
                    </div>
                    <div className="status">
                        Status: {props.orderData.status}
                    </div>
                    <div className="update-date">
                        Update Date: {props.orderData.update_date}
                    </div>
                </div>
                {JSON.parse(sessionStorage.getItem("user")).account_type === "Admin"
                    ? <div className="row">
                        <div className="seller-id">
                            Seller Id: {props.orderData.seller_id}
                        </div>
                        <div className="buyer-id">
                            Buyer Id: {props.orderData.buyer_id}
                        </div>     
                    </div>
                    : null
                }
            </div>
        </div>
        
    )
}

export default OrderPane;