// BlogView.js
// Engineer: Alex Mei

import React from "react";

import "./PostView.css";
import stars_5 from "../../assets/stars_5.png";
import stars_4 from "../../assets/stars_4.png";
import stars_3 from "../../assets/stars_3.png";
import stars_2 from "../../assets/stars_2.png";
import stars_1 from "../../assets/stars_1.png";

function ReviewView(props) {
    if(props.postData["image_url"]){
        return (
            <div className="post-pane">
                <div className="row">
                    <img className="post-image" alt=""
                        src={props.postData["image_url"] && props.postData["image_url"]}
                    />
                    <div className="post-column">
                        { props.postData["rating"] ?
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
                        : 
                            <div className="post-title row">
                                {props.postData["title"]}
                            </div>
                        }
                        
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

export default ReviewView;