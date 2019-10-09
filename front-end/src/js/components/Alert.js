import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';

import { alertTypes } from '../constants';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';

import { hideAlert } from '../actions/alertActions';

const styles = theme => ({
    errorAlert: {
        backgroundColor: theme.palette.error.dark,
    },
    successAlert: {
        backgroundColor: green[600],
    },
    warningAlert: {
        backgroundColor: amber[700],
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    messageText: {
        marginLeft: theme.spacing(2),
    },
});

@withStyles(styles)
@connect(
    state => ({
        alert: state.alert,
    }),
    dispatch => ({
        dispatch,
    })
)
class Alert extends Component {
    hideAlert = () => {
        this.props.dispatch(hideAlert());
    };

    render() {
        const { classes, alert } = this.props;

        const alerts = [
            {
                type: alertTypes.error,
                icon: WarningIcon,
                className: classes.errorAlert,
            },
            {
                type: alertTypes.success,
                icon: CheckCircleIcon,
                className: classes.successAlert,
            },
            {
                type: alertTypes.warning,
                icon: WarningIcon,
                className: classes.warningAlert,
            },
        ];

        const currentAlert = alerts.find(a => a.type === alert.type);

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={alert.open}
                autoHideDuration={alert.displayTime}
                onClose={this.hideAlert}
            >
                <SnackbarContent
                    className={currentAlert.className}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <currentAlert.icon />
                            <div className={classes.messageText}>
                                {alert.message}
                            </div>
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.hideAlert}
                        >
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        );
    }
}

export default Alert;
