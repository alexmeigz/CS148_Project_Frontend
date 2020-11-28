// FilterOption.js
// Engineer: Alex Mei

import React from 'react';

function FilterOption(args) {
    return (
        <div className="filter_option">
            <input type="checkbox" name={args["name"]}
                onChange={(e) => {
                    if(e.target.checked){
                        if(args["field"] === !!!args["value"]){
                            args["changeFilter"]({
                                ...args["filters"],
                                [args["param"]]: null
                            }, args["onChange"](null, null))
                        }
                        else{
                            args["changeFilter"]({
                                ...args["filters"],
                                [args["param"]]: !!args["value"]
                            }, args["onChange"](args["param"], !!args["value"]))
                        }
                    }
                    else if(args["field"] === !!args["value"]){
                        args["changeFilter"]({
                            ...args["filters"],
                            [args["param"]]: null
                        }, args["onChange"](null, null))
                    }
                    else{
                        args["changeFilter"]({
                            ...args["filters"],
                            [args["param"]]: !!!args["value"]
                        }, args["onChange"](args["param"], !!!args["value"]))
                    }
                }} />
            <label for={args["name"]} className="filter_label"> {args["name"]} </label> 
            <br />
        </div>
    );
};

export default FilterOption;