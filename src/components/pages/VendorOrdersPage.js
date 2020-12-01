// VendorOrdersPage.js
// Engineer: Joseph Ng

import React, { useState, useEffect } from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

import OrderPane from "./OrderPane";



function VendorOrdersPage(props) {
    let server = "https://nutriflix-flask-backend.herokuapp.com/api"
    // let server = "http://localhost:8118/api"
    const url = `${server}/order/?display_all=True`
    
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
            // setVendorView(<VendorOrdersView 
            //     isLoggedIn={props.isLoggedIn} 
            //     user={props.user} 
            //     onUserChange={props.onUserChange} 
            //     order={orderData.order}
            // />);
        }
    };

    return (
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={props.onLoginChange} user={props.user}/>
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={props.onUserChange}/> : null}


            {!isListView

            ? <div><button className="order_back_button" onClick={(e) => changeView(e, "order-view")}>Back</button>
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
                <div className="order_panel">
                    <div className="title">
                        Order Results (Total: {Object.keys(results).length})
                    </div>
                    {Object.values(results).map(order => (
                        <button className="order_panel_button" onClick={(e) => changeView(e, "order-pane", {
                            // name: product["product_name"],
                            // price: product["price"],
                            // list_date: product["list_date"],
                            // location: product["location"],
                            // subscription: product["subscription"],
                            // caption: product["caption"],
                            // image_url: product["image_url"],
                            // vendor_id: product["vendor_id"],
                            // product_id: product["product_id"]
                        })}>
                            <OrderPane 
                                orderData={order}
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