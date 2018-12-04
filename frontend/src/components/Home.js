import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CameraEnhance from '@material-ui/icons/CameraEnhance'
import AddLocation from '@material-ui/icons/AddLocation'
import Help from '@material-ui/icons/Help'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import People from '@material-ui/icons/People'
import Grid from '@material-ui/core/Grid';
import TagFaces from '@material-ui/icons/TagFaces'
import School from '@material-ui/icons/School'

const styles = theme => ({
  button: {
    marginTop: 130,
    marginLeft: 50,
    backgroundColor: `#d43a36 !important`,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
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
                <Link to="/about" >
                <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                    <Help path="/about" />
                </Button>
                </Link>
            </div>
        </div>
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ display: 'inline-block', align: 'center', fontSize: '50px', fontWeight: '1', borderBottom: '4px solid #d43a36', marginBottom: '7%' }}>
                Our Goals
            </h1>
            <Grid container justify="center" alignItems="center">
            
      <Card className={styles.card}>
        <CardActionArea>
          <CardMedia
            className={styles.media}
          />
          <CardContent>
            <TagFaces />
            <Typography gutterBottom variant="h5" component="h2">
              Accessibility
            </Typography>
            <Typography component="p">
              Ease of use is one of our main concerns
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card className={styles.card}>
        <CardActionArea>
          <CardMedia
            className={styles.media}
          />
          <CardContent>
            <People />
            <Typography gutterBottom variant="h5" component="h2">
              Community
            </Typography>
            <Typography component="p">
              A more engaged community means we will be able to help more people
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card className={styles.card}>
        <CardActionArea>
          <CardMedia
            className={styles.media}
          />
          <CardContent>
            <School />
            <Typography gutterBottom variant="h5" component="h2">
              Efficiency
            </Typography>
            <Typography component="p">
              We aim to be a good use of your time
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
            </Grid>
        </div>
        
    </div>
  );
}

export default withStyles(styles)(HomePage);
