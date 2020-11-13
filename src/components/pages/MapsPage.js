// MapsPage.js
// Engineer: Joseph Ng

import React from 'react';
// import BingMapsReact from "bingmaps-react";
// import { ReactBingmaps } from 'react-bingmaps';

import NavigationBar from '../common/NavigationBar';
import ContactUsFooter from "../common/ContactUsFooter";
import AccountInfoBar from "../common/AccountInfoBar"
import BingMapsReact from "bingmaps-react";
import "../common/Maps.css"

function MapsPage(props) {
    function handleLoginChange(value) {
        props.onLoginChange(value)
    }
    function handleUserChange(value) {
        props.onUserChange(value)
    }
    return (
        // TODO:
        <div>
            <NavigationBar isLoggedIn={props.isLoggedIn} onLoginChange={handleLoginChange}/>
            {props.isLoggedIn ? <AccountInfoBar user={props.user} onUserChange={handleUserChange}/> : null}

            <h1>Search Map</h1>


            <div className="maps__container">

                {/* ADAPTED FROM https://github.com/milespratt/bingmaps-react */}
                <div key="bingMap">
                    <BingMapsReact
                        bingMapsKey="Al6xM6_6DfVwdCAvRULkiOWrW0SYTDfS13YApD5QUruQJ-fIi4IuobDFRNzHeFQB"
                    />
                </div>
            </div>

            <ContactUsFooter />
        </div>
    );
};

export default MapsPage;

// import React, { Component } from 'react';
// // import classSet from 'classnames';
// // import PropTypes from 'prop-types';
// // import ReactDOMServer from 'react-dom/server';
// import './ReactBingmaps.css';

// var map = {},
//     Microsoft,
//     infobox = {},
//     scriptURL = "https://www.bing.com/api/maps/mapcontrol?callback=bingmapsCallback",
//     pendingProps = [];

// class ReactBingmaps extends Component {
//     constructor(props) {
//         super(props);
//         if (document.querySelector('script[src="' + scriptURL + '"]') === null) {
//             this.loadScript(scriptURL);
//             window.bingmapsCallback = function () {
//                 Microsoft = window.Microsoft;
//                 this.afterDependencyLoad(pendingProps);
//             }.bind(this);
//         }
//     }
//     componentDidMount() {
//         if (Microsoft === null || Microsoft === undefined) {
//             pendingProps.push(this.props);
//         }
//         else {
//             this.reactBingmaps(this.props, Microsoft);
//         }
//     }
//     afterDependencyLoad(pendingProps) {
//         try {
//             pendingProps.map((props) => this.reactBingmaps(props, Microsoft));
//         }
//         catch (exception) {
//             console.log("Error loading Microsoft bingmaps");
//         }
//     }
//     componentWillUnmount() {
//         try {
//             let mapReference = this.props.id ? ('#' + this.props.id) : '.react-bingmaps';
//             if (map[mapReference])
//                 //map[mapReference].dispose();

//                 map[mapReference] = undefined;
//             infobox = {};
//             pendingProps = [];
//         }
//         catch (exception) {
//             console.log(exception);
//         }
//     }
//     loadScript(url) {
//         var script = document.createElement("script")
//         script.type = "text/javascript";
//         script.async = true;
//         script.defer = true;
//         script.src = url;
//         document.getElementsByTagName("head")[0].appendChild(script);
//     }
//     componentWillReceiveProps(nextProps) {
//         let mapReference = nextProps.id ? ('#' + nextProps.id) : '.react-bingmaps';
//         if (this.props.center.join() !== nextProps.center.join()) {
//             this.setMapCenter(nextProps.center, mapReference);
//         }
//         if (this.props.zoom !== nextProps.zoom) {
//             this.setMapZoom(nextProps.zoom, mapReference);
//         }
//         if (this.props.mapTypeId !== nextProps.mapTypeId) {
//             this.setMapTypeId(nextProps.mapTypeId, nextProps.center, nextProps.heading, mapReference);
//         }
//     }
//     reactBingmaps(props, Microsoft) {
//         const {
//             bingmapKey,
//             mapHandlers
//         } = props;
//         if (bingmapKey && Microsoft) {
//             let mapReference = props.id ? ('#' + props.id) : '.react-bingmaps';
//             if (!map[mapReference]) {
//                 map[mapReference] = new Microsoft.Maps.Map(mapReference, {
//                     credentials: "Al6xM6_6DfVwdCAvRULkiOWrW0SYTDfS13YApD5QUruQJ-fIi4IuobDFRNzHeFQB"
//                 });
//             }
//             this.setMapHandlers(mapHandlers, mapReference)
//         }
//     }

