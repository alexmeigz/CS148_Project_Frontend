// ProductsList.js
// Engineer: Joseph Ng, Alex Mei

// eslint-disable-next-line
import React, { useState, useEffect } from 'react';

import "./Posts.css"
import PostsPane from "./PostsPane.js"
import FilterOption from "./FilterOption.js"

import BlogView from "./BlogView";
import ReviewView from "./ReviewView";
import RecipeView from "./RecipeView";

function PostsList (props) {   
    const [results, setResults] = useState({});
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        recipe: null,
        blog: null,
        review: null
    });

    const [isListView, setIsListView] = useState(true);
    const [postView, setPostView] = useState(<BlogView />)

    useEffect(() => {
        let server = "http://localhost:8118/api"
        if (process.env.REACT_APP_REMOTE === "1") { 
            server = "https://nutriflix-flask-backend.herokuapp.com/api"
        }
        if (process.env.NODE_ENV !== "development") {
            server = "https://nutriflix-flask-backend.herokuapp.com/api"
        }
        const url = `${server}/post/?display_all=True`

        let newUrl = url + `&title=${query}`
        for(const f in filters){
            if(filters[f] !== null){
              newUrl += `&${f}=${filters[f]}`
            }
        }
        fetch(newUrl, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },              
        })
        .then(response => response.json()) 
        .then(data => {
            setResults(data)
        })
        .catch((error) => console.log("Error: " + error))
    }, [isListView, filters, query])

    function search(e){
        if(e.key === "Enter"){
            setQuery(e.target.value)
        }
    }

    function filter(param, value){
        
    }
    
    function changeView(event, type, postData) {
        setIsListView(prevIsListView => !prevIsListView);
        if (type === "post-pane") {
            if(postData["post_type"] === "recipe"){
                setPostView(<RecipeView 
                    postData={postData} 
                    isLoggedIn={props.isLoggedIn} 
                    user={props.user} 
                    onUserChange={props.onUserChange}
                />);
            }
            else if(postData["post_type"] === "review"){
                setPostView(<ReviewView 
                    postData={postData} 
                    isLoggedIn={props.isLoggedIn} 
                    user={props.user} 
                    onUserChange={props.onUserChange}
                />);
            }
            else{
                setPostView(<BlogView 
                    postData={postData} 
                    isLoggedIn={props.isLoggedIn} 
                    user={props.user} 
                    onUserChange={props.onUserChange}
                />);
            }
            
        }
    };

    return (
        <div>
            {/* clicking/back button toggles between product list view and individual product display */}
            {!isListView

            ? <div><button className="product_back_button" onClick={(e) => changeView(e, "product-view")}>Back</button>
                {postView}
            </div>

            : <div className="container">
                <h1> Posts </h1>
                <div className="side_panel">
                    <input className="search_bar" placeholder="Search posts..." onKeyDown={search} />
                    <div className="title">
                        Filters
                    </div>
                    <div className="filters"> 
                        <FilterOption name="Blog Posts" param="blog" value="true" 
                            filters={filters} changeFilter={setFilters} onChange={filter} field={filters.blog} 
                        />
                        <FilterOption name="Reviews" param="review" value="true" 
                            filters={filters} changeFilter={setFilters} onChange={filter} field={filters.review} 
                        />
                        <FilterOption name="Recipes" param="recipe" value="true" 
                            filters={filters} changeFilter={setFilters} onChange={filter} field={filters.recipe} 
                        />
                    </div>
                </div>
                <div className="post_panel">
                    <div className="title">
                        Post Results (Total: {Object.keys(results).length})
                    </div>
                    {Object.values(results).map(post => (
                        <button className="panel_button" 
                            onClick={(e) => changeView(e, "post-pane", post)}>
                            {post["post_type"] === "blog" &&
                                <PostsPane 
                                    title={post["title"]} 
                                    username={post["username"]}
                                    comments={post["comments"]}
                                    image={post["image_url"]}
                                    caption={post["content"]}
                                    reacts={post["reacted_users"].length}
                                    reacted={post["reacted_users"].includes(props.user.user_id)}
                                />
                            }
                            {post["post_type"] === "review" &&
                                <PostsPane 
                                    title={post["title"]} 
                                    username={post["username"]}
                                    comments={post["comments"]}
                                    image={post["image_url"]}
                                    caption={post["content"]}
                                    rating={post["rating"]}
                                    reacts={post["reacted_users"].length}
                                    reacted={post["reacted_users"].includes(props.user.user_id)}
                                />
                            }
                            {post["post_type"] === "recipe" &&
                                <PostsPane 
                                    title={post["title"]} 
                                    username={post["username"]}
                                    comments={post["comments"]}
                                    image={post["image_url"]}
                                    caption={post["caption"]}
                                    ingredients={post["ingredients"]}
                                    instructions={post["instructions"]}
                                    reacted={post["reacted_users"].includes(props.user.user_id)}
                                    reacts={post["reacted_users"].length}
                                />
                            }
                            
                        </button>
                    ))}
                </div>
            </div>}
        </div>
    );
};

export default PostsList;