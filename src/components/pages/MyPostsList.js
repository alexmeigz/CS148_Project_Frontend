// MyPostsList.js
// Engineer: Alex Mei

import React, { useState, useEffect } from 'react';

import "./Product.css"
import PostsPane from "./PostsPane.js"

import ProductView from "./ProductView";

// import NavigationBar from '../common/NavigationBar';
// import ContactUsFooter from "../common/ContactUsFooter";
// import AccountInfoBar from "../common/AccountInfoBar"

function MyPostsList (props) { 
    let user_id = JSON.parse(sessionStorage.getItem("user")).user_id;
    
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    // const url = `${server}/product/?display_all=True`
    
    const [results, setResults] = useState({});
    const [isListView, setIsListView] = useState(true);
    const [productView, setProductView] = useState(<ProductView />)

    useEffect(() => {
        
        if (isListView) {
            let newUrl = `${server}/post/?display_all=True&user_id=${user_id}`
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
                setResults(data)
            })
            .catch((error) => console.log("Error: " + error))
        }
        // }, 500);
        // return () => clearInterval(interval);
    }, [server, user_id, isListView])
    
    function changeView(event, type, productData) {
        setIsListView(prevIsListView => !prevIsListView);
        if (type === "product-pane" && isListView) {
            setProductView(<ProductView 
                productData={productData} 
                isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} 
                user={JSON.parse(sessionStorage.getItem("user"))} 
                onUserChange={props.onUserChange}
            />);
        }
    };


    return (
        <div>
            {/* clicking/back button toggles between product list view and individual product display */}
            {!isListView

            ? <div><button className="product_back_button" onClick={(e) => changeView(e, "product-view")}>Back</button>
                {productView}
            </div>

            : <div className="container">
                
                <div className="my_product_panel">
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
                                    reacts={post["reacted_users"].length}
                                    reacted={post["reacted_users"].includes(JSON.parse(sessionStorage.getItem("user")).user_id)}
                                />
                            }
                            {post["post_type"] === "review" &&
                                <PostsPane 
                                    title={post["title"]} 
                                    image={post["image_url"]}
                                    caption={post["content"]}
                                    rating={post["rating"]}
                                    reacts={post["reacted_users"].length}
                                    reacted={post["reacted_users"].includes(JSON.parse(sessionStorage.getItem("user")).user_id)}
                                />
                            }
                            {post["post_type"] === "recipe" &&
                                <PostsPane 
                                    title={post["title"]} 
                                    image={post["image_url"]}
                                    caption={post["caption"]}
                                    ingredients={post["ingredients"]}
                                    instructions={post["instructions"]}
                                    reacted={post["reacted_users"].includes(JSON.parse(sessionStorage.getItem("user")).user_id)}
                                    reacts={post["reacted_users"].length}
                                />
                            }
                            
                        </button>
                    ))}
                </div>
            </div>
            }
        </div>
    );
};

export default MyPostsList;