import React from 'react';
import "./Display.css";

export default function Display(props) {
    return (
        <div className="card">
            <div>
                <a href={props.website} target="_blank">
                    <img className="first" src={props.imgUrl} />
                    <div className="overlay">
                        <h5> {props.info} </h5>
                    </div>
                </a>
            </div>
        </div>
    );
}