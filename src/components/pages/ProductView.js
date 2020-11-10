// ProductView.js
// Engineer: Joseph Ng

import React from "react";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar";

// import ProductPane from "./ProductPane.js"

import "./Product.css"

function ProductView(props) {
    return (
        <div className="product-view">
            <img className="product_image" alt="Product"
                src="http://alexmeicooking.com/resources/photos/brunch/french_toast.JPG"/>
            <div className="product_description">
                <div className="row">
                    <div className="product_name">
                        {props.productData["name"]}
                    </div>
                    <div className="product_price">
                        ${props.productData["price"]}
                    </div>
                </div>
                <div className="row">
                    <div className="product_caption">
                        {props.productData["caption"]}
                    </div>
                </div>
                <div className="row">
                    <div className="subscription">
                        {(props.productData["subscription"] && "Subscription Based") || "Single Purchase"}
                    </div>
                    <div className="list_date">
                        Listed {props.productData["list_date"]}
                    </div>
                    <div className="location">
                        {props.productData["location"] || "No Location Listed"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;