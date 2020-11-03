// DefaultHomePage.js
// Engineer: Joseph Ng

import React from 'react';
import { Link } from 'react-router-dom';

import "./DefaultHomePage.css"



function DefaultHomePage () {
    return (
        // TODO: add text on top of images
        <div className="background">
            
            <img className="banner"
                src="https://www.helpguide.org/wp-content/uploads/table-with-grains-vegetables-fruit-768.jpg"
                alt="Banner"
            />
            
            
            {/* <hr/> */}
            
            <Link to="/recipes">
                <img className="recipes"
                    src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"
                    alt="Recipes"
                />
            </Link>

            <Link to="/products">
                <img className="products"
                    src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.616.462.suffix/1537973085542.jpeg"
                    alt="Products"
                />
            </Link>



        </div>
    );
};

export default DefaultHomePage;