// ProductView.js
// Engineer: Joseph Ng

import React, {useState} from "react";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar";

// import ProductPane from "./ProductPane.js"

import "./ProductView.css"

function ProductView(props) {
    const [purchased, setPurchased] = useState(false);

    function purchaseProduct(event) {
        event.preventDefault();

        if (!props.isLoggedIn) {
            alert("Purchase Failed: Not Logged In!");
            return;
        } else if (props.productData["price"] > props.user.credits) {
            alert("Purchase Failed: Not enough credits");
            return;
        }

        let newCredits = props.user.credits - parseFloat(props.productData.price);

        let server = "https://nutriflix-flask-backend.herokuapp.com/api"
        // let server = "http://localhost:8118/api"

        let url = `${server}/user/?`

        let required_params = ["user_id"];
        for(const param in props.user){
            if (required_params.includes(param)) {
                url += `&${param}=${props.user[param]}`
            }   
        }

        url += `&credits=${newCredits}`

        
        fetch(url, 
            {
                method: 'PATCH',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },           
            })
            .then(response => response.json()) 
                .then(data => {
                if(data["message"] === "User successfully updated"){
                    alert("Product successfully purchased")
                    props.onUserChange({credits: newCredits});
                    setPurchased(true);
                }
                else{
                    alert(`Error updating user info: ${data["message"]}`)
                }
            })
            .catch((error) => console.log("User update error: "+ error))

        // TODO: send message to vendor
    }

    return (
        <div className="product-pane">
            <img className="product-image" alt="Product"
                src={props.productData["image_url"] !== null 
                    ? props.productData["image_url"]
                    : "https://longsshotokan.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                }
            />
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
            {props.isLoggedIn
            ? <div>
                <button className="purchase-product" onClick={purchaseProduct} disabled={purchased}>{!purchased ? "Purchase Product": "Purchased!"}</button>
            </div>
            : null
            }
            
        </div>
    );
};

export default ProductView;