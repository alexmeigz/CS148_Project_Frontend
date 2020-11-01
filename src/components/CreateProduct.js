import React, { useState } from 'react';

function ProductForm(props) {
    //The hard brackets are "array deconstruction" operator
    //updateState (name it anything you want) is a function we'll use to update this state object below
    const [state, updateState] = useState({
        product_name: "",
        subscription: "",
        price: "",
    })
    //Remember that updating state means we make a complete new copy and overwrite the exisiting state
    //Remember that React.useState on state objects requires that we copy the existing state upon each update (using the "spread" operator ...state) -- see below

    function handleChange(evt) { //updating form elements, nested function
        const name = evt.target.name //defined in render
        const value = evt.target.value //defined in render
	  //because we are using a single state object above to hold multiple properties, we must save off the current state first (b/c we are only updating part of the object).  To do this, we "spread" state via ...state and add it to the new copy of state that updateState is creating, followed by any updates we want:
	  updateState({
        ...state,
        [name]: value
      })
    }

    const saveCreds = (evt) => {  //send creds to backend, nested arrow function
	    evt.preventDefault();
      alert(`Submitting ${state.product_name}, ${state.subscription}, and ${state.price}`)
	
      let server = "http://localhost:8118/api"
      if (process.env.REACT_APP_REMOTE) { //set this in .env file: REACT_APP_REMOTE=1
        server = "http://localhost:8118/api"
	  }
      if (process.env.NODE_ENV !== 'development') {
        server = "http://localhost:8118/api"
    }
	  console.log("server = "+server)
    const url = `${server}/product/?product_name=${state.product_name}`
      + `&subscription=${state.subscription}&price=${state.price}`
    fetch(url, 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },           
        body: {}   
      })
      .then(response => response.json()) 
	    .then(data => {
        console.log(data) //log response
        if(data["message"] == "Product created successfully!"){
          console.log("Success") //Need to add Redirect after creating Product
        }
        else{
          console.log("Failed")
        }
      })
      .catch((error) => console.log("Product creation error: "+ error))
    }

    //See this example on Creating Custom Hooks at  https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/ to preclude the need to add a function handleChange for each onChange event
    return (
      <div> {/* JSX comments look like this */}
      {/*print out the NODE_ENV set by the server and our user defined REACT_APP_REMOTE variable value (no value means its undefined) */}
      <h3>Server: {process.env.NODE_ENV}, REACT_APP_REMOTE = {process.env.REACT_APP_REMOTE} </h3>
      <form onSubmit={saveCreds}>
        <label>
          Product Name: 
          <input 
            type="text" 
            value={state.product_name} 
            name="product_name" 
            onChange={handleChange} />
        </label> 
        <br />
        <label>
          Subscription Product?
          <input 
	    type="text" 
	    value={state.subscription} 
	    name="subscription" 
	    onChange={handleChange} />
        </label>
        <br />
        <label>
          Price: 
          <input 
            type="text" 
            value={state.price} 
            name="price" 
            onChange={handleChange} />
        </label> 
        <br />
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
}
export default ProductForm;
