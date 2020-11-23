// PostView.js
// Engineer: Alex Mei

import React, {useState} from "react";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar";

// import ProductPane from "./ProductPane.js"

import "./ProductView.css"

function PostView(props) {
    const [purchased, setPurchased] = useState(false);
    const [removed, setRemoved] = useState(false);
    // eslint-disable-next-line
    const [updating, setUpdating] = useState(false);

    function login(event) {
        event.preventDefault();
        // TODO
    }

    function updateProduct(event) {
        event.preventDefault();
        // TODO
    }

    function removeProduct(event) {
        event.preventDefault();
        
        // let server = "https://nutriflix-flask-backend.herokuapp.com/api"
        let server = "http://localhost:8118/api"

        let url = `${server}/product/?product_id=${props.productData["product_id"]}`

        fetch(url, 
            {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },           
            })
            .then(response => response.json()) 
                .then(data => {
                if(data["message"] === "Product successfully removed"){
                    alert("Product successfully removed")
                    setRemoved(true);
                }
                else{
                    alert(`Error deleting product: ${data["message"]}`)
                }
            })
            .catch((error) => console.log("Product delete error: "+ error))
    }

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
            <div className="row">
                <img className="post-image" alt=""
                    src={props.postData["image_url"] && props.postData["image_url"]}
                />
                <div className="column">
                    <div className="post-title">
                        {props.postData["title"]}
                    </div>
                    <div className="row">
                        <div className="post-user">
                            {}
                        </div>
                        <div className="post-time">
                            {props.postData["last_edit"]}
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-caption">
                {props.postData["content"]}
            </div>
            <div className="row">
                <div className="post-reacts">
                    Reacts
                </div>
                <div className="post-comments">
                    Comments
                </div>
            </div>

            {props.isLoggedIn 
            ? <div>
                <button className="purchase-product" onClick={purchaseProduct} disabled={purchased}>{!purchased ? "Purchase Product": "Purchased!"}</button>
            </div>
            : null
            }

            {!props.isLoggedIn
            ? <div>
                <button className="login-button" onClick={login} disabled={true}>Login to Purchase Product, use top right login button.</button> 
            </div>
            : null
            }


            {/* TODO: Waiting for product model to get updated */}
            {
            <div>
                <button className="remove-product" onClick={removeProduct} disabled={removed}>{!removed ? "Remove Product": "Removed!"}</button>
                <button className="update-product" onClick={updateProduct} disabled={true}>{!updating ? "Update Product": "Submit Update!"}</button>
            </div>
            }
            
        </div>
    );
};

export default PostView;