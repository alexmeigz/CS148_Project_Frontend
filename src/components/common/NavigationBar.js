// NavigationBar.js
// Engineer: Joseph Ng

import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css'
import logo from '../../assets/logo.png'

function NavigationBar(props) {
    var accountType = null;
    if(props.user){
        accountType = props.user["account_type"];
    }

    function handleLoginChange(value) {
        props.onLoginChange(value)
        // console.log(value);
    }

    return (
        <div>
            <ul className="navigation-bar">
                <Link to="/">
                    <li className="logo">
                        <img src={logo} alt="" />
                    </li>
                </Link>
                <li className="navigation-links">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/posts">Posts</Link></li>
                        <li><Link to="/maps">Maps</Link></li>
                        <li><Link to="/vendors">Vendors</Link></li>
                        <li><Link to="/recipes">Recipes</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li className="profile">{props.isLoggedIn
                            ? <Link to="/my-profile">My Profile</Link>
                            : null
                        }
                        </li>
                        <li>{(props.isLoggedIn) && (accountType === "Home" || accountType === "Business" || accountType === "Admin")
                                ? <Link to="/my-products">My Products</Link>
                                : null
                            }
                        </li>
                        <li>{(props.isLoggedIn) && (accountType === "Admin")
                                ? <Link to="/admin-panel"> Admin Panel </Link>
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