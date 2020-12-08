// App.js
// Modified by: Joseph Ng

// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// import NavigationBar from './components/common/NavigationBar';
// import ContactUsFooter from "./components/common/ContactUsFooter";
// import AccountInfoBar from "./components/common/AccountInfoBar";

import DefaultHomePage from './components/pages/DefaultHomePage';
import MapsPage from './components/pages/MapsPage';
import VendorsPage from './components/pages/VendorsPage';
import RecipesPage from './components/pages/RecipesPage';
import PostsPage from './components/pages/PostsPage';
import ProductsPage from './components/pages/ProductsPage';
import LoginPage from "./components/pages/LoginPage";
// import LogoutPage from "./components/pages/LogoutPage";
import ContactUsPage from "./components/pages/ContactUsPage";
import MyProfilePage from "./components/pages/MyProfilePage";
import MyProductsPage from "./components/pages/MyProductsPage";
import VendorApps from "./components/pages/VendorApps";
import AdminPage from "./components/pages/AdminPage";
import CreateUserPage from "./components/pages/CreateUserPage";

import VendorOrdersPage from "./components/pages/VendorOrdersPage";
import OrdersPage from "./components/pages/OrdersPage";

import SubmitReportPage from "./components/pages/SubmitReportPage";


import ErrorPage from './components/pages/ErrorPage';
// import ContactUsFooter from './components/common/ContactUsFooter';

//import ProductForm from './components/pages/CreateProduct';
//import LoggedInHomePage from './components/pages/LoggedInHomePage';
import RecipeCall from './components/pages/RecipeCall'
import Maps1 from "./components/pages/Maps1"

// sessionStorage.setItem("isLoggedIn", JSON.stringify(false))
// sessionStorage.setItem("user", JSON.stringify({
//     user_id: 0,
//     username: "Loading",
//     password_hash: "",
//     email: "Loading",
//     account_type: "Loading",
//     vendor_location: "Loading",
//     credits: 0,
//     profile_image_url: "https://www.cnam.ca/wp-content/uploads/2018/06/default-profile.gif",
//     vendor_image_url: "https://www.cnam.ca/wp-content/uploads/2018/06/default-profile.gif"
// }))

