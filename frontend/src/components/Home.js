import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CameraEnhance from '@material-ui/icons/CameraEnhance'
import AddLocation from '@material-ui/icons/AddLocation'
import Help from '@material-ui/icons/Help'


const styles = theme => ({
  button: {
    marginTop: 130,
    marginLeft: 50
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function HomePage(props) {
  const { classes } = props;
  return (
    <div style={{ margin: `10% 0 0 38%` }}>
      <Button variant="fab" color="primary" aria-label="Add" className={classes.button + ' ' + classes.leftButton}>
        <CameraEnhance />
      </Button>
      <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
        <AddLocation />
      </Button>
      <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
        <Help />
      </Button>
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