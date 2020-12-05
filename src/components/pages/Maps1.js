import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';



function Maps1(props) {

    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    const [state, updateState] = useState({
        q: "",
        longitude: 0,
        latitude: 0,
        z: 1,
        // showHideDemo: false
    })

    const defaultProps = {
        center: {
            lat: state.latitude,
            lng: state.longitude
        },
        zoom: state.z
    };

    // const [results, setResults] = useState({});

    function handleChange(evt) { //updating form elements, nested function
        const name = evt.target.name //defined in render
        const value = evt.target.value //defined in render
        //because we are using a single state object above to hold multiple properties, we must save off the current state first (b/c we are only updating part of the object).  To do this, we "spread" state via ...state and add it to the new copy of state that updateState is creating, followed by any updates we want:
        updateState({
            ...state,
            [name]: value
        })
    }

    const submitForm = (evt) => {  //send creds to backend, nested arrow function
        // alert("button clicked")
        evt.preventDefault();

        let url = `https://developers.zomato.com/api/v2.1/locations?query=${state.q}`
        let newUrl = url;
        fetch(newUrl,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'user-key': 'b0a63821c480eabed3ce36ee8033df7d'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data["user_has_addresses"]) {
                    //setResults(data)
                    updateState({
                        ...state,
                        longitude: data["location_suggestions"][0]["longitude"],
                        latitude: data["location_suggestions"][0]["latitude"],
                        z: 7,
                        // showHideDemo: true
                    })
                    // console.log(state)
                    console.log(data)
                    // alert(`${state.longitude}`)
                    //console.log(data)

                    // let secondUrl = 

                }
                else {
                    alert(`Error with parameters`)
                }
            })
            .catch((error) => console.log("Search error: " + error))
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form_input">
                    <label className="form_label" for="q"> Search: </label>
                    <input className="form_field" type="text" value={state.q} name="q" onChange={handleChange} />
                </div>
                <center><input className="form_submit" type="submit" value="Submit" /></center>
            </form>
            < div style={{ height: '100vh', width: '100%' }
            }>

                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBZP0ZV1R148SNRp2uxco36NbK-675hKAE' }}
                    defaultCenter={defaultProps.center}
                    center={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    zoom={state.z}
                >
                    {console.log(state)}
                    <AnyReactComponent
                        lat={state.latitude}
                        lng={state.longitude}
                        text="My Marker"
                    />
                </GoogleMapReact>

            </div >
        </div>
    );
}

export default Maps1;