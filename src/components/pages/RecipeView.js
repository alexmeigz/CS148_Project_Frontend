// RecipeView.js
// Engineer: Alex Mei

import React from "react";

import "./PostView.css"

function RecipeView(props) {
    let parsedIngredients = JSON.parse(props.postData["ingredients"].replace("{", "[").replace("}", "]"))
    let parsedInstructions = JSON.parse(props.postData["instructions"].replace("{", "[").replace("}", "]"))
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
                                <li> {ingredient} </li>
                            ))}
                        </ul>
                    </div>
                    <div className="post-instructions">
                        <div className="post-header">
                            Instructions
                        </div>
                        <ol>
                            {parsedInstructions.map(instruction => (
                                <li> {instruction} </li>
                            ))}
                        </ol>
                    </div>
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
};

export default RecipeView;