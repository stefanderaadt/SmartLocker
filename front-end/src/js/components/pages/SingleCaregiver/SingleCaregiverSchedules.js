import React, { Component } from 'react';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SingleCaregiverSchedule from './SingleCaregiverSchedule';

const daysInWeek = [
    { value: 'maandag' },
    { value: 'dinsdag' },
    { value: 'woensdag' },
    { value: 'donderdag' },
    { value: 'vrijdag' },
    { value: 'zaterdag' },
    { value: 'zondag' },
];

const styles = theme => ({
    weekColumn: {
        width: 'calc(100% / 7)',
        borderRight: `1px solid ${theme.palette.text.secondary}`,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        minHeight: 381,
        '&:last-child': {
            borderRight: 0,
        },
    },
    weekTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    paper: {
        minHeight: 381,
    },
});

@withStyles(styles)
class SingleCaregiverSchedules extends Component {
    render() {
        const { classes, caregiver, openEditScheduleDialogUpdate } = this.props;

        const startOfWeek = caregiver.date.clone().startOf('week');

        if (!caregiver.fetchedCaregiverSchedules) return null;

        return (
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container>
                        {daysInWeek.map((day, idx) => {
                            const beginOfDayOfWeek = startOfWeek
                                .clone()
                                .add(idx * 1, 'days');
                            const endOfDayOfWeek = beginOfDayOfWeek
                                .clone()
                                .add(1, 'days');
                            return (
                                <Grid
                                    key={day.value}
                                    item
                                    className={classes.weekColumn}
                                >
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="body1"
                                                display="block"
                                                gutterBottom
                                                className={classes.weekTitle}
                                            >
                                                {`${day.value.substr(
                                                    0,
                                                    2
                                                )} ${beginOfDayOfWeek
                                                    .locale('nl')
                                                    .format('DD MMMM')}`}
                                            </Typography>
                                        </Grid>
                                        {caregiver.schedules.map(schedule => {
                                            if (
                                                schedule.dateFrom.isBetween(
                                                    beginOfDayOfWeek,
                                                    endOfDayOfWeek
                                                ) ||
                                                beginOfDayOfWeek.isBetween(
                                                    schedule.dateFrom,
                                                    schedule.dateTo
                                                )
                                            )
                                                return (
                                                    <SingleCaregiverSchedule
                                                        key={schedule.id}
                                                        schedule={schedule}
                                                        beginOfDayOfWeek={
                                                            beginOfDayOfWeek
                                                        }
                                                        endOfDayOfWeek={
                                                            endOfDayOfWeek
                                                        }
                                                        openEditScheduleDialogUpdate={
                                                            openEditScheduleDialogUpdate
                                                        }
                                                    />
                                                );
                                            else return null;
                                        })}
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default SingleCaregiverSchedules;
