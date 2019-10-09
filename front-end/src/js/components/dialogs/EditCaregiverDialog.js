import React, { Component } from 'react';

import { connect } from 'react-redux';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { fieldIsInErrorArray, getFieldLabel } from '../../helpers/tableHelpers';

import {
    updateCaregiverValues,
    saveCaregiver,
    deleteCaregiver,
    closeEditCaregiverDialog,
} from '../../actions/editCaregiverActions';

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
        editCaregiver: state.editCaregiver,
    }),
    dispatch => ({
        dispatch,
    })
)
class EditCaregiverDialog extends Component {
    closeEditCaregiverDialog = () => {
        const { dispatch } = this.props;
        dispatch(closeEditCaregiverDialog());
    };

    updateCaregiverValue = e => {
        const { dispatch } = this.props;
        dispatch(
            updateCaregiverValues({
                [e.target.name]: e.target.value,
            })
        );
    };

    saveCaregiver = () => {
        const { dispatch, editCaregiver } = this.props;

        dispatch(
            saveCaregiver({
                id: editCaregiver.id,
                email: editCaregiver.email,
                firstName: editCaregiver.firstName,
                lastName: editCaregiver.lastName,
                groupId: editCaregiver.groupId,
            })
        );
    };

    deleteCaregiver = () => {
        const { dispatch, editCaregiver } = this.props;

        dispatch(deleteCaregiver(editCaregiver.id));
    };

    render() {
        const { classes } = this.props;
        const {
            id,
            email,
            firstName,
            lastName,
            groupId,
            dialogOpen,
            errors,
        } = this.props.editCaregiver;

        return (
            <Dialog
                open={dialogOpen}
                onClose={this.closeEditCaregiverDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Verzorger</DialogTitle>
                <DialogContent>
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <TextField
                                autoFocus
                                error={getFieldLabel({
                                    field: 'email',
                                    errors,
                                })}
                                margin="dense"
                                id="email"
                                name="email"
                                label={getFieldLabel({
                                    field: 'email',
                                    defaultLabel: 'Email',
                                    errors,
                                })}
                                type="email"
                                fullWidth
                                value={email}
                                onChange={this.updateCaregiverValue}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                error={getFieldLabel({
                                    field: 'firstName',
                                    errors,
                                })}
                                margin="dense"
                                id="firstName"
                                name="firstName"
                                label={getFieldLabel({
                                    field: 'firstName',
                                    defaultLabel: 'Voornaam',
                                    errors,
                                })}
                                type="text"
                                fullWidth
                                value={firstName}
                                onChange={this.updateCaregiverValue}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                error={getFieldLabel({
                                    field: 'lastName',
                                    errors,
                                })}
                                margin="dense"
                                id="lastName"
                                name="lastName"
                                label={getFieldLabel({
                                    field: 'lastName',
                                    defaultLabel: 'Achternaam',
                                    errors,
                                })}
                                type="text"
                                fullWidth
                                value={lastName}
                                onChange={this.updateCaregiverValue}
                            />
                        </FormControl>
                        <FormControl
                            className={classes.formControl}
                            error={getFieldLabel({ field: 'groupId', errors })}
                        >
                            <InputLabel htmlFor="groupId">
                                {getFieldLabel({
                                    field: 'groupId',
                                    defaultLabel: 'Gebruikers groep',
                                    errors,
                                })}
                            </InputLabel>
                            <Select
                                margin="dense"
                                id="groupId"
                                name="groupId"
                                fullWidth
                                value={groupId}
                                onChange={this.updateCaregiverValue}
                            >
                                <MenuItem value="">
                                    <em>Geen</em>
                                </MenuItem>
                                <MenuItem value="GROUP::CAREGIVER">
                                    Verzorger
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    {id && (
                        <Button
                            onClick={this.deleteCaregiver}
                            color="secondary"
                            className={classes.deleteButton}
                        >
                            Verwijderen
                        </Button>
                    )}
                    <Button
                        onClick={this.closeEditCaregiverDialog}
                        color="primary"
                    >
                        Annuleren
                    </Button>
                    <Button onClick={this.saveCaregiver} color="primary">
                        Opslaan
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditCaregiverDialog;
