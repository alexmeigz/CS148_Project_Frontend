// ProductUpdatePanel.js
// Engineer: Joseph Ng

import React, {useState} from "react";

function ProductUpdatePanel(props) {
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    // eslint-disable-next-line
    const [newInfo, setNewInfo] = useState({
        ...props.productData,
        product_name: "",
        subscription: "",
        price: "",
        caption: "",
        image_url: "",
        location: "",
        frequency: ""
    })
    console.log(props.productData)
    console.log(newInfo)


    function handleChange(evt) { //updating form elements, nested function
        const name = evt.target.name //defined in render
        const value = evt.target.value //defined in render
	  //because we are using a single state object above to hold multiple properties, we must save off the current state first (b/c we are only updating part of the object).  To do this, we "spread" state via ...state and add it to the new copy of state that updateState is creating, followed by any updates we want:
	  setNewInfo({
        ...newInfo,
        [name]: value
      })
    }

    // eslint-disable-next-line
    // function resetParam() {
    //     setNewInfo((prevNewInfo) => ({
    //         ...props.productData,
    //         product_name: "",
    //         subscription: "",
    //         price: "",
    //         caption: "",
    //         image_url: "",
    //         location: "",
    //         frequency: ""
    //     }))
    // }

    function submitUpdateProduct(event) {
        event.preventDefault();

        let requiredParams = ["product_id", "vendor_id", "product_name", "subscription", "price", "caption", "image_url"]
        let optionalParams = ["location"]


        let url = `${server}/product/?`

        requiredParams.forEach((param, index) => {
            if (newInfo["product_name"] === "") {
                newInfo["product_name"] = newInfo["name"]
            }
            else if (newInfo[param] === "") {
                newInfo[param] = props.productData[param]
            }
            url += `&${param}=${newInfo[param]}`
        });
        
        optionalParams.forEach((param, index) => {
            if (newInfo[param] !== "") {
                 url += `&${param}=${newInfo[param]}`
            } else {
                newInfo[param] = props.productData[param]; 
            }
        });

        console.log(url)

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
                if(data["message"] === "Product successfully updated"){
                    alert("Product successfully updated")
                    props.cancelUpdate()
                }
                else{
                    alert(`Error updating product: ${data["message"]}`)
                }
            })
            .catch((error) => console.log("Product update error: "+ error))

    }

    return (
        <div>
            <h1>Update Product</h1>
            <form onSubmit={submitUpdateProduct}>
                <div className="form_input">
                <label className="form_label" for="product_name"> Product Name: </label>  
                <input className="form_field" type="text" value={newInfo.product_name} name="product_name" onChange={handleChange} />
                </div>
                
                <div className="form_input">
                <label className="form_label" for="subscription"> Subscription Product? </label>         
                <input className="form_field" type="text" value={newInfo.subscription} name="subscription" onChange={handleChange} />
                </div>
                
                <div className="form_input">
                <label className="form_label" for="price"> Price: </label>         
                <input className="form_field" type="text" value={newInfo.price} name="price" onChange={handleChange} />
                <br /> 
                </div>
                
                <div className="form_input">
                <label className="form_label" for="location"> Location: </label>         
                <input className="form_field" type="text" value={newInfo.location} name="location" onChange={handleChange} />
                <br /> 
                </div>
                
                <div className="form_input">
                <label className="form_label" for="caption"> Caption: </label>         
                <input className="form_field" type="text" value={newInfo.caption} name="caption" onChange={handleChange} />
                <br /> 
                </div>

                <div className="form_input">
                <label className="form_label" for="caption"> Product Image: </label>         
                <input className="form_field" type="text" value={newInfo.image_url} name="image_url" onChange={handleChange} />
                <br /> 
                </div>
                
                <input className="form_submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default ProductUpdatePanel;