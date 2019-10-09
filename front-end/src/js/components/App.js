import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

// Material UI imports
import {
    MuiThemeProvider,
    createMuiTheme,
    withStyles,
} from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import 'typeface-roboto';

import { Route, Switch } from 'react-router-dom';

import TopBar from './TopBar/index';
import SideBar from './SideBar';
import Dialogs from './dialogs/index';
import Alert from './Alert';

// Pages
import LoginPage from './pages/Login';
import Home from './pages/Home';
import Caregivers from './pages/Caregivers/index';
import SingleCaregiver from './pages/SingleCaregiver/index';
import SmartLockers from './pages/SmartLockers';
import Error404Page from './pages/404';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: blue,
        secondary: blueGrey,
    },
});

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        overflow: 'auto',
    },
});

@withStyles(styles)
@connect(
    state => ({
        login: state.login,
    }),
    dispatch => ({
        dispatch,
    })
)
class App extends Component {
    render() {
        const { classes, login } = this.props;
        return (
            <MuiPickersUtilsProvider utils={MomentUtils} locale="nl">
                <MuiThemeProvider theme={theme}>
                    <div className={classes.root}>
                        <Alert />
                        {login.loggedIn ? (
                            <Fragment>
                                <Dialogs />
                                <TopBar />
                                <SideBar />
                                <main className={classes.content}>
                                    <div className={classes.appBarSpacer} />
                                    <Switch>
                                        <Route
                                            exact
                                            path="/home"
                                            component={Home}
                                        />
                                        <Route
                                            exact
                                            path="/"
                                            component={Caregivers}
                                        />
                                        <Route
                                            exact
                                            path="/verzorgers/:id"
                                            component={SingleCaregiver}
                                        />
                                        <Route
                                            exact
                                            path="/smart-lockers"
                                            component={SmartLockers}
                                        />
                                        <Route component={Error404Page} />
                                    </Switch>
                                </main>
                            </Fragment>
                        ) : (
                            <LoginPage />
                        )}
                    </div>
                </MuiThemeProvider>
            </MuiPickersUtilsProvider>
        );
    }
}

export default App;
