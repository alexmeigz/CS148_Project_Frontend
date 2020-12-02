// OrderView.js
// Engineer: Joseph Ng

import React, { useState, useEffect } from 'react';

import ProductView from "./ProductView"

import "./Order.css"

function OrderView(props) {
     // eslint-disable-next-line
    const [result, setResult] = useState({
        product_name: "Loading"
    })

    let server = "https://nutriflix-flask-backend.herokuapp.com/api"
    // let server = "http://localhost:8118/api"
    let url = `${server}/product/?product_id=${props.order.product_id}`

    useEffect(() => {
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
    
        
    }, [url])

    function shipOrder() {
        console.log("ship")
    }

    function cancelOrder() {
        let newUrl = `${server}/user/?user_id=${props.order.buyer_id}`
        let buyer = {}
        let buyerUpdated = false;

        fetch(newUrl, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            buyer = data;
        })
        .then(data => {
            newUrl = `${server}/user/?user_id=${props.order.buyer_id}&credits=${buyer.credits + result.price}`;
            fetch(newUrl, {
                method: 'PATCH',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },              
            })
            .then(response => response.json()) 
            .then(data => {
                if(data["message"] === "User successfully updated"){
                    buyerUpdated = true;
                }
                
            })
            .then(data => {
                console.log(buyerUpdated)
                if (buyerUpdated) {
                    newUrl = `${server}/order/?order_id=${props.order.order_id}`
                    fetch(newUrl, {
                        method: 'DELETE',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },              
                    })
                    .then(response => response.json()) 
                    .then(data => {
                        if(data["message"] === "Order successfully removed"){
                            alert("Order successfully removed")
                        }
                        else{
                            alert(`Error deleting order: ${data["message"]}`)
                        }
                    })
                }
            })
        })
        .catch((error) => console.log("Error: " + error))
    }

    return (
        <div className="order-details">
            <div className="order-view">
                <div className="order-description-details">
                    <div className="row">
                        <div className="product-name">
                            Product Name: {result.product_name}
                        </div>
                        <div className="product-id">
                            Product Id: {props.order.product_id}
                        </div>
                    </div>
                    <div className="row">
                        <div className="order-id">
                            Order Id: {props.order.order_id}
                        </div>
                        <div className="status">
                            Status: {props.order.status}
                        </div>
                        <div className="update-date">
                            Update Date: {props.order.update_date}
                        </div>
                    </div>
                    {props.user.account_type === "Admin"
                        ? <div className="row">
                            <div className="seller-id">
                                Seller Id: {props.order.seller_id}
                            </div>
                            <div className="buyer-id">
                                Buyer Id: {props.order.buyer_id}
                            </div>     
                        </div>
                        : null
                    }
                </div>
                <div className="order-buttons">
                    <button className="ship-order-button" onClick={shipOrder}>Ship Order</button>
                    <button className="cancel-order-button" onClick={cancelOrder}>Cancel Order</button>
                </div>
            </div>
            
            <div className="product-details">
                
                <h1 className="title">Product Details</h1>
                <ProductView 
                    productData={result} 
                    isLoggedIn={false} 
                    user={props.user} 
                    onUserChange={props.onUserChange}
                />
            </div>
            
        </div>
    )
}

export default OrderView;