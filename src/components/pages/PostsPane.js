// PostsPane.js
// Engineer: Alex Mei

import React from 'react';
import stars_5 from "../../assets/stars_5.png";
import stars_4 from "../../assets/stars_4.png";
import stars_3 from "../../assets/stars_3.png";
import stars_2 from "../../assets/stars_2.png";
import stars_1 from "../../assets/stars_1.png";
import heart from "../../assets/heart.png";
import heart_default from "../../assets/heart_default.png";

function PostsPane(props) {
    if(props["image"]){
        return (
            <div className="post_pane row">
                <img className="post_image" alt=""
                    src={props["image"]}
                />
                <div className="post_header">
                    { props["rating"] ?
                        <div className="row">
                            <div className="post_title rating_adjust"> {props["title"]} </div>
                            { (props["rating"] === 5) && 
                                <img className="rating_image" alt=""
                                        src={stars_5} height="20px"/>
                            }
                            { (4 <= props["rating"] && props["rating"] < 5) && 
                                <img className="rating_image" alt=""
                                        src={stars_4} height="20px"/>
                            }
                            { (3 <= props["rating"] && props["rating"] < 4) && 
                                <img className="rating_image" alt=""
                                        src={stars_3} height="20px"/>
                            }
                            { (2 <= props["rating"] && props["rating"] < 3) && 
                                <img className="rating_image" alt=""
                                        src={stars_2} height="20px"/>
                            }
                            { (1 <= props["rating"] && props["rating"] < 2) && 
                                <img className="rating_image" alt=""
                                        src={stars_1} height="20px"/>
                            }
                            
                        </div>
                    :
                        <div className="post_title row"> {props["title"]} </div>
                    }
                    <div className="post_caption row">
                        {props["caption"]} 
                    </div>
                </div>
                <div className="row">
                    { props["reacted"] ?
                        <div className="post-reacts">
                            <img className="react-image" alt="" src={heart} height="20px" />
                            <div className="react-count"> {props["reacts"]} </div>
                        </div>
                        :
                        <div className="post-reacts">
                            <img className="react-image" alt="" src={heart_default} height="20px" />
                            <div className="react-count"> {props["reacts"]} </div>
                        </div>
                    }                    
                    <div className="post_comments">
                        Comments
                    </div>
                </div>
            </div>
        ); 
    }
    else{
        return(
            <div className="post_pane row">
                { props["rating"] ?
                    <div className="row">
                        <div className="post_title rating_adjust"> {props["title"]} </div>
                        { (props["rating"] === 5) && 
                            <img className="rating_image" alt=""
                                src={stars_5} height="20px"/>
                        }
                        { (4 <= props["rating"] && props["rating"] < 5) && 
                            <img className="rating_image" alt=""
                                src={stars_4} height="20px"/>
                        }
                        { (3 <= props["rating"] && props["rating"] < 4) && 
                            <img className="rating_image" alt=""
                                src={stars_3} height="20px"/>
                        }
                        { (2 <= props["rating"] && props["rating"] < 3) && 
                            <img className="rating_image" alt=""
                                src={stars_2} height="20px"/>
                        }
                        { (1 <= props["rating"] && props["rating"] < 2) && 
                            <img className="rating_image" alt=""
                                src={stars_1} height="20px"/>
                        }                        
                    </div>
                    :
                        <div className="post_title row"> {props["title"]} </div>
                    }
                <div className="post_caption row">
                    {props["caption"]} 
                </div>
                <div className="row">
                    { props["reacted"] ?
                        <div className="post-reacts">
                            <img className="react-image" alt="" src={heart} height="20px" />
                            <div className="react-count"> {props["reacts"]} </div>
                        </div>
                        :
                        <div className="post-reacts">
                            <img className="react-image" alt="" src={heart_default} height="20px" />
                            <div className="react-count"> {props["reacts"]} </div>
                        </div>
                    }  
                    <div className="post_comments">
                        Comments
                    </div>
                </div>
            </div>
        )
    }
    
};

export default PostsPane;