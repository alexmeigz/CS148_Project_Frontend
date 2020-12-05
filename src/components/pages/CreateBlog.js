// CreateBlog.js
// Engineer: Alex Mei

import React, { useState } from 'react';

function BlogForm(props) {
    const [state, updateState] = useState({
      type: "blog",
      title: "",
      image_url: "",
      user_id: props.user["user_id"]
    })

    const [content, updateContent] = useState("")

    function handleChange(evt) { 
      const name = evt.target.name 
      const value = evt.target.value 
      
      if(name === "content"){
        updateContent(value)
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
          server = "https://nutriflix-flask-backend.herokuapp.com/api"
      }
    
      let url = `${server}/post/?`
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
        body: content       
      })
      .then(response => response.json()) 
	    .then(data => {
        if(data["message"] === "Blog Post created successfully!"){
          alert(`${data["message"]}`)
          //Need to add Redirect after creating Product
          updateState({
            type: "blog",
            title: "",
            image_url: "",
            user_id: props.user["user_id"]
          })
          updateContent("")
        }
        else{
          alert(`Error creating blog: ${data["message"]}`)
        }
      })
      .catch((error) => console.log("Post creation error: "+ error))
    }

    return (
      <div className="container">
        <h1> Create Blog Post </h1>
        <form onSubmit={submitForm}>
        <div className="form_input">
          <label className="form_label" for="title"> Blog Title: </label>  
          <input className="form_field" type="text" value={state.title} name="title" onChange={handleChange} />
        </div>
        
        <div className="form_input">
          <label className="form_label" for="content"> Blog Content: </label>         
          <textarea className="form_field" type="text" value={content} name="content" onChange={handleChange} />
        </div>

        <div className="form_input">
          <label className="form_label" for="image_url"> Blog Image (optional): </label>  
          <input className="form_field" type="text" value={state.image_url} name="image_url" onChange={handleChange} />
        </div>
        
        <input className="form_submit" type="submit" value="Submit" />
      </form>
      </div>
    )
}
export default BlogForm;
