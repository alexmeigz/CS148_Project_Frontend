// CommentPane.js
// Engineer: Joseph Ng, Alex Mei

import React from 'react';
import "./Order.css"


function CommentPane(props) {
    return (
        <div className="comment-pane">
            <div className="row">
                {props.userID}: {props.content}
            </div>
            <div className="row">
                {props.date}
            </div>
        </div>
        
    )
}

export default CommentPane;