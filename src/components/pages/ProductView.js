// ProductView.js
// Engineer: Joseph Ng

import React, {useState} from "react";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar";

// import ProductPane from "./ProductPane.js"

import ProductUpdatePanel from "./ProductUpdatePanel"
import AddProductReport from "./AddProductReport.js"
import "./ProductView.css"

function ProductView(props) {
    const [purchased, setPurchased] = useState(false);
    const [removed, setRemoved] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [addingReport, setAddingReport] = useState(false)

    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }

    // eslint-disable-next-line
    function login(event) {
        event.preventDefault();
        // TODO
    }
    function addReport(event) {
        event.preventDefault();
        setAddingReport((prevAdding => !prevAdding));
        setUpdating(false);
    }

    function updateProduct(event) {
        event.preventDefault();
        setUpdating((prevUpdating => !prevUpdating));
    }

    function removeProduct(event) {
        event.preventDefault();
        
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

        if (!JSON.parse(sessionStorage.getItem("isLoggedIn"))) {
            alert("Purchase Failed: Not Logged In!");
            return;
        } else if (props.productData["price"] > JSON.parse(sessionStorage.getItem("user")).credits) {
            alert("Purchase Failed: Not enough credits");
            return;
        }

        let newCredits = JSON.parse(sessionStorage.getItem("user")).credits - parseFloat(props.productData.price);


        let url = `${server}/order/?product_id=${props.productData["product_id"]}&price=${props.productData["price"]}&buyer_id=${JSON.parse(sessionStorage.getItem("user")).user_id}&seller_id=${props.productData.vendor_id}`

        fetch(url, 
        {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },           
        })
        .then(response => response.json()) 
            .then(data => {
            if(data["message"] === "Order created successfully!"){
                alert("Product successfully purchased")
                props.onUserChange({credits: newCredits});
                setPurchased(true);
                
            }
            else{
                alert(`Error updating user info: ${data["message"]}`)
            }

        })
        .catch((error) => console.log("Order creation error: "+ error))

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

            {JSON.parse(sessionStorage.getItem("isLoggedIn")) && (JSON.parse(sessionStorage.getItem("user")).user_id !== props.productData.vendor_id || JSON.parse(sessionStorage.getItem("user")).account_type === "Admin")
            ? <div>
                <button className="purchase-product" onClick={purchaseProduct} disabled={purchased}>{!purchased ? "Purchase Product": "Purchased!"}</button>
            </div>
            : null
            }

            {/* {!JSON.parse(sessionStorage.getItem("isLoggedIn"))
            ? <div>
                <button className="login-button" onClick={login} disabled={true}>Login to Purchase Product, use top right login button.</button> 
            </div>
            : null
            } */}


            {/* TODO: Waiting for product model to get updated */}
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) && (JSON.parse(sessionStorage.getItem("user")).user_id === props.productData.vendor_id || JSON.parse(sessionStorage.getItem("user")).account_type === "Admin")
            ? <div>
                <button className="remove-product" onClick={removeProduct} disabled={removed}>{!removed ? "Remove Product": "Removed!"}</button>
                <button className="update-product" onClick={updateProduct} disabled={removed}>{!updating ? "Update Product": "Cancel Updating Product"}</button>
            </div>
            : null
            }
            { props.isLoggedIn &&
                    <button className="post-button" onClick={addReport} disabled={removed}>{!addingReport ? "Add Report": "Cancel Report"}</button>
            }


            {updating
            ? <ProductUpdatePanel productData={props.productData} cancelUpdate={() => setUpdating(false)}/>
            : null
            }
            {addingReport ?
                    <AddProductReport productData={props.productData} cancelComment={() => setAddingReport(false)}/>
                :
                    null
            }
            
        </div>
    );
};

export default ProductView;