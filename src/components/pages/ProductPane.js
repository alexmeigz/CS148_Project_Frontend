// ProductPane.js
// Engineer: Alex Mei

import React from 'react';

function ProductPane(args) {
    return (
        <div className="product_pane">
            <img className="product_image" alt="Product"
                src="http://alexmeicooking.com/resources/photos/brunch/french_toast.JPG"/>
            <div className="product_description">
                <div className="row">
                    <div className="product_name">
                        {args["name"]}
                    </div>
                    <div className="product_price">
                        ${args["price"]}
                    </div>
                </div>
                <div className="row">
                    <div className="product_caption">
                        High-quality, nutritious french toast that is well within the budget of a college student! Now that's the way I like it!
                    </div>
                </div>
                <div className="row">
                    <div className="subscription">
                        {(args["subscription"] && "Subscription Based") || "Single Purchase"}
                    </div>
                    <div className="list_date">
                        Listed {args["list_date"]}
                    </div>
                    <div className="location">
                        {args["location"] || "No Location Listed"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPane;