import React, { useState } from 'react';
//import Input from "../common/InputComponent.js"

function ApplForm(props) {
    //The hard brackets are "array deconstruction" operator
    //updateState (name it anything you want) is a function we'll use to update this state object below
    const [state, updateState] = useState({
        restName: "",
        // subscription: "",
        vendorType: "",
        reason: "",
        busLocation: "",
        user_id: 243
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

        let url = `${server}/application/?`
        for (const param in state) {
            if (state[param] !== "") {
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
                if (data["message"] === "Application sent successfully!") {
                    alert(`${data["message"]}`)
                    //Need to add Redirect after creating Product
                }
                else {
                    alert(`Error creating application: ${data["message"]}`)
                }
            })
            .catch((error) => console.log("Application creation error: " + error))
    }

    return (
        <div className="container">
            <h1> Create Application </h1>
            <form onSubmit={submitForm}>
                <div className="form_input">
                    <label className="form_label" for="restName"> Business Name: </label>
                    <input className="form_field" type="text" value={state.restName} name="restName" onChange={handleChange} />
                </div>

                <div className="form_input">
                    <label className="form_label" for="vendorType"> Vendor Type: </label>
                    <input className="form_field" type="text" value={state.vendorType} name="vendorType" onChange={handleChange} />
                </div>

                <div className="form_input">
                    <label className="form_label" for="reason"> Reason: </label>
                    <input className="form_field" type="text" value={state.reason} name="reason" onChange={handleChange} />
                    <br />
                </div>

                <div className="form_input">
                    <label className="form_label" for="busLocation"> Location: </label>
                    <input className="form_field" type="text" value={state.busLocation} name="busLocation" onChange={handleChange} />
                    <br />
                </div>

                {/* <div className="form_input">
                    <label className="form_label" for="caption"> Caption: </label>
                    <input className="form_field" type="text" value={state.caption} name="caption" onChange={handleChange} />
                    <br />
                </div> */}

                <input className="form_submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}
export default ApplForm;