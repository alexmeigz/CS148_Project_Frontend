// AddComment.js
// Engineer: Alex Mei

import React, {useState} from "react";

function AddComment(props) {
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }

    const [newInfo, setNewInfo] = useState({
        ...props.postData,
        com_info: ""
    })

    function handleChange(evt) { 
        const name = evt.target.name 
        const value = evt.target.value 

	  setNewInfo({
        ...newInfo,
        [name]: value
      })
    }

    function submitComment(event) {
        event.preventDefault();

        let requiredParams = ["post_id", "com_info"]

        let url = `${server}/comment/?user_id=${JSON.parse(sessionStorage.getItem("user")).user_id}`

        requiredParams.forEach((param, index) => {
            if (newInfo[param] === "") {
                newInfo[param] = props.postData[param]
            }
            url += `&${param}=${newInfo[param]}`
        });

        // console.log(url)

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
                if(data["message"] === "Comment created successfully!"){
                    alert("Comment created successfully!")
                    props.cancelComment()
                }
                else{
                    alert(`Error creating comment: ${data["message"]}`)
                }
            })
            .catch((error) => console.log("Comment creation error: " + error))

    }

    return (
        <div className="update-form">
            <h1> Add Comment </h1>
            <form onSubmit={submitComment}>
                <div className="form_input">
                    <label className="form_label" for="com_info"> Comment: </label>         
                    <textarea className="form_field" type="text" value={newInfo.com_info} name="com_info" onChange={handleChange} />
                </div>
                
                <input className="form_submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddComment;