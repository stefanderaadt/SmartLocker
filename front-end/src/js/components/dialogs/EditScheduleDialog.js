import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';

import request from 'superagent';

import Select from 'react-select/async';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { DateTimePicker } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import moment from 'moment';

import settings from '../../settings';

import { fieldIsInErrorArray, getFieldLabel } from '../../helpers/tableHelpers';
import {
    getSmartLockerName,
    getSmartLockerAddress,
} from '../../helpers/smartLockerHelper';

import {
    updateScheduleValues,
    saveSchedule,
    deleteSchedule,
    closeEditScheduleDialog,
} from '../../actions/editScheduleActions';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        width: `calc(100% - ${theme.spacing(2)}px)`,
    },
    dialog: {
        overflowY: 'visible',
        width: 600,
    },
    dialogActions: {
        display: 'flex',
    },
    dialogRoot: {
        overflowY: 'visible',
    },
    deleteButton: {
        marginRight: 'auto',
    },
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing(2),
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Option(props) {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return (
        <div className={props.selectProps.classes.valueContainer}>
            {props.children}
        </div>
    );
}

function Menu(props) {
    return (
        <Paper
            square
            className={props.selectProps.classes.paper}
            {...props.innerProps}
        >
            {props.children}
        </Paper>
    );
}

const components = {
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

@withStyles(styles, { withTheme: true })
@connect(
    state => ({
        editSchedule: state.editSchedule,
        login: state.login,
    }),
    dispatch => ({
        dispatch,
    })
)
class EditScheduleDialog extends Component {
    closeEditScheduleDialog = () => {
        const { dispatch } = this.props;
        dispatch(closeEditScheduleDialog());
    };

    updateScheduleDateValue = ({ name, date }) => {
        const { dispatch } = this.props;
        dispatch(updateScheduleValues({ [name]: date.valueOf() }));
    };

    smartLockerIdSelected = selectRow => {
        const { dispatch } = this.props;
        dispatch(updateScheduleValues({ smartLockerId: selectRow }));
    };

    loadSmartLockerOptions = (searchValue, callback) => {
        const { login } = this.props;
        request
            .get(`${settings.api_url}smartlockers/search/${searchValue}`)
            .set('Authorization', login.token)
            .then(res => {
                callback(
                    res.body.map(smartLocker => ({
                        value: smartLocker.id,
                        label: `${getSmartLockerName(
                            smartLocker
                        )} - ${getSmartLockerAddress(smartLocker)}`,
                    }))
                );
            })
            .catch(err => {
                console.log(err);
            });
    };

    saveSchedule = () => {
        const { dispatch, editSchedule } = this.props;

        dispatch(
            saveSchedule({
                id: editSchedule.id,
                dateFrom: editSchedule.dateFrom,
                dateTo: editSchedule.dateTo,
                smartLockerId: editSchedule.smartLockerId,
                userId: editSchedule.userId,
            })
        );
    };

    deleteSchedule = () => {
        const { dispatch, editSchedule } = this.props;

        dispatch(deleteSchedule(editSchedule.id));
    };

    render() {
        const { classes, theme } = this.props;
        const {
            id,
            dateFrom,
            dateTo,
            smartLockerId,
            dialogOpen,
            errors,
        } = this.props.editSchedule;

        const dateFromValue = moment(dateFrom);
        const dateToValue = moment(dateTo);

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        const Control = props => {
            const {
                children,
                innerProps,
                innerRef,
                selectProps: { classes, TextFieldProps },
            } = props;

            return (
                <TextField
                    error={fieldIsInErrorArray({
                        field: 'smartLockerId',
                        errors,
                    })}
                    fullWidth
                    InputProps={{
                        inputComponent,
                        inputProps: {
                            className: classes.input,
                            ref: innerRef,
                            children,
                            ...innerProps,
                        },
                    }}
                    {...TextFieldProps}
                />
            );
        };

        return (
            <Dialog
                open={dialogOpen}
                onClose={this.closeEditScheduleDialog}
                aria-labelledby="form-dialog-title"
                style={{
                    root: {
                        overflowY: 'visible',
                    },
                }}
                PaperProps={{
                    classes: {
                        root: classes.dialog,
                    },
                }}
            >
                <DialogTitle id="form-dialog-title">Planning</DialogTitle>
                <DialogContent className={classes.dialogRoot}>
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <DateTimePicker
                                error={fieldIsInErrorArray({
                                    field: 'dateFrom',
                                    errors,
                                })}
                                value={dateFromValue}
                                id="dateFrom"
                                name="dateFrom"
                                onChange={date =>
                                    this.updateScheduleDateValue({
                                        name: 'dateFrom',
                                        date,
                                    })
                                }
                                label={getFieldLabel({
                                    field: 'dateFrom',
                                    defaultLabel: 'Datum/Tijd van',
                                    errors,
                                })}
                                showTodayButton
                                autoOk
                                ampm={false}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <DateTimePicker
                                error={fieldIsInErrorArray({
                                    field: 'dateTo',
                                    errors,
                                })}
                                value={dateToValue}
                                id="dateTo"
                                name="dateTo"
                                onChange={date =>
                                    this.updateScheduleDateValue({
                                        name: 'dateTo',
                                        date,
                                    })
                                }
                                label={getFieldLabel({
                                    field: 'dateTo',
                                    defaultLabel: 'Datum/Tijd tot',
                                    errors,
                                })}
                                showTodayButton
                                autoOk
                                ampm={false}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Select
                                classes={classes}
                                styles={selectStyles}
                                inputId="react-select-single"
                                TextFieldProps={{
                                    label: getFieldLabel({
                                        field: 'smartLockerId',
                                        defaultLabel: 'SmartLocker',
                                        errors,
                                    }),
                                    InputLabelProps: {
                                        htmlFor: 'react-select-single',
                                        shrink: true,
                                    },
                                    placeholder: 'Zoek een SmartLocker',
                                }}
                                components={{ ...components, Control }}
                                value={smartLockerId}
                                onChange={this.smartLockerIdSelected}
                                cacheOptions
                                loadOptions={this.loadSmartLockerOptions}
                                defaultOptions
                                onInputChange={this.handleInputChange}
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    {id && (
                        <Button
                            onClick={this.deleteSchedule}
                            color="secondary"
                            className={classes.deleteButton}
                        >
                            Verwijderen
                        </Button>
                    )}
                    <Button
                        onClick={this.closeEditScheduleDialog}
                        color="primary"
                    >
                        Annuleren
                    </Button>
                    <Button onClick={this.saveSchedule} color="primary">
                        Opslaan
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditScheduleDialog;