//     MakeCallback(callback, data, mapReference) {
//         data ? callback(data) : callback();
//     }

//     // setBoundary(boundary, mapReference) {
//     //     if (map[mapReference] && boundary) {

//     //         for (var i = map[mapReference].entities.getLength() - 1; i >= 0; i--) {
//     //             var regularPolygon = map[mapReference].entities.get(i);
//     //             if (regularPolygon instanceof Microsoft.Maps.Polygon) {
//     //                 map[mapReference].entities.removeAt(i);
//     //             }
//     //         }

//     // var boundaryLocation;
//     // if(boundary.option && 
//     // 	boundary.option.entityType && 
//     // 		!(boundary.option.entityType.includes("Postcode"))){
//     // 	boundaryLocation = new Microsoft.Maps.Location(boundary.location[0], boundary.location[1]);
//     // }
//     // else{
//     // 	boundaryLocation = boundary.location
//     // }

//     // var boundaryLocation = boundary.location ? boundary.location : null;

//     // var geoDataRequestOptions = boundary.option ? boundary.option : {};
//     // var polygonStyle = boundary.polygonStyle ? boundary.polygonStyle : null;
//     // var search = boundary.search ? boundary.search : null;
//     // if (!search && boundaryLocation) {
//     //     Microsoft.Maps.loadModule('Microsoft.Maps.SpatialDataService', function () {
//     //         Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(boundaryLocation, geoDataRequestOptions, map[mapReference], function (data) {
//     //             if (data.results && data.results.length > 0) {
//     //                 map[mapReference].entities.push(data.results[0].Polygons);
//     //             }
//     //         }, polygonStyle, function errCallback(networkStatus, statusMessage) {
//     //             console.log(networkStatus);
//     //             console.log(statusMessage);
//     //         });
//     //     });
//     // }
//     //         else {
//     //             Microsoft.Maps.loadModule(['Microsoft.Maps.SpatialDataService', 'Microsoft.Maps.Search'], function () {
//     //                 var searchManager = new Microsoft.Maps.Search.SearchManager(map[mapReference]);
//     //                 var geocodeRequest = {
//     //                     where: search,
//     //                     callback: function (geocodeResult) {
//     //                         if (geocodeResult && geocodeResult.results && geocodeResult.results.length > 0) {
//     //                             map[mapReference].setView({ bounds: geocodeResult.results[0].bestView });
//     //                             Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(geocodeResult.results[0].location, geoDataRequestOptions, map[mapReference], function (data) {
//     //                                 if (data.results && data.results.length > 0) {
//     //                                     map[mapReference].entities.push(data.results[0].Polygons);
//     //                                 }
//     //                             }, polygonStyle, function errCallback(networkStatus, statusMessage) {
//     //                                 console.log(networkStatus);
//     //                                 console.log(statusMessage);
//     //                             });
//     //                         }
//     //                     },
//     //                 };
//     //                 searchManager.geocode(geocodeRequest);
//     //             });
//     //         }
//     //     }
//     // }

//     render() {
//         return (
//             <div id={this.props.id} className={classSet('react-bingmaps', this.props.className)}>
//             </div>
//         );
//     }
// }

// export default ReactBingmaps;

// ReactBingmaps.defaultProps = {
//     bingmapKey: "Al6xM6_6DfVwdCAvRULkiOWrW0SYTDfS13YApD5QUruQJ-fIi4IuobDFRNzHeFQB",
//     mapHandlers: undefined
// }