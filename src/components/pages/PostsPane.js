// PostsPane.js
// Engineer: Alex Mei

import React from 'react';

function PostsPane(props) {
    return (
        <div className="post_pane row">
            <div className="post_title row">
                {props["title"]}
            </div>
            <div className="post_caption row">
                {props["caption"]} <br />
                {props["list_date"]}
            </div>
            <div className="row">
                <div className="post_reacts">
                    Reacts
                </div>
                <div className="post_comments">
                    Comments
                </div>
            </div>
        </div>
    ); 
};

export default PostsPane;