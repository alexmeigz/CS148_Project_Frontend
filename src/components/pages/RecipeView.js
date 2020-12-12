// RecipeView.js
// Engineer: Alex Mei

import React, {useState} from "react";
import AddComment from "./AddComment.js"
import AddReport from "./AddReport"
import CommentPane from "./CommentPane.js"
import RecipeUpdatePanel from "./RecipeUpdatePanel.js"

import "./PostView.css"
import heart from "../../assets/heart.png";
import heart_default from "../../assets/heart_default.png";

function RecipeView(props) {
    console.log(props.postData["ingredients"].replace("{", "[").replace("}", "]"))
    let parsedIngredients = JSON.parse(props.postData["ingredients"].replace("{", "[").replace("}", "]"))
    let parsedInstructions = JSON.parse(props.postData["instructions"].replace("{", "[").replace("}", "]"))
    
    const [removed, setRemoved] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [liked, setLiked] = useState(props.postData["reacted_users"].includes(JSON.parse(sessionStorage.getItem("user")) && JSON.parse(sessionStorage.getItem("user")).user_id));
    const [numLikes, setLikes] =useState(props.postData["reacted_users"].length);
    const [comments, setComments] = useState({});
    const [showing, setShowing] = useState(false);
    const [addingComment, setAddingComment] = useState(false);
    const [addingReport, setAddingReport] = useState(false)

    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
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
        let url = `${server}/reaction/?user_id=${JSON.parse(sessionStorage.getItem("user")).user_id}&post_id=${props.postData.post_id}`
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
                        alert(`${data["message"]}`)
                    }
                })
                .catch((error) => console.log("Reaction delete error: "+ error))
        }
    }

    function addComment(event) {
        event.preventDefault();
        setAddingComment((prevAdding => !prevAdding));
        setUpdating(false);
    }
    function addReport(event) {
        event.preventDefault();
        setAddingReport((prevAdding => !prevAdding));
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
                        <div className="post-description row">
                            {props.postData["caption"]}
                        </div>
                        <div className="post-user row">
                            By: {props.postData["username"]}
                        </div>
                        <div className="post-time row">
                            Last Edited: {props.postData["last_edit"]}
                        </div>
                    </div>
                </div>
                <div className="post-info row">
                    <div className="post-ingredients">
                        <div className="post-header">
                            Ingredients
                        </div>
                        <ul> 
                            {parsedIngredients.map(ingredient => (
                                <li className="post-item"> {ingredient} </li>
                            ))}
                        </ul>
                    </div>
                    <div className="post-instructions">
                        <div className="post-header">
                            Instructions
                        </div>
                        <ol>
                            {parsedInstructions.map(instruction => (
                                <li className="post-item"> {instruction} </li>
                            ))}
                        </ol>
                    </div>
                    <div className="post-nutrition">
                        <div className="post-header">
                            Nutrition Facts
                        </div>
                        <div className="nutrient">
                            Calories: {props.postData["calories"]}
                        </div>
                        <div className="nutrient">
                            Carbohydrates: {props.postData["carbs"]}
                        </div>
                        
                        <div className="nutrient">
                            Cholesterol: {props.postData["cholesterol"]}
                        </div>
                        
                        <div className="nutrient">
                            Protein: {props.postData["protein"]}
                        </div>

                        <div className="nutrient">
                            Fiber: {props.postData["fiber"]}
                        </div>

                        <div className="nutrient">
                            Total Fat: {props.postData["fat"]}
                        </div>
                        
                        <div className="nutrient">
                            Saturated Fat: {props.postData["saturated"]}
                        </div>
                        
                        <div className="nutrient">
                            Trans Fat: {props.postData["trans"]}
                        </div>

                        <div className="nutrient">
                            Sodium: {props.postData["sodium"]}
                        </div>
                        
                        <div className="nutrient">
                            Sugars: {props.postData["sugars"]}
                        </div>
                        
                        
                    </div>
                </div>
                <div className="row">
                    <div className="post-reacts">
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
                    </div>
                    <div className="post-comments">
                        <button className="comment-button" onClick={showComments}> {!showing ? `Show Comments`: "Hide Comments"} </button> 
                    </div>

                    { showing && 
                        <div className="row comments">
                            {Object.values(comments).map(comment => (
                                <CommentPane 
                                    content={comment["com_info"]}
                                    userID={comment["user_id"]}
                                    date={comment["com_date"]}
                                    />
                            ))}
                        </div>
                    }
                </div>
                {(JSON.parse(sessionStorage.getItem("user")) && (JSON.parse(sessionStorage.getItem("user")).user_id === props.postData.user_id || JSON.parse(sessionStorage.getItem("user")).user_id.account_type === "Admin")) &&
                    <div>
                        <button className="post-button" onClick={removePost} disabled={removed}>{!removed ? "Remove Post": "Removed!"}</button>
                        <button className="post-button" onClick={updatePost} disabled={removed}>{!updating ? "Update Post": "Cancel Update"}</button>
                    </div>
                }
                { props.isLoggedIn &&
                    <button className="post-button" onClick={addComment} disabled={removed}>{!addingComment ? "Add Comment": "Cancel Comment"}</button>
                }
                { props.isLoggedIn &&
                    <button className="post-button" onClick={addReport} disabled={removed}>{!addingReport ? "Add Report": "Cancel Report"}</button>
                }

                {updating
                    ? <RecipeUpdatePanel postData={props.postData} cancelUpdate={() => setUpdating(false)}/>
                    : null
                }
                {addingComment ?
                    <AddComment postData={props.postData} cancelComment={() => setAddingComment(false)}/>
                :
                    null
                }
                {addingReport ?
                    <AddReport postData={props.postData} cancelComment={() => setAddingReport(false)}/>
                :
                    null
                }
            </div>
        );
};

export default RecipeView;