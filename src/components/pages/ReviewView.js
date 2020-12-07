// ReviewView.js
// Engineer: Alex Mei

import React, {useState} from "react";
import AddComment from "./AddComment.js"
import CommentPane from "./CommentPane.js"
import ReviewUpdatePanel from "./ReviewUpdatePanel.js"

import "./PostView.css";
import stars_5 from "../../assets/stars_5.png";
import stars_4 from "../../assets/stars_4.png";
import stars_3 from "../../assets/stars_3.png";
import stars_2 from "../../assets/stars_2.png";
import stars_1 from "../../assets/stars_1.png";
import heart from "../../assets/heart.png";
import heart_default from "../../assets/heart_default.png";

function ReviewView(props) {
    const [removed, setRemoved] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [liked, setLiked] = useState(props.postData["reacted_users"].includes(props.user.user_id));
    const [numLikes, setLikes] =useState(props.postData["reacted_users"].length);
    const [comments, setComments] = useState({});
    const [showing, setShowing] = useState(false);
    const [adding, setAdding] = useState(false);

    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com//api"
    }

    function showComments(event){
        if(showing === true){
            setShowing(false);
        }
        else{
            let url = `${server}/comment/?display_all=True&post_id=${props.postData.post_id}`
            fetch(url, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },           
            })
            .then(response => response.json()) 
            .then(data => {
                console.log(data)
                setComments(data)
                setShowing(true)
            })
            .catch((error) => console.log("Show comment error: "+ error))
        }
    }

    function react(event){
        let url = `${server}/reaction/?user_id=${props.user.user_id}&post_id=${props.postData.post_id}`
        if(liked){
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
                    if(data["message"] === "Reaction successfully removed"){
                        alert("Reaction successfully removed")
                        setLikes(numLikes - 1);
                        setLiked(false);
                    }
                    else{
                        alert(`Error deleting reaction: ${data["message"]}`)
                    }
                })
                .catch((error) => console.log("Reaction delete error: "+ error))
        }
        else{
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
                    if(data["message"] === "Reaction created successfully!"){
                        alert("Reaction created successfully!")
                        setLikes(numLikes + 1);
                        setLiked(true);
                    }
                    else{
                        alert(`Error creating reaction: ${data["message"]}`)
                    }
                })
                .catch((error) => console.log("Reaction delete error: "+ error))
        }
    }

    function addComment(event) {
        event.preventDefault();
        setAdding((prevAdding => !prevAdding));
        setUpdating(false);
    }

    function updatePost(event) {
        event.preventDefault();
        setUpdating((prevUpdating => !prevUpdating));
    }

    function removePost(event) {
        event.preventDefault();
        
        let url = `${server}/post/?post_id=${props.postData["post_id"]}`
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
                if(data["message"] === "Post successfully removed"){
                    alert("Post successfully removed")
                    setRemoved(true);
                }
                else{
                    alert(`Error deleting post: ${data["message"]}`)
                }
            })
            .catch((error) => console.log("Post delete error: "+ error))
    }

    if(props.postData["image_url"]){
        return (
            <div className="post-pane">
                <div className="row">
                    <img className="post-image" alt=""
                        src={props.postData["image_url"] && props.postData["image_url"]}
                    />
                    <div className="post-column">
                        <div className="row">
                            <div className="post-title rating-adjustment">
                                {props.postData["title"]}
                            </div>
                            { (props.postData["rating"] === 5) && 
                                <img className="rating_image" alt=""
                                    src={stars_5} height="30px"/>
                            }
                            { (4 <= props.postData["rating"] && props.postData["rating"] < 5) && 
                                <img className="rating_image" alt=""
                                    src={stars_4} height="30px"/>
                            }
                            { (3 <= props.postData["rating"] && props.postData["rating"] < 4) && 
                                <img className="rating_image" alt=""
                                    src={stars_3} height="30px"/>
                            }
                            { (2 <= props.postData["rating"] && props.postData["rating"] < 3) && 
                                <img className="rating_image" alt=""
                                    src={stars_2} height="30px"/>
                            }
                            { (1 <= props.postData["rating"] && props.postData["rating"] < 2) && 
                                <img className="rating_image" alt=""
                                    src={stars_1} height="30px"/>
                            }
                        </div>
                        <div className="post-user row">
                            By: {props.postData["username"]}
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
                    { liked ?
                            <div className="post-reacts">
                                <input type="image" className="react-image" alt="" src={heart} 
                                    height="20px" onClick={react}/>
                                <div className="react-count"> {numLikes} </div>
                            </div>
                            :
                            <div className="post-reacts">
                                <input type="image" className="react-image" alt="" src={heart_default} 
                                    height="20px" onClick={react}/>
                                <div className="react-count"> {numLikes} </div>
                            </div>
                        }  
                    <div className="post-comments">
                        <button className="comment-button" onClick={showComments}> {!showing ? `Show Comments (${props.postData["comments"]})`: "Hide Comments"} </button> 
                    </div>

                    { showing && 
                        <div className="row comments">
                            {Object.values(comments).map(comment => (
                                <CommentPane 
                                    content={comment["com_info"]}
                                    user={comment["user_id"]}
                                    date={comment["com_date"]}
                                    />
                            ))}
                        </div>
                    }
                </div>
                {((props.user.user_id === props.postData.user_id) || props.user.account_type === "Admin") &&
                    <div>
                        <button className="post-button" onClick={removePost} disabled={removed}>{!removed ? "Remove Post": "Removed!"}</button>
                        <button className="post-button" onClick={updatePost} disabled={removed}>{!updating ? "Update Post": "Cancel Update"}</button>
                    </div>
                }
                { props.isLoggedIn &&
                    <button className="post-button" onClick={addComment} disabled={removed}>{!adding ? "Add Comment": "Cancel Comment"}</button>
                }

                {updating
                    ? <ReviewUpdatePanel postData={props.postData} cancelUpdate={() => setUpdating(false)}/>
                    : null
                }

                {adding ?
                    <AddComment postData={props.postData} cancelComment={() => setAdding(false)}/>
                :
                    null
                }
            </div>
        );
    }
    else{
        return (
            <div className="post-pane">
                <div className="row">
                    <div className="post-title rating-adjustment">
                        {props.postData["title"]}
                    </div>
                    { (props.postData["rating"] === 5) && 
                        <img className="rating_image" alt=""
                            src={stars_5} height="30px"/>
                    }
                    { (4 <= props.postData["rating"] && props.postData["rating"] < 5) && 
                        <img className="rating_image" alt=""
                            src={stars_4} height="30px"/>
                    }
                    { (3 <= props.postData["rating"] && props.postData["rating"] < 4) && 
                        <img className="rating_image" alt=""
                            src={stars_3} height="30px"/>
                    }
                    { (2 <= props.postData["rating"] && props.postData["rating"] < 3) && 
                        <img className="rating_image" alt=""
                            src={stars_2} height="30px"/>
                    }
                    { (1 <= props.postData["rating"] && props.postData["rating"] < 2) && 
                        <img className="rating_image" alt=""
                            src={stars_1} height="30px"/>
                    }
                </div>
                <div className="post-user row">
                    By: {props.postData["username"]}
                </div>
                <div className="post-time row">
                    Last Edited: {props.postData["last_edit"]}
                </div>
                <div className="post-caption">
                    {props.postData["content"]}
                </div>
                <div className="row">
                    { liked ?
                            <div className="post-reacts">
                                <input type="image" className="react-image" alt="" src={heart} 
                                    height="20px" onClick={react}/>
                                <div className="react-count"> {numLikes} </div>
                            </div>
                            :
                            <div className="post-reacts">
                                <input type="image" className="react-image" alt="" src={heart_default} 
                                    height="20px" onClick={react}/>
                                <div className="react-count"> {numLikes} </div>
                            </div>
                        }  
                    <div className="post-comments">
                        <button className="comment-button" onClick={showComments}> {!showing ? `Show Comments (${props.postData["comments"]})`: "Hide Comments"} </button> 
                    </div>

                    { showing && 
                        <div className="row comments">
                            {Object.values(comments).map(comment => (
                                <CommentPane 
                                    content={comment["com_info"]}
                                    user={comment["user_id"]}
                                    date={comment["com_date"]}
                                    />
                            ))}
                        </div>
                    }
                </div>
                {((props.user.user_id === props.postData.user_id) || props.user.account_type === "Admin") &&
                    <div>
                        <button className="post-button" onClick={removePost} disabled={removed}>{!removed ? "Remove Post": "Removed!"}</button>
                        <button className="post-button" onClick={updatePost} disabled={removed}>{!updating ? "Update Post": "Cancel Update"}</button>
                    </div>
                }
                { props.isLoggedIn &&
                    <button className="post-button" onClick={addComment} disabled={removed}>{!adding ? "Add Comment": "Cancel Comment"}</button>
                }

                {updating
                    ? <ReviewUpdatePanel postData={props.postData} cancelUpdate={() => setUpdating(false)}/>
                    : null
                }

                {adding ?
                    <AddComment postData={props.postData} cancelComment={() => setAdding(false)}/>
                :
                    null
                }
            </div>
        );
    }
};

export default ReviewView;