// ProductView.js
// Engineer: Joseph Ng

import React from "react";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar";

// import ProductPane from "./ProductPane.js"

import "./ProductView.css"

function ProductView(props) {

    return (
        <div className="product-pane">
            <img className="product-image" alt="Product"
                src={props.productData["image_url"]}/>
            <div className="product-description">
                <div className="row">
                    <div className="product-name">
                        {props.productData["name"]}
                    </div>
                    <div className="product-price">
                        ${props.productData["price"]}
                    </div>
                </div>
                <div className="row">
                    <div className="product-caption">
                        {props.productData["caption"]}
                    </div>
                </div>
                <div className="row">
                    <div className="product-subscription">
                        {(props.productData["subscription"] && "Subscription Based") || "Single Purchase"}
                    </div>
                    <div className="list-date">
                        Listed {props.productData["list_date"]}
                    </div>
                    <div className="product-location">
                        {props.productData["location"] || "No Location Listed"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;