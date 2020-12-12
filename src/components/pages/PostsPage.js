// PostsPage.js
// Engineer: Alex Mei

import React, {useState} from 'react';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";

import PostsList from "./PostsList";
import BlogForm from "./CreateBlog";
import RecipeForm from "./CreateRecipe";
import ReviewForm from "./CreateReview";

function PostsPage (props) {
    const [isPostView, setPostView] = useState(true);
    const [isBlog, setBlog] = useState(true);
    const [isRecipe, setRecipe] = useState(true);
    const [isReview, setReview] = useState(true);

    function toggleView(e) {
        if (e.target.className === "create-blog-button") {
            setPostView(false);
            setBlog(true);
            setRecipe(false);
            setReview(false);
        }
        else if (e.target.className === "create-recipe-button") {
            setPostView(false);
            setBlog(false);
            setRecipe(true);
            setReview(false);
        }
        else if (e.target.className === "create-review-button") {
            setPostView(false);
            setBlog(false);
            setRecipe(false);
            setReview(true);
        }
        else if (e.target.className === "back-button") {
            setPostView(true);
            setBlog(false);
            setRecipe(false);
            setReview(false);
        }
    }

    function onLoginChange(value) {
        props.onLoginChange(value)
    }
    function onUserChange(value) {
        props.onUserChange(value)
    }
    return (
        // TODO
        <div>
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={onLoginChange} user={JSON.parse(sessionStorage.getItem("user"))} />
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}

            <div className="button-bar">
                {JSON.parse(sessionStorage.getItem("isLoggedIn"))
                    ? 
                    <div>
                        {isPostView
                            ? <div>
                                <button className="create-blog-button" onClick={toggleView}> Create Blog Post </button>
                                <button className="create-review-button" onClick={toggleView}> Create Review </button>
                                <button className="create-recipe-button" onClick={toggleView}> Create Recipe </button>
                            </div>
                            : <button className="back-button" onClick={toggleView}> Back </button>
                        }
                    </div>
                    : null
                }
            </div>

            { isPostView ?
                <PostsList isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/>
            : 
            <div>
                { isBlog &&
                    <BlogForm isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/>    
                }
                { isRecipe &&
                    <RecipeForm isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/>    
                }
                { isReview &&
                    <ReviewForm isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/>    
                }
            </div>
                
            }
            

            <ContactUsFooter />
        </div>
    );
};

export default PostsPage;