import React, {Component} from 'react';
import Map from "./map";
import {Polygon} from "react-google-maps";
import * as d3 from "d3";
/**
 * @typedef {Object} Polygon
 * @typedef {Object} LocationDoc
 * @prop {Array<Number>} coordinates
 * @prop {Number} accessibilityRating
 * @prop {String} _id
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
            /** @type {LocationDoc} */
            nuclei: [
            ]
        }
    }

    convertNucleiToPolygons() {
        //dummy data
        let data = this.state.nuclei.map((nucleus)=>nucleus.coordinates)
        //change the extent to suit the actual map
        //extent([[-90, -180], [90, 180]]).polygons(data)
        let polygons = d3.voronoi().polygons(data)
        let formattedPolygons = []
        // console.log(data)
        console.log(polygons)
        // console.log(polygons[0])


        for (let i = 0; i < polygons.length; i++) {
            //make new polygon
            let newPolygon = {
                paths:[],
                options:{
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                }
            }

            //populate the paths key of newPolygon
            for (let j = 0; j < polygons[i].length; j++) {
                if (polygons[i][j] === null || polygons[i][j] === null) {
                    continue
                }
                let coordinate = {lat: polygons[i][j][0], lng: polygons[i][j][1]}
                newPolygon.paths.push(coordinate)
            }
            formattedPolygons.push(newPolygon)
        }

        console.log(formattedPolygons)
        return formattedPolygons
    }

    componentDidMount() {
        fetch("http://localhost:3000")
        .then(res=>{
            console.log(res)
            if(!res.ok) {
                throw new Error("Locations could not fetch properly");
            } else {
                return res.json();
            }
        })
        .then(locations=>{
            let oldNuclei = this.state.nuclei;
            let newNuclei = oldNuclei.slice();
            newNuclei = newNuclei.concat(locations);
            console.log(newNuclei);
            // this.setState({
            //         nuclei:newNuclei
            // })
        })
        .catch((err)=>{
            console.log(err);
        })
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