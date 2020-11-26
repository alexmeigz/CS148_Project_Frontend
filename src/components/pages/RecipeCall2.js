// import React from 'react';
import React, { useState, useEffect } from 'react';
// import React, { Component } from "react";
import Display from './Display';
// import FilterOption from './FilterOption';


function RecipeCall2(props) {

    const [results, setResults] = useState({});
    const [query, setQuery] = useState({
        q: ""
    }
    );
    const [filters, setFilters] = useState({
        health: ""
    });

    const [isListView, setIsListView] = useState(true);
    const [productView, setProductView] = useState(<Display />)
    const url = `https://api.edamam.com/search?q=${query.q}&app_id=91203381&app_key=0449d632515eb9ee5ed2ed611e0c8032&from=0&to=3`



    // function handleChange(evt) { //updating form elements, nested function
    //     const name = evt.target.name //defined in render
    //     const value = evt.target.value //defined in render
    //     //because we are using a single state object above to hold multiple properties, we must save off the current state first (b/c we are only updating part of the object).  To do this, we "spread" state via ...state and add it to the new copy of state that updateState is creating, followed by any updates we want:
    //     setQuery({
    //         ...state,
    //         [name]: value
    //     })
    // }

    // useEffect(() => {
    //     let newUrl = url
    //     if (filters["health"] !== "") {
    //         newUrl += `&health=${filters["health"]}`
    //     }
    //     fetch(newUrl, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             setResults(data)
    //         })
    //         .catch((error) => console.log("Error: " + error))
    // }, [isListView, filters, query, url])

    function search(e) {
        if (e.key === "Enter") {
            setQuery(e.target.value)
            let newUrl = url
            if (filters["health"] !== "") {
                newUrl += `&health=${filters["health"]}`
            }
            fetch(newUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    setResults(data)
                })
                .catch((error) => console.log("Error: " + error))
        }
    }

    function filter(param, value) {
        console.log(query)
        let newUrl = url + `&product_name=${query}`
        if (param != null) {
            newUrl += `&${param}=${value}`
        }
        setFilters({});
        console.log(newUrl)
        fetch(newUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setResults(data)
            })
            .catch((error) => console.log("SaveCreds saveCreds: Fetch Failure (is server up?): " + error))
    }

    function changeView(event, type, data) {
        setIsListView(prevIsListView => !prevIsListView);
        if (type === "product-pane") {
            setProductView(<Display
                website={data["hits"][0]["recipe"]["shareAs"]}
                imgUrl={data["hits"][0]["recipe"]["image"]}
                info={"hi"}
            />);
        }
    };

    return (
        <div>
            {/* <form onSubmit={submitForm}>
                <div className="form_input">
                    <label className="form_label" for="q"> Search: </label>
                    <input className="form_field" type="text" value={query.q} name="q" onChange={setQuery} />
                </div>
                <input className="form_submit" type="submit" value="Submit" />
            </form> */}

            {/* clicking/back button toggles between product list view and individual product display */}
            {!isListView

                ? <div><button className="product_back_button" onClick={(e) => changeView(e, "product-view")}>Back</button>
                    {productView}
                </div>

                : <div className="container">
                    <h1> Products </h1>
                    <div className="side_panel">
                        <input className="search_bar" placeholder="Search products..." onKeyDown={search} />
                        {/* <div className="title">
                            Filters
                        </div> */}
                        {/* <div className="filters">
                            <FilterOption name="Single Purchase" param="subscription" value=""
                                filters={filters} changeFilter={setFilters} onChange={filter} field={filters.subscription}
                            />
                            <FilterOption name="Subscription Based" param="subscription" value="true"
                                filters={filters} changeFilter={setFilters} onChange={filter} field={filters.subscription}
                            />
                        </div> */}
                    </div>
                    <div className="product_panel">
                        <div className="title">
                            Recipe Results (Total: {Object.keys(results).length})
        </div>
                        {Object.values(results).map(data => (
                            <button className="product_panel_button" onClick={(e) => changeView(e, "product-pane", {
                                website: data["hits"][0]["recipe"]["shareAs"],
                                imgUrl: data["hits"][0]["recipe"]["image"],
                                info: "hi"
                            })}>
                                <Display
                                    website={data["hits"]}
                                    imgUrl={data["hits"]}
                                    info={"hi"}
                                />
                            </button>
                        ))}
                    </div>
                </div>}
            <button onClick={filter}>filter button</button>
        </div>
    );
};

export default RecipeCall2;