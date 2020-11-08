// FilterOption.js
// Engineer: Alex Mei

import React from 'react';

function FilterOption(args) {
    return (
        <div className="filter_option">
            <input type="checkbox" name={args["label"]} onClick={args["onCheck"]} />
            <label for={args["label"]} className="filter_label"> {args["label"]} </label> 
            <br />
        </div>
    );
};

export default FilterOption;