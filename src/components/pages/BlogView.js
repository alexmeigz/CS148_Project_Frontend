// BlogView.js
// Engineer: Alex Mei

import React from "react";

import "./PostView.css"

function BlogView(props) {
    if(props.postData["image_url"]){
        return (
            <div className="post-pane">
                <div className="row">
                    <img className="post-image" alt=""
                        src={props.postData["image_url"] && props.postData["image_url"]}
                    />
                    <div className="post-column">
                        <div className="post-title row">
                            {props.postData["title"]}
                        </div>
                        <div className="post-user row">
                            By: {}
                        </div>
                        <div className="post-time row">
                            Last Edited: {props.postData["last_edit"]}
                        </div>
                    </div>
                </div>
                <div className="post-caption">
                    {props.postData["content"]}
                </div>
                <div className="row">
                    <div className="post-reacts">
                        Reacts
                    </div>
                    <div className="post-comments">
                        Comments
                    </div>
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="post-pane">
                <div className="post-title row">
                    {props.postData["title"]}
                </div>
                <div className="post-user row">
                    By: {}
                </div>
                <div className="post-time row">
                    Last Edited: {props.postData["last_edit"]}
                </div>
                <div className="post-caption">
                    {props.postData["content"]}
                </div>
                <div className="row">
                    <div className="post-reacts">
                        Reacts
                    </div>
                    <div className="post-comments">
                        Comments
                    </div>
                </div>
            </div>
        );
    }
};

export default BlogView;