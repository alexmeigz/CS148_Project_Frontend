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

    const [decided, setDecided] = useState(false)

    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
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

    function confirmOrder() {

        // let newUrl = `${server}/order/?order_id=${props.order.order_id}&status=Confirmed`
        let newUrl = `${server}/user/?user_id=${props.order.seller_id}`
        let seller = {}
        let sellerUpdated = false;

        fetch(newUrl, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            seller = data;
            newUrl = `${server}/user/?user_id=${props.order.seller_id}&credits=${seller.credits + result.price}`;
            console.log(newUrl)
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
                    sellerUpdated = true;
                    if (sellerUpdated) {
                        newUrl = `${server}/order/?order_id=${props.order.order_id}&status=Confirmed`
                        fetch(newUrl, {
                            method: 'PATCH',
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            },              
                        })
                        .then(response => response.json()) 
                        .then(data => {
                            if(data["message"] === "Order successfully updated"){
                                alert("You indicated that you received your order")
                                setDecided(true);
                            }
                        })
                    }
                    
                }
            })
        })
        .catch((error) => console.log("Error: " + error))
    }

    function shipOrder() {

        let newUrl = `${server}/order/?order_id=${props.order.order_id}&status=Shipped`

        fetch(newUrl, {
            method: 'PATCH',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            if(data["message"] === "Order successfully updated"){
                // alert("Order successfully updated")
                alert("You indicated that you shipped your product")
                setDecided(true);
            }
            else{
                alert(`Error deleting order: ${data["message"]}`)
            }
        })
        
        .catch((error) => console.log("Error: " + error))
    }

    function refundOrder() {
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
                if (buyerUpdated) {

                    newUrl = `${server}/order/?order_id=${props.order.order_id}&status=Refunded`
                    fetch(newUrl, {
                        method: 'PATCH',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },              
                    })
                    .then(response => response.json()) 
                    .then(data => {
                        if(data["message"] === "Order successfully updated"){
                            alert("Refund is issued to the buyer")
                            setDecided(true);
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

    function deleteOrder() {
        let newUrl = `${server}/order/?order_id=${props.order.order_id}`
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
                    setDecided(true);
                }
                else{
                    alert(`Error deleting order: ${data["message"]}`)
                }
            })
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
                {props.user.user_id === props.order.seller_id || props.user.account_type === "Admin"
                    ? <div className="order-buttons">
                        <button className="ship-order-button" onClick={shipOrder} disabled={decided || props.order.status === "Shipped" || props.order.status === "Refunded" || props.order.status === "Confirmed"}>Ship Order</button>
                        <button className="refund-order-button" onClick={refundOrder} disabled={decided || props.order.status === "Refunded" || props.order.status === "Shipped" || props.order.status === "Confirmed"}>Refund Order</button>
                        <button className="delete-order-button" onClick={deleteOrder} disabled={decided || !(props.user.account_type === "Admin" || props.order.status === "Confirmed" || props.order.status === "Refunded")}>Delete Order</button>
                    </div>
                    : null
                }
                {props.user.user_id === props.order.buyer_id
                    ? <div className="order-buttons">
                        <button className="confirm-order-button" onClick={confirmOrder} disabled={(decided || props.order.status === "Pending" || props.order.status === "Confirmed" || props.order.status === "Refunded")}>Confirm Order</button>
                    </div>
                    : null
                }
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