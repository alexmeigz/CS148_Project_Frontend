// DefaultHomePage.js
// Engineer: Joseph Ng

import React from 'react';
import { Link } from 'react-router-dom';

import "./DefaultHomePage.css"

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar";
import recipes from "../../assets/recipes.jpeg";
import products from "../../assets/products.jpeg";


function DefaultHomePage (props) {
    // TODO: get account info from backend

    function onLoginChange(value) {
        props.onLoginChange(value)
    }

    function onUserChange(value) {
        props.onUserChange(value)
    }
    return (
        // TODO: add text on top of images
        <div className="background">
            <NavigationBar isLoggedIn={JSON.parse(sessionStorage.getItem("isLoggedIn"))} onLoginChange={onLoginChange} user={JSON.parse(sessionStorage.getItem("user"))} />
            {JSON.parse(sessionStorage.getItem("isLoggedIn")) ? <AccountInfoBar user={JSON.parse(sessionStorage.getItem("user"))} onUserChange={onUserChange}/> : null}
            
            <img className="banner"
                src="https://envato-shoebox-0.imgix.net/a81e/141e-7d0d-4cb4-aa0f-f31cc76f13bf/9D1A8934_b.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=1600&s=91c4d09b742019a5265eb5df1f46139c"
                alt=""
            />

            <h1 className="home-header welcome"> Welcome! </h1>
            
            {/* <hr/> */}

            <Link to="/recipes" className="recipes">
                <img src={recipes} alt=""/>
                <h1 className="home-header">Recipes</h1>
            </Link>

            <Link to="/products" className="products">
                <img src={products} alt=""/>
                <h1 className="home-header">Products</h1>
            </Link>

            <Link to="/maps" className="maps">
                <img
                    src="https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1047&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2016%2F08%2Fparadise-beach-santa-barbara-california-santabarbara0815-2000.jpg"
                    alt=""
                />
                <h1 className="home-header">Maps</h1>
            </Link>

            <ContactUsFooter />
        </div>
    );
};

export default DefaultHomePage;