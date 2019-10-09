import React, { Component } from 'react';

import { connect } from 'react-redux';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import TablePagination from '@material-ui/core/TablePagination';

import {
    fetchSmartLockers,
    smartLockersUpdateSearchValues,
} from '../../actions/smartLockersActions';
import {
    openEditSmartLockerDialog,
    openEditSmartLockerDialogUpdate,
} from '../../actions/editSmartLockerActions';

const styles = theme => ({
    actions: {
        textAlign: 'right',
    },
    paper: {
        padding: theme.spacing(2),
        cursor: 'pointer',
    },
    media: {
        textAlign: 'center',
    },
    lockIcon: {
        height: '10rem',
        width: '10rem',
    },
});

@withStyles(styles)
@connect(
    state => ({
        smartLockers: state.smartLockers,
        login: state.login,
    }),
    dispatch => ({
        dispatch,
    })
)
class Planning extends Component {
    componentDidMount() {
        this.fetchSmartLockersBySearchValues();
    }

    updateSearchValues = values => {
        const { dispatch } = this.props;
        dispatch(smartLockersUpdateSearchValues(values));
        this.fetchSmartLockersBySearchValues();
    };

    fetchSmartLockersBySearchValues = () => {
        const { dispatch } = this.props;
        dispatch(fetchSmartLockers());
    };

    openEditSmartLockerDialog = () => {
        const { dispatch } = this.props;
        dispatch(openEditSmartLockerDialog());
    };

    openEditSmartLockerDialogUpdate = smartLocker => {
        const { dispatch } = this.props;
        dispatch(openEditSmartLockerDialogUpdate(smartLocker));
    };

    render() {
        const { classes, smartLockers } = this.props;

        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography
                        component="h2"
                        variant="h5"
                        gutterBottom
                        className={classes.title}
                    >
                        Smart Lockers
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.actions}>
                    <Tooltip title="Voeg een nieuwe SmartLocker toe">
                        <Fab
                            color="primary"
                            size="small"
                            aria-label="Nieuwe SmartLocker"
                            onClick={this.openEditSmartLockerDialog}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Grid>
                {smartLockers.content.map(smartLocker => (
                    <Grid item xs={4} key={smartLocker.id}>
                        <Paper
                            className={classes.paper}
                            onClick={() =>
                                this.openEditSmartLockerDialogUpdate(
                                    smartLocker
                                )
                            }
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} className={classes.media}>
                                    <LockIcon className={classes.lockIcon} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="body1"
                                        display="block"
                                        gutterBottom
                                    >
                                        {`${smartLocker.patient.firstName} ${
                                            smartLocker.patient.lastName
                                        }`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="body1"
                                        display="block"
                                        gutterBottom
                                    >
                                        {`${smartLocker.address.street} ${
                                            smartLocker.address.streetNumber
                                        }`}
                                        <br />
                                        {`${smartLocker.address.postalCode} ${
                                            smartLocker.address.city
                                        }`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <TablePagination
                        rowsPerPageOptions={[3, 6, 9, 12]}
                        component="div"
                        count={smartLockers.totalElements}
                        rowsPerPage={smartLockers.size}
                        page={smartLockers.number}
                        backIconButtonProps={{
                            'aria-label': 'Vorige pagina',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Volgende pagina',
                        }}
                        onChangePage={(e, number) =>
                            this.updateSearchValues({ number })
                        }
                        onChangeRowsPerPage={e =>
                            this.updateSearchValues({
                                size: e.target.value,
                            })
                        }
                    />
                </Grid>
            </Grid>
        );
    }
}

export default Planning;
