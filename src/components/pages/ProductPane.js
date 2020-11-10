// ProductPane.js
// Engineer: Alex Mei

import React from 'react';

function ProductPane(props) {
    return (
        <div className="product_pane">
            <img className="product_image" alt="Product"
                src="http://alexmeicooking.com/resources/photos/brunch/french_toast.JPG"/>
            <div className="product_description">
                <div className="row">
                    <div className="product_name">
                        {props["name"]}
                    </div>
                    <div className="product_price">
                        ${props["price"]}
                    </div>
                </div>
                <div className="row">
                    <div className="product_caption">
                        {props["caption"]}
                    </div>
                </div>
                <div className="row">
                    <div className="subscription">
                        {(props["subscription"] && "Subscription Based") || "Single Purchase"}
                    </div>
                    <div className="list_date">
                        Listed {props["list_date"]}
                    </div>
                    <div className="location">
                        {props["location"] || "No Location Listed"}
                    </div>
                </div>
            </div>
        </div>
    ); 
};

export default ProductPane;