function App() {
    // sessionStorage.clear();
    // eslint-disable-next-line
    let server = "http://localhost:8118/api"
    if (process.env.REACT_APP_REMOTE === "1") { 
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }
    if (process.env.NODE_ENV !== "development") {
        server = "https://nutriflix-flask-backend.herokuapp.com/api"
    }

    const [isLoading, setIsloading] = useState(true);

    
    // eslint-disable-next-line
    const [isLoggedIn, setIsLoggedIn] = useState(false); // testing conditional rendering
    // eslint-disable-next-line
    const [user, setUser] = useState({
        user_id: 0,
        username: "Loading",
        password_hash: "",
        email: "Loading",
        account_type: "Loading",
        vendor_location: "Loading",
        credits: 0,
        profile_image_url: "https://www.cnam.ca/wp-content/uploads/2018/06/default-profile.gif",
        vendor_image_url: "https://www.cnam.ca/wp-content/uploads/2018/06/default-profile.gif"
    })

    

    function onLoginChange(value) {
        sessionStorage.setItem("isLoggedIn", value)
        setIsLoggedIn(value);
    }
    // eslint-disable-next-line
    function onUserChange(value) {
        sessionStorage.setItem("user", JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("user")),
            ...value
        }))
        setUser({
            ...user,
            ...value
        });
    }


    useEffect(() => {
        // console.log(JSON.parse(sessionStorage.getItem("isLoggedIn")))
        // console.log(JSON.parse(sessionStorage.getItem("user")))
        const interval = setInterval(() => {
            if (JSON.parse(sessionStorage.getItem("isLoggedIn")) && JSON.parse(sessionStorage.getItem("user")) !== 0) {
                console.log("ping")
                let url = `${server}/user/?user_id=${JSON.parse(sessionStorage.getItem("user")).user_id}`

                fetch(url, 
                    {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },           
                    })
                    .then(response => response.json()) 
                    .then(data => {
                    if(data["user_id"] === JSON.parse(sessionStorage.getItem("user"))["user_id"]){
                        onUserChange(data)
                    }
                    else{
                        alert(`Error logging in JSON.parse(sessionStorage.getItem("user")): ${data["message"]}`)
                    }
                    })
                    .catch((error) => console.log("User login error: "+ error))
            }
        }, 60000);
        return () => clearInterval(interval);
    }, [server, onUserChange, isLoggedIn, user])

    useEffect(() => {
        if (!JSON.parse(sessionStorage.getItem("user"))) {
            sessionStorage.setItem("isLoggedIn", JSON.stringify(false))
            sessionStorage.setItem("user", JSON.stringify({
                user_id: 0,
                username: "Loading",
                password_hash: "",
                email: "Loading",
                account_type: "Loading",
                vendor_location: "Loading",
                credits: 0,
                profile_image_url: "https://www.cnam.ca/wp-content/uploads/2018/06/default-profile.gif",
                vendor_image_url: "https://www.cnam.ca/wp-content/uploads/2018/06/default-profile.gif"
            }))
            window.location.reload()
        } else {
            setIsloading(false)
        }
    }, [])

    if (isLoading) {
        return <div><h1>Webpage loading</h1><p style={{textAlign: "center"}}>If you are not redirected in the next 5 seconds, please refresh the page!</p></div>;
    }
    
    return (
        // TODO: Change to new Nutriflix components
        <main>
            <Switch>
                <Route path="/" exact>
                    <DefaultHomePage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>
                <Route path="/posts">
                    <PostsPage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>
                <Route path="/maps">
                    <MapsPage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>
                <Route path="/vendors">
                    <VendorsPage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>
                <Route path="/recipes">
                    <RecipesPage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>
                <Route path="/products">
                    <ProductsPage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>
                <Route path="/login">
                    <LoginPage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>
                {/* <Route path="/logout">
                    <LogoutPage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        JSON.parse(sessionStorage.getItem("user"))={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route> */}
                <Route path="/contact-us">
                    <ContactUsPage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>
                
                <Route path="/submit-report">
                    <SubmitReportPage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>


                {/* Must be signed in to access pages */}
                {JSON.parse(sessionStorage.getItem("isLoggedIn"))
                    ? (<Route path="/my-profile">
                        <MyProfilePage
                            isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                            onLoginChange={onLoginChange}
                            user={JSON.parse(sessionStorage.getItem("user"))}
                            onUserChange={onUserChange}
                        />
                    </Route>)
                    : null
                }
                {JSON.parse(sessionStorage.getItem("isLoggedIn"))
                    ? (<Route path="/my-products">
                        <MyProductsPage
                            isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                            onLoginChange={onLoginChange}
                            user={JSON.parse(sessionStorage.getItem("user"))}
                            onUserChange={onUserChange}
                        />
                    </Route>)
                    : null
                }
                {JSON.parse(sessionStorage.getItem("isLoggedIn")) 
                    ? (<Route path="/admin-panel">
                        <AdminPage
                            isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                            onLoginChange={onLoginChange}
                            user={JSON.parse(sessionStorage.getItem("user"))}
                            onUserChange={onUserChange}
                        />
                    </Route>)
                    : null
                }
                {JSON.parse(sessionStorage.getItem("isLoggedIn"))
                    ? (<Route path="/my-orders">
                        <OrdersPage
                            isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                            onLoginChange={onLoginChange}
                            user={JSON.parse(sessionStorage.getItem("user"))}
                            onUserChange={onUserChange}
                        />
                    </Route>)
                    : null
                }
                {JSON.parse(sessionStorage.getItem("isLoggedIn"))
                    ? (<Route path="/vendor-orders">
                        <VendorOrdersPage
                            isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                            onLoginChange={onLoginChange}
                            user={JSON.parse(sessionStorage.getItem("user"))}
                            onUserChange={onUserChange}
                        />
                    </Route>)
                    : null
                }   

                {!JSON.parse(sessionStorage.getItem("isLoggedIn"))
                    ? (<Route path="/create-user">
                        <CreateUserPage
                            isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                            onLoginChange={onLoginChange}
                            user={JSON.parse(sessionStorage.getItem("user"))}
                            onUserChange={onUserChange}
                        />
                    </Route>)
                    : null
                }


                <Route path="/vendor-apps">
                    <VendorApps
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>

                <Route path="/recipe-call">
                    <RecipeCall
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>

                <Route path="/google-maps1">
                    <Maps1
                        isLoggedIn={isLoggedIn}
                        user={user}
                    />
                </Route>

                <Route>
                    <ErrorPage
                        isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))}
                        onLoginChange={onLoginChange}
                        user={JSON.parse(sessionStorage.getItem("user"))}
                        onUserChange={onUserChange}
                    />
                </Route>
            </Switch>
        </main>
    );
};
export default App;
