// RecipeUpdatePanel.js
// Engineer: Alex Mei

import React, {useState} from "react";

function RecipeUpdatePanel(props) {
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }

    const [newIngredients, setNewIngredients] = useState("")
    const [newInstructions, setNewInstructions] = useState("")

    const [newInfo, setNewInfo] = useState({
        ...props.postData,
        title: "",
        caption: "",
        image_url: ""
    })

    function handleChange(evt) { 
        const name = evt.target.name
        const value = evt.target.value 

        if(name === "ingredients"){
            setNewIngredients(value)
        }
        else if(name === "instructions"){
            setNewInstructions(value)
        }
        else{
            setNewInfo({
                ...newInfo,
                [name]: value
            })
        }
    }

    function submitUpdatePost(event) {
        event.preventDefault();

        let requiredParams = ["post_id", "post_type", "title", "caption", "image_url"]

        let url = `${server}/post/?`
        
        requiredParams.forEach((param, index) => {
            if (newInfo[param] === "") {
                newInfo[param] = props.postData[param]
            }
            url += `&${param}=${newInfo[param]}`
        });

        let body = {
            "ingredients" : props.postData.ingredients,
            "instructions" : props.postData.instructions
        };

        if(newIngredients !== ""){
            body["ingredients"] = JSON.stringify(newIngredients.split("\n"));
        }
        if(newInstructions !== ""){
            body["instructions"] = JSON.stringify(newInstructions.split("\n"));;
        }

        console.log(url)
        console.log(body)

        fetch(url, 
            {
                method: 'PATCH',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },      
                body: JSON.stringify(body)   
            })
            .then(response => response.json()) 
                .then(data => {
                if(data["message"] === "Post successfully updated. Please refresh to see updates."){
                    alert("Post successfully updated. Please refresh to see updates.")
                    props.cancelUpdate()
                }
                else{
                    alert(`Error updating post: ${data["message"]}`)
                }
            })
            .catch((error) => console.log("Post update error: "+ error))

    }

    return (
        <div className="update-form">
            <h1> Update Recipe </h1>
            <form onSubmit={submitUpdatePost}>
                <div className="form_input">
                    <label className="form_label" for="title"> Recipe Title: </label>  
                    <input className="form_field" type="text" value={newInfo.title} name="title" onChange={handleChange} />
                </div>

                <div className="form_input">
                    <label className="form_label" for="caption"> Recipe Caption: </label>         
                    <input className="form_field" type="text" value={newInfo.caption} name="caption" onChange={handleChange} />
                </div>
                
                <div className="form_input">
                    <label className="form_label" for="ingredients"> Recipe Ingredients: </label>         
                    <textarea className="form_field" type="text" value={newIngredients} name="ingredients" onChange={handleChange} />
                </div>

                <div className="form_input">
                    <label className="form_label" for="instructions"> Recipe Instructions: </label>         
                    <textarea className="form_field" type="text" value={newInstructions} name="instructions" onChange={handleChange} />
                </div>

                <div className="form_input">
                    <label className="form_label" for="image_url"> Recipe Image: </label>  
                    <input className="form_field" type="text" value={newInfo.image_url} name="image_url" onChange={handleChange} />
                </div>
                
                <input className="form_submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default RecipeUpdatePanel;