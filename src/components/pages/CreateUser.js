import React, { useState } from 'react';
import {Redirect} from "react-router-dom";
//import Input from "../common/InputComponent.js"

function UserForm(props) {
    //The hard brackets are "array deconstruction" operator
    //updateState (name it anything you want) is a function we'll use to update this state object below
    const [state, updateState] = useState({
        username: "",
        password_hash: "",
        email: "",
        vendor_location: "",
    })
    //Remember that updating state means we make a complete new copy and overwrite the exisiting state
    //Remember that React.useState on state objects requires that we copy the existing state upon each update (using the "spread" operator ...state) -- see below
    const [redirect, setRedirect] = useState(false)

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
      if (process.env.REACT_APP_REMOTE === "1") { 
          server = "https://nutriflix-flask-backend.herokuapp.com/api"
      }
      if (process.env.NODE_ENV !== "development") {
          server = "https://nutriflix-flask-backend.herokuapp.com/api"
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
          setRedirect(true)
        }
        else{
          alert(`Error creating user: ${data["message"]}`)
          // setRedirect(true)
        }
      })
      .catch((error) => console.log("User Creation error: "+ error))
    }

    if (redirect) {
      return (<Redirect to="/login" />)
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
          <input className="form_field" type="text" value={state.password_hash} name="password_hash" onChange={handleChange} />
        </div>
        
        <div className="form_input">
          <label className="form_label" for="email"> Email: </label>         
          <input className="form_field" type="text" value={state.email} name="email" onChange={handleChange} />
          <br /> 
        </div>
        {/*Have this vendor location field come only if account_type == vendor*/}
        <div className="form_input">
          <label className="form_label" for="vendor_location"> Location: </label>         
          <input className="form_field" type="text" value={state.vendor_location} name="vendor_location" onChange={handleChange} />
          <br /> 
        </div>
        
        <input className="form_submit" type="submit" value="Submit" />
      </form>
      </div>
    )
}
export default UserForm;
