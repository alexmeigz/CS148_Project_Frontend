import React, { useState } from 'react';
import Display from './Display';
import "./RecipeCall.css";

function RecipeCall(props) {
    const [state, updateState] = useState({
        q: "",
        health: "",
        excluded: "",
        showHideDemo: false
    })

    const [results, setResults] = useState({});
    const [lock, setLock] = useState(false);

    function handleChange(evt) { 
        const name = evt.target.name 
        const value = evt.target.value 
        updateState({
            ...state,
            [name]: value
        })
    }

    const submitForm = (evt) => {  
        evt.preventDefault();
        if(!lock){
            setLock(true);
            let url = `https://api.edamam.com/search?q=${state.q}&app_id=e1a55240&app_key=abe181a8a1ffbd0a236f1aac3381a621&from=0&to=60`
            let newUrl = url;
            if (state.health !== "") {
                newUrl += `&health=${state.health}`
            }
            if (state.excluded !== "") {
                newUrl += `&excluded=${state.excluded}`
            }
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
                    console.log(data)
                    if (data["more"]) {
                        setResults(data)
                        updateState({
                            ...state,
                            showHideDemo: true
                        })
    
                        // alert(`${results["hits"][0]["recipe"]["shareAs"]}`)
                        // console.log(data)
    
                    }
                    else {
                        alert(`API cannot process your search query. Please try again.`)
                    }
                })
                .catch((error) => console.log("Recipe call error: " + error))
            setTimeout(() => {  setLock(false); }, 30000);
        }
        else{
            alert("Due to API limitations, please do not search more than once per minute!")
        }
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
                    <label className="form_label" for="health"> Health: (i.e. vegan) </label>
                    <input className="form_field" type="text" value={state.health} name="health" onChange={handleChange} />
                </div>
                <div className="form_input">
                    <label className="form_label" for="excluded"> Excluded: (any ingredient) </label>
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