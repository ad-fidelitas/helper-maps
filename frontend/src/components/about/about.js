import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Columns from "../grid/grid"

// const styles = theme => ({
//   button: {
//     marginTop: 130,
//     marginLeft: 50,
//     backgroundColor: `#d43a36 !important`,
//   },
//   extendedIcon: {
//     marginRight: theme.spacing.unit,
//   },
// });

function About(props) {
  const { classes } = props;
  return (
    <div>
        <div style={{ color: `#fff`, backgroundColor: `#007f72`, padding: `1%`}}>
            <h1 style={{ padding: `1% 0 0 0`, textAlign: `center`, margin: `0`, fontSize: `60px`, fontWeight: `1` }}>Hello World!</h1>
            <h2 style={{ padding: `1% 0 0 0`, textAlign: `center`, margin: `0`, fontSize: `30px`, fontWeight: `1` }}>:Welcome to HandiMaps:</h2>
            <div style={{ padding: `1% 20% 2% 20%`, textAlign: 'center', fontWeight: `1` }}>
                HandiMaps is an accessibility map that uses an algorithm to generate voronoi diagrams and create a cell network around a system of nuclei.
                This project was born at YHack2018 and uses the google could platform Maps API with polygon overlays and delauny triangulation.
                The app processes pictures of specific locations returning an accessibility rating that's normalize provide structured information on accessible spaces to advocate for individuals with disabilities.
                
            </div>
            
        </div>
        <div style={{ padding: `2% 0 0 0`, textAlign: `center`, margin: `0`, fontSize: `60px`, fontWeight: `1` }}><Columns /></div>
        
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default About;
