import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';

import { fieldIsInErrorArray, getFieldLabel } from '../../helpers/tableHelpers';

import {
    updateSmartLockerPatientValues,
    updateSmartLockerAddressValues,
    saveSmartLocker,
    deleteSmartLocker,
    closeEditSmartLockerDialog,
} from '../../actions/editSmartLockerActions';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        width: `calc(100% - ${theme.spacing(2)}px)`,
    },
    dialogActions: {
        display: 'flex',
    },
    deleteButton: {
        marginRight: 'auto',
    },
});

@withStyles(styles)
@connect(
    state => ({
        editSmartLocker: state.editSmartLocker,
    }),
    dispatch => ({
        dispatch,
    })
)
class EditSmartLockerDialog extends Component {
    closeEditSmartLockerDialog = () => {
        const { dispatch } = this.props;
        dispatch(closeEditSmartLockerDialog());
    };

    updatePatientValue = e => {
        const { dispatch } = this.props;
        const name = /[^\.]*$/.exec(e.target.name)[0];
        dispatch(updateSmartLockerPatientValues({ [name]: e.target.value }));
    };

    updateAddressValue = e => {
        const { dispatch } = this.props;
        const name = /[^\.]*$/.exec(e.target.name)[0];
        dispatch(updateSmartLockerAddressValues({ [name]: e.target.value }));
    };

    updateSmartLockerValue = e => {
        const { dispatch } = this.props;
        dispatch(
            updateSmartLockerValues(_.set({}, e.target.name, e.target.value))
        );
    };

    saveSmartLocker = () => {
        const { dispatch, editSmartLocker } = this.props;

        dispatch(
            saveSmartLocker({
                id: editSmartLocker.id,
                patient: editSmartLocker.patient,
                address: editSmartLocker.address,
            })
        );
    };

    deleteSmartLocker = () => {
        const { dispatch, editSmartLocker } = this.props;

        dispatch(deleteSmartLocker(editSmartLocker.id));
    };

    render() {
        const { classes } = this.props;
        const {
            id,
            address,
            patient,
            dialogOpen,
            errors,
        } = this.props.editSmartLocker;

        return (
            <Dialog
                open={dialogOpen}
                onClose={this.closeEditSmartLockerDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Smart Locker</DialogTitle>
                <DialogContent>
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <TextField
                                autoFocus
                                error={fieldIsInErrorArray({
                                    field: 'patient.firstName',
                                    errors,
                                })}
                                margin="dense"
                                id="patient.firstName"
                                name="patient.firstName"
                                label={getFieldLabel({
                                    field: 'patient.firstName',
                                    defaultLabel: 'Voornaam',
                                    errors,
                                })}
                                type="text"
                                fullWidth
                                value={patient.firstName}
                                onChange={this.updatePatientValue}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                error={fieldIsInErrorArray({
                                    field: 'patient.lastName',
                                    errors,
                                })}
                                margin="dense"
                                id="patient.lastName"
                                name="patient.lastName"
                                label={getFieldLabel({
                                    field: 'patient.lastName',
                                    defaultLabel: 'Achternaam',
                                    errors,
                                })}
                                type="text"
                                fullWidth
                                value={patient.lastName}
                                onChange={this.updatePatientValue}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                error={fieldIsInErrorArray({
                                    field: 'address.street',
                                    errors,
                                })}
                                margin="dense"
                                id="address.street"
                                name="address.street"
                                label={getFieldLabel({
                                    field: 'address.street',
                                    defaultLabel: 'Straat',
                                    errors,
                                })}
                                type="text"
                                fullWidth
                                value={address.street}
                                onChange={this.updateAddressValue}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                error={fieldIsInErrorArray({
                                    field: 'address.streetNumber',
                                    errors,
                                })}
                                margin="dense"
                                id="address.streetNumber"
                                name="address.streetNumber"
                                label={getFieldLabel({
                                    field: 'address.streetNumber',
                                    defaultLabel: 'Straat nummer',
                                    errors,
                                })}
                                type="text"
                                fullWidth
                                value={address.streetNumber}
                                onChange={this.updateAddressValue}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                error={fieldIsInErrorArray({
                                    field: 'address.city',
                                    errors,
                                })}
                                margin="dense"
                                id="address.city"
                                name="address.city"
                                label={getFieldLabel({
                                    field: 'address.city',
                                    defaultLabel: 'Plaats',
                                    errors,
                                })}
                                type="text"
                                fullWidth
                                value={address.city}
                                onChange={this.updateAddressValue}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                error={fieldIsInErrorArray({
                                    field: 'address.postalCode',
                                    errors,
                                })}
                                margin="dense"
                                id="address.postalCode"
                                name="address.postalCode"
                                label={getFieldLabel({
                                    field: 'address.postalCode',
                                    defaultLabel: 'Postcode',
                                    errors,
                                })}
                                type="text"
                                fullWidth
                                value={address.postalCode}
                                onChange={this.updateAddressValue}
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    {id && (
                        <Button
                            onClick={this.deleteSmartLocker}
                            color="secondary"
                            className={classes.deleteButton}
                        >
                            Verwijderen
                        </Button>
                    )}
                    <Button
                        onClick={this.closeEditSmartLockerDialog}
                        color="primary"
                    >
                        Annuleren
                    </Button>
                    <Button onClick={this.saveSmartLocker} color="primary">
                        Opslaan
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditSmartLockerDialog;
