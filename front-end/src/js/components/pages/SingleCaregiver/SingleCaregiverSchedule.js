import React, { Component } from 'react';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';

import {
    getSmartLockerName,
    getSmartLockerAddress,
} from '../../../helpers/smartLockerHelper';

const styles = theme => ({
    schedule: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
    },
    title: {
        fontWeight: 'bold',
    },
    typography: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    editButtonRow: {
        textAlign: 'right',
    },
    editButton: {
        padding: 0,
    },
});

@withStyles(styles)
class SingleCaregiverSchedule extends Component {
    render() {
        const {
            classes,
            schedule,
            openEditScheduleDialogUpdate,
            beginOfDayOfWeek,
            endOfDayOfWeek,
        } = this.props;

        const firstTime = schedule.dateFrom.isBetween(
            beginOfDayOfWeek,
            endOfDayOfWeek
        )
            ? schedule.dateFrom.locale('nl').format('HH:mm')
            : '00:00';

        const lastTime = schedule.dateTo.isBetween(
            beginOfDayOfWeek,
            endOfDayOfWeek
        )
            ? schedule.dateTo.locale('nl').format('HH:mm')
            : '23:59';

        let time = '';

        if (firstTime === '00:00' && lastTime === '23:59') {
            time = 'Hele dag';
        } else {
            time = `${firstTime} - ${lastTime}`;
        }

        return (
            <Grid key={schedule.id} item xs={12}>
                <Paper className={classes.schedule}>
                    <Tooltip title={getSmartLockerName(schedule.smartLocker)}>
                        <Typography
                            variant="body1"
                            display="block"
                            gutterBottom
                            className={classes.typography}
                        >
                            {getSmartLockerName(schedule.smartLocker)}
                        </Typography>
                    </Tooltip>
                    <Tooltip
                        title={getSmartLockerAddress(schedule.smartLocker)}
                    >
                        <Typography
                            variant="body1"
                            display="block"
                            gutterBottom
                            className={classes.typography}
                        >
                            {getSmartLockerAddress(schedule.smartLocker)}
                        </Typography>
                    </Tooltip>
                    <Divider />
                    <Typography
                        variant="body1"
                        display="block"
                        gutterBottom
                        className={classes.typography}
                    >
                        {time}
                    </Typography>
                    <Divider />
                    <div className={classes.editButtonRow}>
                        <Tooltip title="Planning aanpassen">
                            <IconButton
                                aria-label="Planning aanpassen"
                                onClick={() =>
                                    openEditScheduleDialogUpdate(schedule)
                                }
                                className={classes.editButton}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Paper>
            </Grid>
        );
    }
}

export default SingleCaregiverSchedule;
