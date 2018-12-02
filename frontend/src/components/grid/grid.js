import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    
        color: '#fff !important'
        },
    expand:{
        padding: `1% 5% 1% 5%`,
        backgroundColor: '#009688 !important',
        color: '#fff !important'
    },
    paper: {
        height: 100,
        width: 500,
        backgroundColor: `#009688`,
        padding: `0 0 0 0`,
        textAlign: `center`,
        color: 'white',
        paddingBottom: '0%'
    }
});

class Columns extends React.Component {
    state = {
        spacing: '16',
    };


    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>

                        <Grid item>
                            <Paper className={classes.paper}>
                            <div>
                                <ExpansionPanel className={classes.expand}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography style={{ color: `#fff` }} className={classes.heading}>Instagram</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography style={{ color: `#fff` }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Paper className={classes.paper}>
                                <ExpansionPanel className={classes.expand}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography style={{ color: `#fff` }}className={classes.heading}>Locations</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography style={{ color: `#fff` }} >
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
          </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Paper className={classes.paper}>
                                <ExpansionPanel className={classes.expand}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography style={{ color: `#fff` }} className={classes.heading}>Voronoi Diagram</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography style={{ color: `#fff` }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
          </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        );
    }
}

Columns.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Columns);
