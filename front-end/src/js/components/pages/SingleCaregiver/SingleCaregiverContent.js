import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SingleCaregiverInfo from './SingleCaregiverInfo';
import SingleCaregiverSchedules from './SingleCaregiverSchedules';

class SingleCaregiverContent extends Component {
    render() {
        const { caregiver, openEditScheduleDialogUpdate } = this.props;

        return (
            <>
                <SingleCaregiverInfo
                    firstName={caregiver.caregiver.firstName}
                    lastName={caregiver.caregiver.lastName}
                    email={caregiver.caregiver.email}
                    fetchedCaregiver={caregiver.fetchedCaregiver}
                />
                <Grid item xs={12}>
                    <Typography component="h2" variant="h5" gutterBottom>
                        Plannings
                    </Typography>
                </Grid>
                <SingleCaregiverSchedules
                    openEditScheduleDialogUpdate={openEditScheduleDialogUpdate}
                    caregiver={caregiver}
                    fetchedCaregiverSchedules={
                        caregiver.fetchedCaregiverSchedules
                    }
                />
            </>
        );
    }
}

export default SingleCaregiverContent;
