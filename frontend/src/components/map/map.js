//@ts-check
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

/**
 * @typedef {Object} Polygon
 * @prop {Array<Number>} verteces
 * @prop {String} color - In hex format
 */

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 45.50,
      lng: 73.57
    },
    zoom: 11
  };
  
  constructor(props) {
    super(props)
    
    this.state = {
      /** @type {Array<Polygon>} */
      polygons:[],
      /** @type {Array<Number>} */
      polygonCenters:[]
    }
  }

  componentDidMount() {
    // make the fetch for data here, or set it up
    // use d3 after the fetch
  }
  
  render() {



    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBYx1RNyOmrhEp_KBp98yHQdqpPjCPu4ts" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;

// const coords = [
//   { lat: 0, lng: 0 },
//   { lat: 1, lng: 1 },
//   { lat: 2, lng: 2 }
// ];

// <Polygon path={coords} onClick={event => someEventHandler(event)} />