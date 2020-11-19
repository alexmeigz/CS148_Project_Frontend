// ProductsList.js
// Engineer: Joseph Ng, Alex Mei

import React, { useState } from 'react';

import "./Product.css"
import ProductPane from "./ProductPane.js"
import FilterOption from "./FilterOption.js"

import ProductView from "./ProductView";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar"

function ProductsList (props) {   
    //let server = "https://nutriflix-flask-backend.herokuapp.com/api"
    let server = "http://localhost:8118/api"
    const url = `${server}/product/?display_all=True`
    
    const [results, setResults] = useState({});
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        subscription : null
    });

    const [isListView, setIsListView] = useState(true);
    const [productView, setProductView] = useState(<ProductView />)

    function search(e){
        if(e.key === "Enter"){
            setQuery(e.target.value)
            let newUrl = url + `&product_name=${e.target.value}`
            if(filters["subscription"] != null){
                newUrl += `&subscription=${filters["subscription"]}`
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
            })
            .catch((error) => console.log("Error: " + error))
        }
    }

    function filter(param, value){
        console.log(query)
        let newUrl = url + `&product_name=${query}`
        if(param != null){
            newUrl += `&${param}=${value}`
        }
        console.log(newUrl)
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
        .catch((error) => console.log("SaveCreds saveCreds: Fetch Failure (is server up?): "+ error))
    }
    
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
                <h1> Products </h1>
                <div className="side_panel">
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
                </div>
                <div className="product_panel">
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
                    {/* Remove below (testing only) */}
                    {/* <button className="product_panel_button" onClick={(e) => changeView(e, "product-pane", {
                        name: "Test Name1",
                        price: 10.99,
                        list_date: "nov",
                        location: "Santa Barbara",
                        subscription: true,
                        caption: "This is a long testing caption and stuff",
                    })}>
                        <ProductPane 
                            name="Test Name1" 
                            price={10.99}
                            list_date="nov"
                            location="Santa Barbara"
                            subscription={true}
                            caption="This is a long testing caption and stuff"
                        />
                    </button>
                    <button className="product_panel_button" onClick={(e) => changeView(e, "product-pane", {
                        name: "Test Name2",
                        price: 10.99,
                        list_date: "nov",
                        location: "Santa Barbara",
                        subscription: true,
                        caption: "caption",
                    })}>
                        <ProductPane 
                            name="Test Name2" 
                            price={10.99}
                            list_date="nov"
                            location="Santa Barbara"
                            subscription={true}
                            caption="caption"
                        />
                    </button>
                    <button className="product_panel_button" onClick={(e) => changeView(e, "product-pane", {
                        name: "Test Name3",
                        price: 10.99,
                        list_date: "nov",
                        location: "Santa Barbara",
                        subscription: true,
                        caption: "caption",
                    })}>
                        <ProductPane 
                            name="Test Name3" 
                            price={10.99}
                            list_date="nov"
                            location="Santa Barbara"
                            subscription={true}
                            caption="caption"
                        />
                    </button> */}
                    {/* remove above (testing only) */}
                </div>
            </div>}
        </div>
    );
};

export default ProductsList;