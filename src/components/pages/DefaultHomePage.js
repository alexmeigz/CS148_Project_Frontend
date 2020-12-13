// DefaultHomePage.js
// Engineer: Joseph Ng

import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import "./DefaultHomePage.css"

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import recipes from "../../assets/recipes.jpeg";
import products from "../../assets/products.jpeg";


function DefaultHomePage (props) {
    const [navBarHeight, setNavBarHeight] = useState(0)
    const [welcomeStyle, setWelcomeStyle] = useState(
        // {position: "absolute",
        // top: "600px",
        // left: "75%"}
    )
    const [recipeStyle, setRecipeStyle] = useState(
        // {position: "absolute",
        // top: "600px",
        // left: "25%"}
    )
    const [productStyle, setProductStyle] = useState(
        // {position: "absolute",
        // top: "600px",
        // left: "75%"}
    )
    const [mapStyle, setMapStyle] = useState(
        // {position: "absolute",
        // top: "600px",
        // left: "75%"}
    )

    function onLoginChange(value) {
        props.onLoginChange(value)
        setNavBarHeight(0)
    }

    function onUserChange(value) {
        props.onUserChange(value)
    }

    useEffect(() =>{
        let accountInfoHeight = 0;
        if (JSON.parse(sessionStorage.getItem("isLoggedIn"))){
            accountInfoHeight = 50;
        }
        setWelcomeStyle({
            top: `${150 + navBarHeight + accountInfoHeight}px`,
            left: "50%"
        })
        setRecipeStyle({
            position: "absolute",
            top: `${570 + navBarHeight + accountInfoHeight}px`,
            left: "25%"
        })
        setProductStyle({
            position: "absolute",
            top: `${570 + navBarHeight + accountInfoHeight}px`,
            left: "75%"
        })
        setMapStyle({
            position: "absolute",
            top: `${1100 + navBarHeight + accountInfoHeight}px`,
            left: "50%"
        })

        
    }, [navBarHeight]);

    return (
        // TODO: add text on top of images
        <div className="background">
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={onLoginChange} user={JSON.parse(sessionStorage.getItem("user"))} setNavBarHeight={setNavBarHeight}/>
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}
            
            <img className="banner"
                src="https://envato-shoebox-0.imgix.net/a81e/141e-7d0d-4cb4-aa0f-f31cc76f13bf/9D1A8934_b.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=1600&s=91c4d09b742019a5265eb5df1f46139c"
                alt=""
            />

            <h1 className="home-header welcome" style={welcomeStyle}> Welcome! </h1>
            
            {/* {console.log(navBarHeight)} */}

            <Link to="/recipes" className="recipes">
                <img src={recipes} alt=""/>
                <h1 className="home-header" style={recipeStyle}>Recipes</h1>
            </Link>

            <Link to="/products" className="products">
                <img src={products} alt=""/>
                <h1 className="home-header" style={productStyle}>Products</h1>
            </Link>

            <Link to="/maps" className="maps">
                <img
                    src="https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1047&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2016%2F08%2Fparadise-beach-santa-barbara-california-santabarbara0815-2000.jpg"
                    alt=""
                />
                <h1 className="home-header" style={mapStyle}>Maps</h1>
            </Link>

            <ContactUsFooter />
        </div>
    );
};

export default DefaultHomePage;