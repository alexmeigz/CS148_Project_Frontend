import React, { useState } from 'react';
//import Input from "../common/InputComponent.js"

function ReportForm(props) {
    //The hard brackets are "array deconstruction" operator
    //updateState (name it anything you want) is a function we'll use to update this state object below
    const [state, updateState] = useState({
        login: true,
        userReporter_id: 1,
        reportedUser_id: 2,
        reportText: "",
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
    
    
    let url = `${server}/report/?`
    for(const param in state){
      if(state[param] !== "" && param !== 'reportText' && param !== 'login'){
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
        body: state.reportText,         
      })
      .then(response => response.json()) 
      .then(data => {
      if(data["message"] === "Report submitted successfully!"){
        alert(`${data["message"]}`)
        //Need to add Redirect after creating Report
      }
      else{
        alert(`Error submitting report: ${data["message"]}`)
      }
    })
    .catch((error) => console.log("Form submission error: "+ error))
  }

  return (
    <div className="container">
      <h1> Submit User Report </h1>
      <form onSubmit={submitForm}>
      <div className="form_input">
        <label className="form_label" for="reportText"> Report Details: </label>  
        <input className="form_field" type="text" value={state.reportText} name="reportText" onChange={handleChange} />
      </div>

      <input className="form_submit" type="submit" value="Submit" />
    </form>
    </div>
  )
}
export default ReportForm;
