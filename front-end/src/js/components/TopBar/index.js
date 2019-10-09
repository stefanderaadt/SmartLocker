import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI imports
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountCircle';

import { openSideBar } from '../../actions/sideBarActions';
import { openTopBarMenu, closeTopBarMenu } from '../../actions/topBarActions';
import { doLogout } from '../../actions/loginActions';

import UserDropDown from './UserDropDown';

const drawerWidth = 240;

const styles = theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
});

@withStyles(styles)
@connect(
    state => ({
        sideBar: state.sideBar,
        topBar: state.topBar,
        login: state.login,
    }),
    dispatch => ({
        dispatch,
    })
)
class TopBar extends Component {
    openSideBar = () => {
        const { dispatch } = this.props;
        dispatch(openSideBar());
    };

    openTopBarMenu = e => {
        const { dispatch } = this.props;
        dispatch(openTopBarMenu(e.currentTarget));
    };

    closeTopBarMenu = () => {
        const { dispatch } = this.props;
        dispatch(closeTopBarMenu());
    };

    doLogout = () => {
        const { dispatch } = this.props;
        this.closeTopBarMenu();
        dispatch(doLogout());
    };

    render() {
        const { classes, sideBar, topBar, login } = this.props;

        return (
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: sideBar.open,
                })}
            >
                <Toolbar
                    disableGutters={!sideBar.open}
                    className={classes.toolbar}
                >
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.openSideBar}
                        className={clsx(classes.menuButton, {
                            [classes.menuButtonHidden]: sideBar.open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Dashboard
                    </Typography>
                    <IconButton color="inherit" onClick={this.openTopBarMenu}>
                        <AccountIcon />
                    </IconButton>
                    <UserDropDown
                        anchorEl={topBar.anchorEl}
                        open={topBar.menuOpen}
                        closeTopBarMenu={this.closeTopBarMenu}
                        handleLogout={this.doLogout}
                        user={login.user}
                    />
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopBar;
