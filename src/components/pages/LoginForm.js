import React, { useState } from 'react';
//import Input from "../common/InputComponent.js"

function LoginForm(props) {
    //The hard brackets are "array deconstruction" operator
    //updateState (name it anything you want) is a function we'll use to update this state object below
    const [state, updateState] = useState({
        login: true,
        username: "",
        password_hash: "",
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
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },           
      })
      .then(response => response.json()) 
	    .then(data => {
        if(data["username"] === state["username"]){
          alert(`Successfully logged in to account ${state["username"]}`)
          //Need to add Redirect after creating User
          handleLoginChange(true); // Joseph: This makes the webpage in logged in state
          handleUserChange(data);
        }
        else{
          alert(`Error logging in user: ${data["message"]}`)
        }
      })
      .catch((error) => console.log("User login error: "+ error))
    }

    // Joseph: for updating login state
    function handleLoginChange(value) {
      props.onLoginChange(value)
    }

    function handleUserChange(value) {
      props.onUserChange(value)
    }

    return (
      <div className="container">
        <h1> Log In to your Account</h1>
        <form onSubmit={submitForm}>
        <div className="form_input">
          <label className="form_label" for="username"> Username: </label>  
          <input className="form_field" type="text" value={state.username} name="username" onChange={handleChange} />
        </div>

        <div className="form_input">
          <label className="form_label" for="password_hash"> Password: </label>  
          <input className="form_field" type="text" value={state.password_hash} name="password_hash" onChange={handleChange} />
        </div>
        
        
        <input className="form_submit" type="submit" value="Log in" disabled={props.isLoggedIn}/>
      </form>
      </div>
    )
}
export default LoginForm;
