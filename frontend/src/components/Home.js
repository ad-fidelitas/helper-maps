import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CameraEnhance from '@material-ui/icons/CameraEnhance'
import AddLocation from '@material-ui/icons/AddLocation'
import Help from '@material-ui/icons/Help'
// import gcpLogo from "./gcpLogo.jpg"
// import jpmcLogo from "./jpmcLogo.png"

const styles = theme => ({
  button: {
    marginTop: 130,
    marginLeft: 50,
    backgroundColor: `#d43a36 !important`,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function HomePage(props) {
  const { classes } = props;
  return (
    <div>
        <div style={{ color: `#fff`, backgroundColor: `#007f72`, padding: `1%`}}>
            <h1 style={{ padding: `5% 0 0 0`, textAlign: `center`, margin: `0`, fontSize: `60px`, fontWeight: `1` }}>Safety is the #1 Priority</h1>
            <h2 style={{ padding: `2% 0 0 0`, textAlign: `center`, margin: `0`, fontSize: `30px`, fontWeight: `1` }}>A Map to Help You Find the Safest Way to Your Destination</h2>
            <div style={{ marginLeft: `38%`, marginBottom: `5%`}}>
                <Link to="/add-image" >
                    <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                        <CameraEnhance />
                    </Button>
                </Link>
                <Link to="/map" >
                    <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                        <AddLocation path="/map" />
                    </Button>
                </Link>
                <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                    <Help />
                </Button>
            </div>
        </div>
        {/* <div width="60%">
            <h3><img src={gcpLogo} height="80px" width="80px" alt="missing"/>POWERED BY GCP, INSPIRED BY JP MORGAN <img src={jpmcLogo} height="70px" width="400px" alt="missing"/></h3>
            
        </div> */}
    </div>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);

// export default function HomePage(props) {
//     // You can compute or insert data for the homepage here if you want
//     return(
//         <div>
//             {/* Put the HTML here, 
//             if you want to use classes, use the clasnName attribute instead of the class sticker */}
            
//         </div>
//     )
// }