// NavigationBar.js
// Engineer: Joseph Ng

import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.css'

function NavigationBar(props) {
    var accountType = "Vendor (Home)";
    return (
        <div>
            <ul className="navigation-bar">
                <Link to="/">
                    <li className="logo"><img
                        src="https://www.ideasmama.com/wp-content/uploads/pepega.jpg"
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
                        <li>{(props.isLoggedIn)
                            ? <Link to="/">My Application</Link>
                            : null
                        }
                        </li>
                        <li>{(props.isLoggedIn) && (accountType === "Vendor (Resturant)" || accountType === "Vendor (Home)")
                            ? <Link to="/my-products">My Products</Link>
                            : null
                        }
                        </li>
                        <li>{!(props.isLoggedIn)
                            ? <Link to="/login">Login</Link>
                            : <Link to="/logout">Logout</Link>
                        }
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default NavigationBar;