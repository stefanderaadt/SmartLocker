import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import SingleCaregiverContent from './SingleCaregiverContent';

import {
    caregiverSetUserId,
    fetchCaregiver,
    fetchCaregiverSchedules,
} from '../../../actions/caregiverActions';

import {
    openEditScheduleDialog,
    openEditScheduleDialogUpdate,
} from '../../../actions/editScheduleActions';

const styles = theme => ({
    actions: {
        textAlign: 'right',
    },
    media: {
        textAlign: 'center',
    },
});

@withStyles(styles)
@connect(
    state => ({
        caregiver: state.caregiver,
        login: state.login,
    }),
    dispatch => ({
        dispatch,
    })
)
class SingleCaregiver extends Component {
    componentDidMount() {
        this.fetchCaregiver();
    }

    fetchCaregiver = () => {
        const { dispatch, match } = this.props;
        dispatch(caregiverSetUserId(match.params.id));
        dispatch(fetchCaregiver());
        dispatch(fetchCaregiverSchedules());
    };

    openEditScheduleDialog = () => {
        const { dispatch } = this.props;
        dispatch(openEditScheduleDialog());
    };

    openEditScheduleDialogUpdate = schedule => {
        const { dispatch } = this.props;
        dispatch(openEditScheduleDialogUpdate(schedule));
    };

    render() {
        const { classes, caregiver } = this.props;

        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography component="h2" variant="h5" gutterBottom>
                        Verzorger
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.actions}>
                    <Tooltip title="Voeg een nieuwe Planning toe">
                        <Button
                            variant="contained"
                            color="primary"
                            aria-label="Nieuwe Planning"
                            onClick={this.openEditScheduleDialog}
                        >
                            Nieuwe planning
                        </Button>
                    </Tooltip>
                </Grid>
                <SingleCaregiverContent
                    caregiver={caregiver}
                    openEditScheduleDialogUpdate={
                        this.openEditScheduleDialogUpdate
                    }
                />
            </Grid>
        );
    }
}

export default SingleCaregiver;
