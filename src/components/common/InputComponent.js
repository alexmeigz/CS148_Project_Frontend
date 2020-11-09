// InputComponent.js
// Engineer: Alex Mei

import React from 'react';

function Input(args) {
    return (
        <div className="form_input">
            <label for={args["name"]}> {args["name"]}: </label> 
            <input type={args["type"]} name={args["name"]} value={args["value"].price} onChange={args["onChange"]} />
            <br />
        </div>
    );
};

export default Input;