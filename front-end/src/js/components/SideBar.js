import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI imports
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import LockIcon from '@material-ui/icons/Lock';

import { NavLink } from 'react-router-dom';

import { closeSideBar } from '../actions/sideBarActions';

const drawerWidth = 240;

const styles = theme => ({
    sideBarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    sideBarList: {
        height: '100%',
    },
    drawerPaper: {
        height: '100vh',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(9),
    },
    listItemIcon: {
        marginLeft: 8,
        marginRight: 8,
    },
    navLink: {
        textDecoration: 'none',
    },
    activeNavLink: {
        '& > div': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
    },
});

@withStyles(styles)
@connect(
    state => ({
        sideBar: state.sideBar,
    }),
    dispatch => ({
        dispatch,
    })
)
class SideBar extends Component {
    closeSideBar = () => {
        this.props.dispatch(closeSideBar());
    };

    render() {
        const { classes, sideBar } = this.props;

        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, {
                        [classes.drawerPaperClose]: !sideBar.open,
                    }),
                }}
                open={sideBar.open}
            >
                <div className={classes.sideBarIcon}>
                    <IconButton onClick={this.closeSideBar}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List className={classes.sideBarList}>
                    <Divider />
                    <NavLink
                        className={classes.navLink}
                        activeClassName={classes.activeNavLink}
                        to="/"
                        exact
                    >
                        <ListItem button>
                            <ListItemIcon className={classes.listItemIcon}>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Verzorgers" />
                        </ListItem>
                    </NavLink>
                    <NavLink
                        className={classes.navLink}
                        activeClassName={classes.activeNavLink}
                        to="/smart-lockers"
                    >
                        <ListItem button>
                            <ListItemIcon className={classes.listItemIcon}>
                                <LockIcon />
                            </ListItemIcon>
                            <ListItemText primary="Smart Lockers" />
                        </ListItem>
                    </NavLink>
                    <Divider />
                </List>
            </Drawer>
        );
    }
}

export default SideBar;
