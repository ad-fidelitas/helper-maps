import React, {Component} from 'react';
import Map from "./map";
import {Polygon} from "react-google-maps";
import * as d3 from "d3";
/**
 * @typedef {Object} Polygon
 * @typedef {Object} Location
 */

export default class PolygonMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /** @type {Array<Polygon>} */
            polygons: [{
                paths:[
                    {lat: 25.774, lng: -80.190},
                    {lat: 18.466, lng: -66.118},
                    {lat: 32.321, lng: -64.757},
                    {lat: 25.774, lng: -80.190}
                  ],
                  options:{
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                  }
            }],
            /** @type {Array<Location>} */
            nuclei: [
                [23, -70],
                [37, -50],
                [13, -30]
            ]
        }
    }

    convertNucleiToPolygons() {
        let data = this.state.nuclei
        let polygons = d3.voronoi(data)
        let formattedPolygons = [{}]
        console.log(polygons)
        return []
    }

    render() {

        let polygons = this.convertNucleiToPolygons()
        polygons = polygons.concat(this.state.polygons);
        console.log(polygons);
        return(
            <div>
                <Map
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBYx1RNyOmrhEp_KBp98yHQdqpPjCPu4ts"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }}/>}
                children={
                    <React.Fragment>
                        {polygons.map((polygon, index)=>(
                            <Polygon 
                            key={index}
                            paths={polygon.paths}
                            options={polygon.options}
                            />
                        ))}
                    </React.Fragment>
                } />
            </div>
        )
    }
}