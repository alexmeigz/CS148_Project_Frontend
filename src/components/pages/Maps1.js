import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { InfoWindow } from "react-google-maps";
import Marker from './Marker.tsx'

//const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
//const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Maps1(props) {
    const [state, updateState] = useState({
        q: "",
        longitude: 0.0,
        latitude: 0.0,
        z: 1,
    })
    const [show, setShow] = useState(false);
    const [restaurantResults, setRestaurantResults] = useState({});
    const [selectedCenter, setSelectedCenter] = useState(false);
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
        const name = evt.target.name
        const value = evt.target.value
        updateState({
            ...state,
            [name]: value
        })
    }
    const submitForm = (evt) => {
        evt.preventDefault();
        let url = `https://developers.zomato.com/api/v2.1/locations?query=${state.q}`
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
                        longitude: data["location_suggestions"][0]["longitude"],
                        latitude: data["location_suggestions"][0]["latitude"],
                        z: 12,
                    })
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
                    {/* <div></div>
                    <AnyReactComponent
                        lat={0}
                        lng={0}
                        text="Hi"
                    />
                    <Marker
                        lat={0}
                        lng={0}
                        name="My Marker"
                    /> */}
                    <InfoWindow
                        visible={true}
                        onCloseClick={() => {
                            setSelectedCenter(null);
                        }}
                        position={{
                            lat: 0,
                            lng: 0
                        }}
                    >
                        <h1>Hi</h1>
                    </InfoWindow>
                    {show &&
                        Object.values(restaurantResults["restaurants"]).map(rest => (
                            <Marker
                                lat={parseFloat(rest["restaurant"]["location"]["latitude"])}
                                lng={parseFloat(rest["restaurant"]["location"]["longitude"])}
                                // name="My Marker"
                                onClick={() => {
                                    setSelectedCenter({
                                        lat: parseFloat(rest["restaurant"]["location"]["latitude"]),
                                        lng: parseFloat(rest["restaurant"]["location"]["longitude"])
                                    });
                                }}

                            >
                            </Marker>

                            // { selectedCenter &&
                            //     <InfoWindow
                            //     visible={true}
                            //     onCloseClick={() => {
                            //         setSelectedCenter(null);
                            //     }}
                            //     position={{
                            //         lat: parseFloat(rest["restaurant"]["location"]["latitude"]),
                            //         lng: parseFloat(rest["restaurant"]["location"]["longitude"])
                            //     }}

                            // >
                            //     <h1>Hi</h1>
                            // </InfoWindow>
                            // }

                        ))
                    }


                </GoogleMapReact>
            </div >
        </div >
    );
}
export default Maps1;