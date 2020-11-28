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
    // let server = "http://localhost:8118/api"
    let server = "https://nutriflix-flask-backend.herokuapp.com/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }

    const url = `${server}/post/?display_all=True`
    
    const [results, setResults] = useState({});
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        subscription : null
    });

    const [isListView, setIsListView] = useState(true);
    const [postView, setPostView] = useState(<BlogView />)

    useEffect(() => {
        // let newUrl = url + `&product_name=${query}`
        if (isListView) {
            let newUrl = url
            if(filters["subscription"] != null){
                newUrl += `&subscription=${filters["subscription"]}`
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
        }
    }, [isListView, filters, query, url])

    function search(e){
        if(e.key === "Enter"){
            setQuery(e.target.value)
            let newUrl = url + `&product_name=${e.target.value}`
            if(filters["subscription"] != null){
                newUrl += `&subscription=${filters["subscription"]}`
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
        }
    }

    function filter(param, value){
        console.log(query)
        let newUrl = url + `&product_name=${query}`
        if(param != null){
            newUrl += `&${param}=${value}`
        }
        console.log(newUrl)
        fetch(newUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },              
            })
        .then(response => response.json()) 
        .then(data => {
            console.log(data)
            setResults(data)
        })
        .catch((error) => console.log("SaveCreds saveCreds: Fetch Failure (is server up?): "+ error))
    }
    
    function changeView(event, type, postData) {
        setIsListView(prevIsListView => !prevIsListView);
        if (type === "product-pane") {
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
                    <input className="search_bar" placeholder="Search products..." onKeyDown={search} />
                    <div className="title">
                        Filters
                    </div>
                    <div className="filters"> 
                        <FilterOption name="Single Purchase" param="subscription" value="" 
                            filters={filters} changeFilter={setFilters} onChange={filter} field={filters.subscription} 
                        />
                        <FilterOption name="Subscription Based" param="subscription" value="true" 
                            filters={filters} changeFilter={setFilters} onChange={filter} field={filters.subscription}
                        />
                    </div>
                </div>
                <div className="post_panel">
                    <div className="title">
                        Post Results (Total: {Object.keys(results).length})
                    </div>
                    {Object.values(results).map(post => (
                        <button className="product_panel_button" 
                            onClick={(e) => changeView(e, "product-pane", post)}>
                            {post["post_type"] === "blog" &&
                                <PostsPane 
                                    title={post["title"]} 
                                    image={post["image_url"]}
                                    caption={post["content"]}
                                />
                            }
                            {post["post_type"] === "review" &&
                                <PostsPane 
                                    title={post["title"]} 
                                    image={post["image_url"]}
                                    caption={post["content"]}
                                    rating={post["rating"]}
                                />
                            }
                            {post["post_type"] === "recipe" &&
                                <PostsPane 
                                    title={post["title"]} 
                                    image={post["image_url"]}
                                    caption={post["caption"]}
                                    ingredients={post["ingredients"]}
                                    instructions={post["instructions"]}
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