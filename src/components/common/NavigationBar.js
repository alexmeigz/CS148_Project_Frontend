// NavigationBar.js
// Engineer: Joseph Ng

import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css'
import logo from '../../assets/logo.png'

function NavigationBar(props) {
    const navBar = useRef()

    function onLoginChange(value) {
        props.onLoginChange(value)
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
    }

    useEffect(() =>{
        // console.log(navBar.current.offsetHeight)
        const interval = setInterval(() => {
        if (props.setNavBarHeight) {
            props.setNavBarHeight(navBar.current.offsetHeight)
            // console.log(navBar.current.offsetHeight)
        }
        }, 100);
        return () => clearInterval(interval);
    });

    return (
        <div ref={navBar}>
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
                        <li className="profile">{JSON.parse(sessionStorage.getItem("isLoggedIn"))
                            ? <Link to="/my-profile">My Profile</Link>
                            : null
                        }
                        </li>
                        <li>{(JSON.parse(sessionStorage.getItem("isLoggedIn")))
                                ? <Link to="/my-orders">My Orders</Link>
                                : null
                            }
                        </li>
                        <li>{(JSON.parse(sessionStorage.getItem("isLoggedIn"))) && (JSON.parse(sessionStorage.getItem("user")).account_type === "Home" || JSON.parse(sessionStorage.getItem("user")).account_type === "Business" || JSON.parse(sessionStorage.getItem("user")).account_type === "Admin")
                                ? <Link to="/my-products">My Products</Link>
                                : null
                            }
                        </li>
                        <li>{(JSON.parse(sessionStorage.getItem("isLoggedIn"))) && (JSON.parse(sessionStorage.getItem("user")).account_type === "Home" || JSON.parse(sessionStorage.getItem("user")).account_type === "Business" || JSON.parse(sessionStorage.getItem("user")).account_type === "Admin")
                                ? <Link to="/vendor-orders">My Vendor Orders</Link>
                                : null
                            }
                        </li>
                        <li>{(JSON.parse(sessionStorage.getItem("isLoggedIn"))) && (JSON.parse(sessionStorage.getItem("user")).account_type === "Admin")
                                ? <Link to="/admin-panel"> Admin Panel </Link>
                                : null
                            }
                        </li>

                        <li>
                            <li>{!(JSON.parse(sessionStorage.getItem("isLoggedIn")))
                                    ? <Link to="/create-user">Create Account</Link>
                                    : null
                                }
                            </li>

                            <li>{!(JSON.parse(sessionStorage.getItem("isLoggedIn")))
                                    ? <Link to="/login">Login</Link> // remove "onClick={() => onLoginChange(true)}" when not testing
                                    : <Link onClick={() => onLoginChange(false)} to="/">Logout</Link>
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