// CreateReview.js
// Engineer: Alex Mei

import React, { useState } from 'react';

function RecipeForm(props) {
    const [state, updateState] = useState({
      type: "recipe",
      title: "",
      caption: "",
      image_url: "",
      user_id: JSON.parse(sessionStorage.getItem("user"))["user_id"]
    })

    const [content, updateContent] = useState({
      "instructions": "",
      "ingredients": ""
    })

    function handleChange(evt) { 
      const name = evt.target.name 
      const value = evt.target.value 
      
      if(name === "ingredients" || name === "instructions"){
        updateContent({
          ...content,
          [name]: value
        })
      }
      else {
        updateState({
          ...state,
          [name]: value
        })
      }
    }

    const submitForm = (evt) => {  
      evt.preventDefault();
      
      let server = "http://localhost:8118/api"
      if (process.env.REACT_APP_REMOTE === "1") { 
          server = "https://nutriflix-flask-backend.herokuapp.com/api"
      }
      if (process.env.NODE_ENV !== "development") {
          server = "https://nutriflix-flask-backend.herokuapp.com//api"
      }
    
      let url = `${server}/post/?`
      for(const param in state){
        if(state[param] !== ""){
          url += `&${param}=${state[param]}`
        }
      }

      let ingredients = JSON.stringify(content.ingredients.split("\n"))
      let instructions = JSON.stringify(content.instructions.split("\n"))

      console.log(ingredients)
      console.log(instructions)
      if(ingredients === "[\"\"]"){
        alert("ingredients cannot be empty")
      }
      else if(instructions === "[\"\"]"){
        alert("instructions cannot be empty")
      }
      else{
        fetch(url, 
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },    
            body: JSON.stringify({
              "ingredients" : ingredients,
              "instructions" : instructions
            })
          })
          .then(response => response.json()) 
          .then(data => {
            if(data["message"] === "Recipe Post created successfully!"){
              alert(`${data["message"]}`)
              //Need to add Redirect after creating Product
              updateState({
                type: "recipe",
                title: "",
                caption: "",
                image_url: "",
                user_id: JSON.parse(sessionStorage.getItem("user"))["user_id"]
              })
              updateContent({
                  "instructions": "",
                  "ingredients": ""
                })
            }
            else{
              alert(`Error creating recipe: ${data["message"]}`)
            }
          })
          .catch((error) => console.log("Post creation error: "+ error))
        }
      }

    return (
      <div className="container">
        <h1> Create Recipe </h1>
        <form onSubmit={submitForm}>
        <div className="form_input">
          <label className="form_label" for="title"> Recipe Title: </label>  
          <input className="form_field" type="text" value={state.title} name="title" onChange={handleChange} />
        </div>
        
        <div className="form_input">
          <label className="form_label" for="caption"> Recipe Caption: </label>         
          <input className="form_field" type="text" value={state.caption} name="caption" onChange={handleChange} />
        </div>

        <div className="form_input">
          <label className="form_label" for="ingredients"> Recipe Ingredients: </label>         
          <textarea className="form_field textarea" type="text" value={content.ingredients} name="ingredients" onChange={handleChange} />
        </div>

        <div className="form_input">
          <label className="form_label" for="instructions"> Recipe Instructions: </label>         
          <textarea className="form_field textarea" type="text" value={content.instructions} name="instructions" onChange={handleChange} />
        </div>

        <div className="form_input">
          <label className="form_label" for="image_url"> Recipe Image: </label>  
          <input className="form_field" type="text" value={state.image_url} name="image_url" onChange={handleChange} />
        </div>
        
        <input className="form_submit" type="submit" value="Submit" />
      </form>
      </div>
    )
}
export default RecipeForm;
