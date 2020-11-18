// ProductPane.js
// Engineer: Alex Mei

import React from 'react';

function ProductPane(props) {
    return (
        <div className="product_pane">
            <img className="product_image" alt=""
                src={props["image_url"] !== null 
                    ? props["image_url"]
                    : "https://longsshotokan.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                }
            />
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