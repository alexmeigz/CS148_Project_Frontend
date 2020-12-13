// BlogUpdatePanel.js
// Engineer: Alex Mei

import React, {useState} from "react";

function BlogUpdatePanel(props) {
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }

    const [newContent, setNewContent] = useState("")

    const [newInfo, setNewInfo] = useState({
        ...props.postData,
        title: "",
        image_url: ""
    })

    function handleChange(evt) { 
        const name = evt.target.name
        const value = evt.target.value 

        if(name === "content"){
            setNewContent(value)
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

        let requiredParams = ["post_id", "post_type", "title"]
        let optionalParams = ["image_url"]

        let url = `${server}/post/?`
        
        requiredParams.forEach((param, index) => {
            if (newInfo[param] === "") {
                newInfo[param] = props.postData[param]
            }
            url += `&${param}=${newInfo[param]}`
        });
        
        optionalParams.forEach((param, index) => {
            if (newInfo[param] !== "") {
                 url += `&${param}=${newInfo[param]}`
            }
        });

        let body = "";

        if(newContent !== ""){
            body = newContent;
        }
        else{
            body = props.postData.content;
        }
        console.log(url)

        fetch(url, 
            {
                method: 'PATCH',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },      
                body: body     
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
            <h1> Update Blog Post </h1>
            <form onSubmit={submitUpdatePost}>
                <div className="form_input">
                    <label className="form_label" for="title"> Blog Title: </label>  
                    <input className="form_field" type="text" value={newInfo.title} name="title" onChange={handleChange} />
                </div>
                
                <div className="form_input">
                    <label className="form_label" for="content"> Blog Content: </label>         
                    <textarea className="form_field" type="text" value={newContent} name="content" onChange={handleChange} />
                </div>

                <div className="form_input">
                    <label className="form_label" for="image_url"> Blog Image (optional): </label>  
                    <input className="form_field" type="text" value={newInfo.image_url} name="image_url" onChange={handleChange} />
                </div>
                
                <input className="form_submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default BlogUpdatePanel;