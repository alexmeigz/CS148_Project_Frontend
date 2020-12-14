// CommentPane.js
// Engineer: Joseph Ng, Alex Mei

import React from 'react';
import "./Order.css"


function CommentPane(props) {
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    function handleDelete(event) {
        event.preventDefault();

        let url = `${server}/comment/?id=${props.comment_id}`
    
        fetch(url, 
            {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },           
            })
            .then(response => response.json()) 
                .then(data => {
                if(data["message"] === "Comment successfully removed"){
                    alert("Comment successfully removed!")
                    // window.location.reload()
                }
                else{
                    alert(`Error removing comment: ${data["message"]}`)
                }
            })
            .catch((error) => console.log("Comment removal error: " + error))
    }

    return (
        <div className="comment-pane">
            <div className="row">
                <p>
                    <h4 style={{display: "inline-block"}}>{props.username || "[No Name Listed]"}</h4> {props.date}
                    {JSON.parse(sessionStorage.getItem("user")).user_id === props.user_id || JSON.parse(sessionStorage.getItem("user")).account_type === "Admin"
                        ?<button style={{float: "right"}} onClick={handleDelete}>Remove</button>
                        : null
                    }
                </p>
            </div>
            <div className="row">
                {props.content}
            </div>
        </div>
        
    )
}

export default CommentPane;