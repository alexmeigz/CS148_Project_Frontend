import React, { useState } from 'react';
import Display from './Display';
import "./RecipeCall.css";

function RecipeCall(props) {
    const [state, updateState] = useState({
        q: "",
        health: "",
        // calories: "",
        excluded: "",
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

        let url = `https://api.edamam.com/search?q=${state.q}&app_id=394088d7&app_key=cc0cb85ce098f755f855195231d1fe9f&from=0&to=60`
        let newUrl = url;
        if (state.health !== "") {
            newUrl += `&health=${state.health}`
        }
        if (state.excluded !== "") {
            newUrl += `&excluded=${state.excluded}`
        }
        // if (state.calories !== "") {
        //     newUrl += `&calories=${state.calories}`
        // }
        fetch(newUrl,
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
            <br />
            <form onSubmit={submitForm}>
                <div className="form_input">
                    <label className="form_label" for="q"> Search: </label>
                    <input className="form_field" type="text" value={state.q} name="q" onChange={handleChange} />
                </div>
                <div className="form_input">
                    <label className="form_label" for="health"> Health: </label>
                    <input className="form_field" type="text" value={state.health} name="health" onChange={handleChange} />
                </div>
                {/* <div className="form_input">
                    <label className="form_label" for="calories"> Calories: </label>
                    <input className="form_field" type="text" value={state.calories} name="calories" onChange={handleChange} />
                </div> */}
                <div className="form_input">
                    <label className="form_label" for="excluded"> Excluded: </label>
                    <input className="form_field" type="text" value={state.excluded} name="excluded" onChange={handleChange} />
                </div>
                <br /><br /><br />
                <center><input className="form_submit" type="submit" value="Submit" /></center>
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
                    {Object.values(results["hits"]).map(recipe => (
                        <Display
                            website={recipe["recipe"]["shareAs"]}
                            imgUrl={recipe["recipe"]["image"]}
                            info={recipe["recipe"]["label"]}
                        />
                    ))}
                </div>
            }
        </div>
    )
}
export default RecipeCall;