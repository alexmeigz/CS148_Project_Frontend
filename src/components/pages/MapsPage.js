// MapsPage.js
// Engineer: Joseph Ng

import React from 'react';
import BingMapsReact from "bingmaps-react";
// import { ReactBingmaps } from 'react-bingmaps';



function MapsPage() {
    return (
        // TODO
        <div>
            <h1>[MapsPage]</h1>
            <BingMapsReact bingMapsKey="Al6xM6_6DfVwdCAvRULkiOWrW0SYTDfS13YApD5QUruQJ-fIi4IuobDFRNzHeFQB" />
            {/* {console.log(<ReactBingmaps
                bingmapKey="Al6xM6_6DfVwdCAvRULkiOWrW0SYTDfS13YApD5QUruQJ-fIi4IuobDFRNzHeFQB" >
            </ReactBingmaps>)} */}
        </div>
    );
};

export default MapsPage;