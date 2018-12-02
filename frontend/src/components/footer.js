import React from "react";
import gcpLogo from "./gcpLogo.jpg"
import jpmcLogo from "./jpmcLogo.png"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import bkgrnd from "./bkgrnd.png"
import BottomNavigation from '@material-ui/core/BottomNavigation';


// let imgUrl = bkrgnd
// var sectionStyle = {
//   width: "100%",
//   height: "400px",
//   backgroundImage: 'url(' + imgUrl + ')', 
// };

const styles = {
    root: {
      width: "100%",
      marginTop: '15%',
    },
  };
  

  function Footer(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        {/* //style={{backgroundImage: 'url(' + imgUrl + ')'}} */}
        <BottomNavigation >
            <Typography variant="h6" color="inherit">
            <h3><img src={gcpLogo} height="80px" width="80px" alt="missing"/>POWERED BY GCP, INSPIRED BY JP MORGAN <img src={jpmcLogo} height="65px" width="420px" alt="missing"/></h3>
            </Typography></BottomNavigation>
            
      </div>
    );
  }

  Footer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Footer);
