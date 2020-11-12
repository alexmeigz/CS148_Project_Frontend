import React, { useState } from 'react';
//import Input from "../common/InputComponent.js"

function UserForm(props) {
    //The hard brackets are "array deconstruction" operator
    //updateState (name it anything you want) is a function we'll use to update this state object below
    const [state, updateState] = useState({
        username: "",
        password_hash: "",
        email: "",
        account_type: "",
        vendor_location: "",
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

    const submitForm = (evt) => {  //send creds to backend, nested arrow function
	    evt.preventDefault();
	
      let server = "http://localhost:8118/api"
      if (process.env.REACT_APP_REMOTE) { //set this in .env file: REACT_APP_REMOTE=1
        server = "http://localhost:8118/api"
	  }
      if (process.env.NODE_ENV !== 'development') {
        server = "http://localhost:8118/api"
    }
    
    let url = `${server}/user/?`
    for(const param in state){
      if(state[param] !== ""){
        url += `&${param}=${state[param]}`
      }
    }

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
        if(data["message"] === "User created successfully!"){
          alert(`${data["message"]}`)
          //Need to add Redirect after creating User
        }
        else{
          alert(`Error creating user: ${data["message"]}`)
        }
      })
      .catch((error) => console.log("User Creation error: "+ error))
    }

    return (
      <div className="container">
        <h1> Create Account </h1>
        <form onSubmit={submitForm}>
        <div className="form_input">
          <label className="form_label" for="username"> Username: </label>  
          <input className="form_field" type="text" value={state.username} name="username" onChange={handleChange} />
        </div>
        
        <div className="form_input">
          <label className="form_label" for="password_hash"> Password: </label>         
          <input className="form_field" type="text" value={state.subscription} name="password_hash" onChange={handleChange} />
        </div>
        
        <div className="form_input">
          <label className="form_label" for="email"> Email: </label>         
          <input className="form_field" type="text" value={state.price} name="email" onChange={handleChange} />
          <br /> 
        </div>
        {/*Change this account_type field so that user can only select options for account type instead of  typing it*/}
        <div className="form_input">
          <label className="form_label" for="account_type"> Account Type: </label>         
          <input className="form_field" type="text" value={state.location} name="account_type" onChange={handleChange} />
          <br /> 
        </div>
        {/*Have this vendor location field come only if account_type == vendor*/}
        <div className="form_input">
          <label className="form_label" for="vendor_location"> Vendor Location: </label>         
          <input className="form_field" type="text" value={state.caption} name="vendor_location" onChange={handleChange} />
          <br /> 
        </div>
        
        <input className="form_submit" type="submit" value="Submit" />
      </form>
      </div>
    )
}
export default UserForm;
