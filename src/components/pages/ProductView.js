// ProductView.js
// Engineer: Joseph Ng

import React from "react";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar";

// import ProductPane from "./ProductPane.js"

import "./ProductView.css"

function ProductView(props) {

    function purchaseProduct(event) {
        if (!props.isLoggedIn) {
            alert("Purchase Failed: Not Logged In!");
            return;
        } else if (props.productData["price"] > props.user.credits) {
            alert("Purchase Failed: Not enough credits");
            return;
        }

        let newUserInfo = {
            ...props.user,
            credits: props.user.credits - props.productData["price"]
        }

        event.preventDefault();
        let server = "https://nutriflix-flask-backend.herokuapp.com/api"
        // let server = "http://localhost:8118/api"

        let url = `${server}/user/?`

        let required_params = ["user_id", "email", "account_type", "credits"];
        for(const param in newUserInfo){
            if (required_params.includes(param)) {
                url += `&${param}=${newUserInfo[param]}`
            }   
        }
        
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
                props.handleUserChange(newUserInfo);
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
                <button className="purchase-product" onClick={purchaseProduct}>Purchase Product</button>
            </div>
            : null
            }
            
        </div>
    );
};

export default ProductView;