//@ts-check
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    console.log(props);
    console.log("stuff")
    return(<GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      {props.children}
    </GoogleMap>) 
}))

export default MyMapComponent;



// {/* <Polygon 
// paths={[
//   {lat: 25.774, lng: -80.190},
//   {lat: 18.466, lng: -66.118},
//   {lat: 32.321, lng: -64.757},
//   {lat: 25.774, lng: -80.190}
// ]}
// options={{
//   strokeColor: '#FF0000',
//   strokeOpacity: 0.8,
//   strokeWeight: 2,
//   fillColor: '#FF0000',
//   fillOpacity: 0.35
// }}/> */}