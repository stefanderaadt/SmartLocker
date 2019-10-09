import React, { Component } from 'react';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    },
    label: {
        fontWeight: 'bold',
    },
});

@withStyles(styles)
class SingleCaregiverInfo extends Component {
    render() {
        const {
            classes,
            firstName,
            lastName,
            email,
            fetchedCaregiver,
        } = this.props;

        if (!fetchedCaregiver) return null;

        return (
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Typography
                                variant="body1"
                                display="block"
                                gutterBottom
                                className={classes.label}
                            >
                                Voornaam:
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography
                                variant="body1"
                                display="block"
                                gutterBottom
                            >
                                {firstName}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography
                                variant="body1"
                                display="block"
                                gutterBottom
                                className={classes.label}
                            >
                                Achternaam:
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography
                                variant="body1"
                                display="block"
                                gutterBottom
                            >
                                {lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography
                                variant="body1"
                                display="block"
                                gutterBottom
                                className={classes.label}
                            >
                                Email:
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography
                                variant="body1"
                                display="block"
                                gutterBottom
                            >
                                {email}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default SingleCaregiverInfo;
