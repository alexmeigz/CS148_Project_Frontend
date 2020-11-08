// ProductsPage.js
// Engineer: Joseph Ng, Alex Mei

import React, { useState } from 'react';
import "./Product.css"

function ProductsPage () {    
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE) { //set this in .env file: REACT_APP_REMOTE=1
        server = "http://localhost:8118/api"
	}
    if (process.env.NODE_ENV !== 'development') {
        server = "http://localhost:8118/api"
    }
    const url = `${server}/product/?display_all=True`
    
    const [results, setResults] = useState(0);

    function search(){
        fetch(url, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            console.log("Data: ")
            setResults(data)
            console.log(results)
        })
        .catch((error) => console.log("SaveCreds saveCreds: Fetch Failure (is server up?): "+ error))
    }
    

    return (
        // TODO
        <div className="container">
            <h1 className="header"> Products </h1>
            <div className="side_panel">
                <input onChange={search}></input>
            </div>
            <div className="product_panel">
                <div className="title">
                    Product Results (Total: {Object.keys(results).length})
                </div>
                <div className="product_pane">
                    <img className="product_image" 
                        src="http://alexmeicooking.com/resources/photos/brunch/french_toast.JPG"
                        alt=""
                    />
                    <div className="product_description">
                        <div className="row">
                            <div className="product_name">
                                Vanilla French Toast
                            </div>
                            <div className="product_price">
                                $12
                            </div>
                        </div>
                        <div className="row">
                            <div className="product_caption">
                                High-quality, nutritious french toast that is well within the budget of a college student! Now that's the way I like it!
                            </div>
                        </div>
                        <div className="row">
                            <div className="subscription">
                                Subscription Product
                            </div>
                            <div className="list_date">
                                Listed 11.01.2020
                            </div>
                            <div className="location">
                                Santa Barbara, CA
                            </div>
                        </div>
                    </div>
                </div>
           
                <div className="product_pane">
                    <img className="product_image" 
                        src="http://alexmeicooking.com/resources/photos/brunch/french_toast.JPG"
                        alt=""
                    />
                    <div className="product_description">
                        <div className="row">
                            <div className="product_name">
                                Vanilla French Toast
                            </div>
                            <div className="product_price">
                                $12
                            </div>
                        </div>
                        <div className="row">
                            <div className="product_caption">
                                High-quality, nutritious french toast that is well within the budget of a college student! Now that's the way I like it!
                            </div>
                        </div>
                        <div className="row">
                            <div className="subscription">
                                Subscription Product
                            </div>
                            <div className="list_date">
                                Listed 11.01.2020
                            </div>
                            <div className="location">
                                Santa Barbara, CA
                            </div>
                        </div>
                    </div>
                </div>
           
                <div className="product_pane">
                    <img className="product_image" 
                        src="http://alexmeicooking.com/resources/photos/brunch/french_toast.JPG"
                        alt=""
                    />
                    <div className="product_description">
                        <div className="row">
                            <div className="product_name">
                                Vanilla French Toast
                            </div>
                            <div className="product_price">
                                $12
                            </div>
                        </div>
                        <div className="row">
                            <div className="product_caption">
                                High-quality, nutritious french toast that is well within the budget of a college student! Now that's the way I like it!
                            </div>
                        </div>
                        <div className="row">
                            <div className="subscription">
                                Subscription Product
                            </div>
                            <div className="list_date">
                                Listed 11.01.2020
                            </div>
                            <div className="location">
                                Santa Barbara, CA
                            </div>
                        </div>
                    </div>
                </div>
           
           
           
            </div>
        
        
        </div>
    );
};

export default ProductsPage;