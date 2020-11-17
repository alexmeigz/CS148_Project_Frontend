import React, { useState } from 'react';
//import Input from "../common/InputComponent.js"

function RecipeCall(props) {
    //The hard brackets are "array deconstruction" operator
    //updateState (name it anything you want) is a function we'll use to update this state object below
    const [state, updateState] = useState({
        product_name: "",
        subscription: "",
        price: "",
        caption: "",
        location: "",
        image_url: "",
        vendor_id: 243
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
            server = "https://nutriflix-flask-backend.herokuapp.com/api"
        }
        if (process.env.NODE_ENV !== 'development') {
            server = "https://nutriflix-flask-backend.herokuapp.com/api"
        }

        let url = `https://api.edamam.com/search?q=${query}&app_id=91203381&app_key=0449d632515eb9ee5ed2ed611e0c8032&from=0&to=3`
        for (const param in state) {
            if (state[param] !== "") {
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
                params: {
                    'q': 'coffee'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data["more"]) {
                    alert(`${data["message"]}`)
                    //Need to add Redirect after creating Product
                }
                else {
                    alert(`Error with parameters`)
                }
            })
            .catch((error) => console.log("Recipe call error: " + error))
    }

    return (
        <div className="container">
        </div>
    )
}
export default RecipeCall;