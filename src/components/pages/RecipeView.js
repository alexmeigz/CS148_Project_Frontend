// RecipeView.js
// Engineer: Alex Mei

import React, {useState} from "react";

import "./PostView.css"
import heart from "../../assets/heart.png";
import heart_default from "../../assets/heart_default.png";

function RecipeView(props) {
    let parsedIngredients = JSON.parse(props.postData["ingredients"].replace("{", "[").replace("}", "]"))
    let parsedInstructions = JSON.parse(props.postData["instructions"].replace("{", "[").replace("}", "]"))
    const [removed, setRemoved] = useState(false);
    // eslint-disable-next-line
    const [updating, setUpdating] = useState(false);
    const [liked, setLiked] = useState(props.postData["reacted_users"].includes(JSON.parse(sessionStorage.getItem("user")).user_id));
    const [numLikes, setLikes] =useState(props.postData["reacted_users"].length);

    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com//api"
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
                        alert(`Error creating reaction: ${data["message"]}`)
                    }
                })
                .catch((error) => console.log("Reaction delete error: "+ error))
        }
    }

    function updatePost(event) {
        event.preventDefault();

        let url = `${server}/product/?product_id=${props.productData["product_id"]}`

        fetch(url, 
            {
                method: 'PATCH',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },           
            })
            .then(response => response.json()) 
                .then(data => {
                if(data["message"] === "Product successfully removed"){
                    alert("Product successfully removed")
                    setRemoved(true);
                }
                else{
                    alert(`Error deleting product: ${data["message"]}`)
                }
            })
            .catch((error) => console.log("Product delete error: "+ error))
    }

    function removePost(event) {
        event.preventDefault();
        
        let url = `${server}/post/?post_id=${props.postData["post_id"]}&user_id=${JSON.parse(sessionStorage.getItem("user"))["user_id"]}`

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
                            By: {}
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
                        Comments
                    </div>
                </div>
                {(JSON.parse(sessionStorage.getItem("user")).user_id === props.postData.user_id) &&
                    <div>
                        <button className="post-button" onClick={removePost} disabled={removed}>{!removed ? "Remove Post": "Removed!"}</button>
                        <button className="post-button" onClick={updatePost} disabled={true}>{!updating ? "Update Post": "Submit Update!"}</button>
                    </div>
                }
            </div>
        );
};

export default RecipeView;