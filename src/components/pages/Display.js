import React from 'react';
import "./Display.css";

export default function Display(props) {
    return (
        <div className="card">
            <div>
                <a href={props.website} target="_blank" rel="noopener noreferrer">
                    <img className="first" src={props.imgUrl} alt="" />
                    <div className="overlay">
                        <h5> {props.info} </h5>
                    </div>
                </a>
            </div>
        </div>
    );
}