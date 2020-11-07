// DefaultHomePage.js
// Engineer: Joseph Ng

import React from 'react';
import { Link } from 'react-router-dom';

import "./DefaultHomePage.css"

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar"

function DefaultHomePage (props) {
    // TODO: get account info from backend
    return (
        // TODO: add text on top of images
        <div className="background">
            <NavigationBar isLoggedIn={props.isLoggedIn? "LoggedIn": null}/>
            {props.isLoggedIn ? <AccountInfoBar /> : null}
            
            <img className="banner"
                src="https://www.helpguide.org/wp-content/uploads/table-with-grains-vegetables-fruit-768.jpg"
                alt="Banner"
            />
            
            {/* <hr/> */}

            <Link to="/recipes" className="recipes">
                <img
                    src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"
                    alt="Recipes"
                />
                <h1>Recipes</h1>
            </Link>

            <Link to="/products" className="products">
                <img
                    src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.616.462.suffix/1537973085542.jpeg"
                    alt="Products"
                />
                <h1>Products</h1>
            </Link>

            <Link to="/maps" className="maps">
                <img
                    src="https://arturodeza.wdfiles.com/local--files/data-log/ucsb-from-air.jpg"
                    alt="Maps"
                />
                <h1>Maps</h1>
            </Link>

            <ContactUsFooter />
        </div>
    );
};

export default DefaultHomePage;