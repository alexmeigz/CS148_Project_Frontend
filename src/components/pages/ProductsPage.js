// ProductsPage.js
// Engineer: Joseph Ng, Alex Mei

import React, { useState } from 'react';
import "./Product.css"
import ProductPane from "./ProductPane.js"
import FilterOption from "./FilterOption.js"

function ProductsPage () {    
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE) { //set this in .env file: REACT_APP_REMOTE=1
        server = "http://localhost:8118/api"
	}
    if (process.env.NODE_ENV !== 'development') {
        server = "http://localhost:8118/api"
    }
    const url = `${server}/product/?display_all=True`
    
    const [results, setResults] = useState({});
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        subscription : null
    });

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
            .catch((error) => console.log("SaveCreds saveCreds: Fetch Failure (is server up?): "+ error))
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
    
    

    return (
        <div className="container">
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
                    <ProductPane 
                        name={product["product_name"]} 
                        price={product["price"]}
                        list_date={product["list_date"]}
                        location={product["location"]}
                        subscription={product["subscription"]}
                        caption={product["caption"]}
                        />
                ))}
            </div>
        
        
        </div>
    );
};

export default ProductsPage;