import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'


const styles = {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -18,
      marginRight: 10,
    },
    header: {
      backgroundColor: `#009688`,
      boxShadow: `1px 3px 1px #999`,
    }
  };

  function NavBar(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.header} position="static">
          <Toolbar variant="dense">
          <Link to='./'>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon style={{ color: `#fff` }} />
            </IconButton>
            </Link>
            <Typography variant="h6" color="inherit">
              <b>HandiMaps</b>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(NavBar);