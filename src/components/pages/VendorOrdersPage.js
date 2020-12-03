// VendorOrdersPage.js
// Engineer: Joseph Ng

import React, { useState, useEffect } from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

import OrderPane from "./OrderPane";
import OrderView from "./OrderView";

import "./Order.css"


function VendorOrdersPage(props) {
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    let url = `${server}/order/?display_all=True&seller_id=${props.user.user_id}`

    if (props.user.account_type === "Admin") {
        url = `${server}/order/?display_all=True`
    }
    
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
                isLoggedIn={props.isLoggedIn} 
                user={props.user} 
                onUserChange={props.onUserChange} 
                order={orderData.order}
                isListView={isListView}
            />);
        }
    };

    return (
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={props.onLoginChange} user={props.user}/>
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={props.onUserChange}/> : null}


            {!isListView

            ? <div><button className="order-back-button" onClick={(e) => changeView(e, "order-view")}>Back</button>
                {orderView}
            </div>

            : <div className="container">
                <h1> Orders </h1>
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
                                user={props.user}
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


export default VendorOrdersPage;