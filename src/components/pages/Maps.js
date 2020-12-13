// MapsPage.js
// Engineer: Sriya Aluru

import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.tsx'
import "./Info.css";

const AnyReactComponent = ({ text }) => <div className="info">{text}</div>;

function Maps(props) {
    const [state, updateState] = useState({
        q: "",
        longitude: 0.0,
        latitude: 0.0,
        z: 1,
    })
    const [show, setShow] = useState(false);
    const [restaurantResults, setRestaurantResults] = useState({});
    const [selectedCenter, setSelectedCenter] = useState(false);
    const [query, setQuery] = useState("");
    // const [reload, setReload] = useState(false);
    useEffect(() => {
        let newUrl = `https://developers.zomato.com/api/v2.1/search?lat=${state.latitude}&lon=${state.longitude}`
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
                if (data["results_found"] !== 0) {
                    setRestaurantResults(data)
                    setShow(true)
                }
            })
            .catch((error) => console.log("Search error: " + error))
    }, [state])
    function handleChange(evt) {
        evt.preventDefault();
        //const name = evt.target.name
        const value = evt.target.value
        setQuery(value)
    }

    const submitForm = (evt) => {
        evt.preventDefault();
        let url = `https://developers.zomato.com/api/v2.1/locations?query=${query}`
        fetch(url,
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
                    updateState({
                        ...state,
                        q: query,
                        longitude: data["location_suggestions"][0]["longitude"],
                        latitude: data["location_suggestions"][0]["latitude"],
                        z: 12,
                    })
                    setQuery("");
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
                    <input className="form_field" type="search" value={query} name="q" onChange={handleChange} />
                </div>
                <center><input className="form_submit" type="submit" value="Submit" /></center>
            </form>
            < div style={{ height: '100vh', width: '100%' }
            }>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBZP0ZV1R148SNRp2uxco36NbK-675hKAE' }}
                    defaultCenter={{
                        lat: 0,
                        lng: 0
                    }}
                    center={{
                        lat: state.latitude,
                        lng: state.longitude
                    }}
                    defaultZoom={1}
                    zoom={state.z}
                >
                    {console.log(show)}
                    {/* <AnyReactComponent
                        lat={0}
                        lng={0}
                        text="My Marker"
                    /> */}

                    {/* <Marker
                        lat={0}
                        lng={0}
                        name="My Marker"
                    > */}
                    {/* </Marker> */}

                    {show &&
                        Object.values(restaurantResults["restaurants"]).map(rest => (
                            <Marker
                                lat={parseFloat(rest["restaurant"]["location"]["latitude"])}
                                lng={parseFloat(rest["restaurant"]["location"]["longitude"])}
                                // name="My Marker"
                                onClick={() => {
                                    console.log(rest)
                                    setSelectedCenter({
                                        lat: parseFloat(rest["restaurant"]["location"]["latitude"]),
                                        lng: parseFloat(rest["restaurant"]["location"]["longitude"]),
                                        name: rest["restaurant"]["name"],
                                        url: rest["restaurant"]["url"],
                                        cuisine: rest["restaurant"]["cuisines"],
                                        rating: rest["restaurant"]["user_rating"]["aggregate_rating"],
                                        address: rest["restaurant"]["location"]["address"]
                                    });
                                }}
                            >
                            </Marker>
                        ))
                    }
                    {
                        selectedCenter &&
                        <AnyReactComponent className="info"
                            lat={selectedCenter.lat}
                            lng={selectedCenter.lng}
                            text={
                                <div >
                                    <a href={selectedCenter.url}><h2>{selectedCenter.name}</h2></a>
                                    <h2>Cuisine: {selectedCenter.cuisine}</h2>
                                    <h2>Rating: {selectedCenter.rating}</h2>
                                    <h2>Location: {selectedCenter.address} </h2>
                                </div>
                            }
                        />
                    }

                </GoogleMapReact>
            </div >
        </div >
    );
}
export default Maps;