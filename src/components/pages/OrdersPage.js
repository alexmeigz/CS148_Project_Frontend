// OrdersPage.js
// Engineer: Joseph Ng

import React, { useState, useEffect } from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

import OrderPane from "./OrderPane";
import OrderView from "./OrderView";

import "./Order.css"


function OrdersPage(props) {
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    let url = `${server}/order/?display_all=True&buyer_id=${JSON.parse(sessionStorage.getItem("user")).user_id}`

    // if (JSON.parse(sessionStorage.getItem("user")).account_type === "Admin") {
    //     url = `${server}/order/?display_all=True`
    // }
    
    const [results, setResults] = useState({});

    const [isListView, setIsListView] = useState(true);
    // eslint-disable-next-line
    const [orderView, setOrderView] = useState()

    useEffect(() => {
        if (isListView) {
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
        }
        
    }, [isListView, url])

    function changeView(event, type, orderData) {
        setIsListView(prevIsListView => !prevIsListView);
        if (type === "order-pane" && orderData && isListView) {
            setOrderView(<OrderView 
                isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} 
                user={JSON.parse(sessionStorage.getItem("user"))} 
                onUserChange={props.onUserChange} 
                order={orderData.order}
                isListView={isListView}
            />);
        }
    };

    return (
        <div>
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={props.onLoginChange} user={JSON.parse(sessionStorage.getItem("user"))}/>
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={props.onUserChange}/> : null}


            {!isListView

            ? <div><button className="order-back-button" onClick={(e) => changeView(e, "order-view")}>Back</button>
                {orderView}
            </div>

            : <div className="container">
                <h1> My Orders </h1>
                {/* <div className="side_panel">
                    <input className="search_bar" placeholder="Search products..." onKeyDown={search} />
                    <div className="title">
                        Filters
                    </div>
                    <div className="filters"> 
                        <FilterOption name="Single Purchase" param="subscription" value="" 
                            filters={filters} changeFilter={setFilters} onChange={filter} field={filters.subscription} 
                        />
                        <FilterOption name="Subscription Based" param="subscription" value="true" 
                            filters={filters} changeFilter={setFilters} onChange={filter} field={filters.subscription}
                        />
                    </div>
                </div> */}
                <div className="order-panel">
                    <div className="title">
                        Order Results (Total: {Object.keys(results).length})
                    </div>
                    {Object.values(results).map(order => (
                        <button className="order-panel-button" onClick={(e) => changeView(e, "order-pane", {
                            order: order
                        })}>
                            <OrderPane 
                                orderData={order}
                                isListView={isListView}
                                user={JSON.parse(sessionStorage.getItem("user"))}
                            />
                        </button>
                    ))}
                </div>
            </div>
            }

            <ContactUsFooter />
        </div>
    )

}


export default OrdersPage;