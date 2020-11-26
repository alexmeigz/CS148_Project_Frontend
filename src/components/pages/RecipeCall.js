import React, { useState } from 'react';
import Display from './Display';
import "./RecipeCall.css";

function RecipeCall(props) {
    const [state, updateState] = useState({
        q: "",
        health: "",
        showHideDemo: false
    })

    const [results, setResults] = useState({});

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
        // alert("button clicked")
        evt.preventDefault();

        let url = `https://api.edamam.com/search?q=${state.q}&app_id=91203381&app_key=0449d632515eb9ee5ed2ed611e0c8032&from=0&to=3`
        let newUrl = url;
        if (state.health !== "") {
            newUrl += `&health=${state.health}`
        }
        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data["more"]) {
                    setResults(data)
                    state.showHideDemo = true;

                    alert(`${results["hits"][0]["recipe"]["shareAs"]}`)
                    // console.log(data)

                }
                else {
                    alert(`Error with parameters`)
                }
            })
            .catch((error) => console.log("Recipe call error: " + error))
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form_input">
                    <label className="form_label" for="q"> Search: </label>
                    <input className="form_field" type="text" value={state.q} name="q" onChange={handleChange} />
                    <label className="form_label" for="health"> Health: </label>
                    <input className="form_field" type="text" value={state.health} name="health" onChange={handleChange} />
                </div>
                <input className="form_submit" type="submit" value="Submit" />
            </form>
            {/* {isTrue === 1 ?
                <Display
                    website={results["hits"][0]["recipe"]["shareAs"]}
                    imgUrl={results["hits"][0]["recipe"]["image"]}
                    info={"hi"}
                />
                : null
            } */}
            {state.showHideDemo &&
                <div className="all">
                    <Display
                        website={results["hits"][0]["recipe"]["shareAs"]}
                        imgUrl={results["hits"][0]["recipe"]["image"]}
                        info={results["hits"][0]["recipe"]["label"]}
                    />
                    <Display
                        website={results["hits"][1]["recipe"]["shareAs"]}
                        imgUrl={results["hits"][1]["recipe"]["image"]}
                        info={results["hits"][1]["recipe"]["label"]}
                    />
                    <Display
                        website={results["hits"][2]["recipe"]["shareAs"]}
                        imgUrl={results["hits"][2]["recipe"]["image"]}
                        info={results["hits"][2]["recipe"]["label"]}
                    />
                </div>
            }
        </div>
    )
}
export default RecipeCall;