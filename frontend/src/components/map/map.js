import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Map extends Component {
  static defaultProps = {
    center: {
      lat: 45.50,
      lng: 73.57
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBYx1RNyOmrhEp_KBp98yHQdqpPjCPu4ts" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* <AnyReactComponent
            lat={45.5017}
            lng={73.5673}
            text={'Montreal'}
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;