import React, { Component } from 'react';

import { connect } from 'react-redux';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/ZoomIn';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import EnhancedTableHead from './EnhancedTableHead';

import { sortTypes } from '../../../constants';

import {
    fetchCaregivers,
    caregiversUpdateSearchValues,
} from '../../../actions/caregiversActions';
import {
    openEditCaregiverDialog,
    openEditCaregiverDialogUpdate,
} from '../../../actions/editCaregiverActions';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableButton: {
        padding: 0,
    },
    actions: {
        textAlign: 'right',
    },
});

@withStyles(styles)
@connect(
    state => ({
        caregivers: state.caregivers,
        login: state.login,
    }),
    dispatch => ({
        dispatch,
    })
)
class Caregivers extends Component {
    componentDidMount() {
        this.fetchCaregiversBySearchValues();
    }

    updateSearchValues = values => {
        const { dispatch } = this.props;
        dispatch(caregiversUpdateSearchValues(values));
        this.fetchCaregiversBySearchValues();
    };

    fetchCaregiversBySearchValues = () => {
        const { dispatch } = this.props;
        dispatch(fetchCaregivers());
    };

    openEditCaregiverDialog = () => {
        const { dispatch } = this.props;
        dispatch(openEditCaregiverDialog());
    };

    openEditCaregiverDialogUpdate = caregiver => {
        const { dispatch } = this.props;
        dispatch(openEditCaregiverDialogUpdate(caregiver));
    };

    render() {
        const { caregivers, classes } = this.props;

        const emptyRows = caregivers.size - caregivers.numberOfElements;

        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography
                        component="h2"
                        variant="h5"
                        gutterBottom
                        className={classes.title}
                    >
                        Verzorgers
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.actions}>
                    <Tooltip title="Voeg een nieuwe verzorger toe">
                        <Fab
                            color="primary"
                            size="small"
                            aria-label="Nieuwe Verzorger"
                            onClick={this.openEditCaregiverDialog}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item xs={12} className={classes.actions}>
                    <Paper className={classes.paper}>
                        <div className={classes.tableWrapper}>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size="medium"
                            >
                                <EnhancedTableHead
                                    sortField={caregivers.sortField}
                                    sortDirection={caregivers.sortDirection}
                                    onRequestSort={(e, field) =>
                                        this.updateSearchValues({
                                            sortField: field,
                                            sortDirection:
                                                caregivers.sortField ===
                                                    field &&
                                                caregivers.sortDirection ===
                                                    sortTypes.asc
                                                    ? sortTypes.desc
                                                    : sortTypes.asc,
                                        })
                                    }
                                />
                                <TableBody>
                                    {caregivers.content.map(caregiver => (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={caregiver.id}
                                        >
                                            <TableCell>
                                                <Tooltip title="Verzorger aanpassen">
                                                    <IconButton
                                                        className={
                                                            classes.tableButton
                                                        }
                                                        aria-label="Verzorger aanpassen"
                                                        onClick={() =>
                                                            this.openEditCaregiverDialogUpdate(
                                                                caregiver
                                                            )
                                                        }
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Verzorger Pagina">
                                                    <div>
                                                        <NavLink
                                                            className={
                                                                classes.navLink
                                                            }
                                                            activeClassName={
                                                                classes.activeNavLink
                                                            }
                                                            to={`/verzorgers/${
                                                                caregiver.id
                                                            }`}
                                                        >
                                                            <IconButton
                                                                className={
                                                                    classes.tableButton
                                                                }
                                                                aria-label="Verzorger Pagina"
                                                            >
                                                                <InfoIcon />
                                                            </IconButton>
                                                        </NavLink>
                                                    </div>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                {caregiver.email}
                                            </TableCell>
                                            <TableCell>
                                                {caregiver.firstName}
                                            </TableCell>
                                            <TableCell>
                                                {caregiver.lastName}
                                            </TableCell>
                                            <TableCell>Verzorger</TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{ height: 49 * emptyRows }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[10, 20]}
                            component="div"
                            count={caregivers.totalElements}
                            rowsPerPage={caregivers.size}
                            page={caregivers.number}
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
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Caregivers;
