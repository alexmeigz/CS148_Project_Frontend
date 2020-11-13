// NavigationBar.js
// Engineer: Joseph Ng

import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css'

function NavigationBar(props) {
    var accountType = "Home";

    function handleLoginChange(value) {
        props.onLoginChange(value)
        // console.log(value);
    }

    return (
        <div>
            <ul className="navigation-bar">
                <Link to="/">
                    <li className="logo"><img
                        src="https://ih1.redbubble.net/image.1047402521.8408/pp,840x830-pad,1000x1000,f8f8f8.u1.jpg"
                        alt="Logo" />
                    </li>
                </Link>
                <li className="navigation-links">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/maps">Maps</Link></li>
                        <li><Link to="/vendors">Vendors</Link></li>
                        <li><Link to="/recipes">Recipes</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li className="profile">{props.isLoggedIn
                            ? <Link to="/my-profile">My Profile</Link>
                            : null
                        }
                        </li>
                        <li>{(props.isLoggedIn) && (accountType === "Home" || accountType === "Resturant")
                                ? <Link to="/my-products">My Products</Link>
                                : null
                            }
                        </li>

                        <li>
                            <li>{!(props.isLoggedIn)
                                    ? <Link to="/create-user">Create Account</Link>
                                    : null
                                }
                            </li>

                            <li>{!(props.isLoggedIn)
                                    ? <Link to="/login">Login</Link> // remove "onClick={() => handleLoginChange(true)}" when not testing
                                    : <Link onClick={() => handleLoginChange(false)} to="/logout">Logout</Link>
                                }
                            </li>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default NavigationBar;