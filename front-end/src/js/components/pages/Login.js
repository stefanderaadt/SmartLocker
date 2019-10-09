import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import {
    setEmail,
    setPassword,
    doLogin,
    checkLogin,
} from '../../actions/loginActions';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(15),
        margin: 'auto',
    },
    textField: {
        width: '25rem',
    },
    button: {
        marginTop: theme.spacing(2),
        width: '100%',
    },
    imgDiv: {
        width: '25rem',
    },
    img: {
        display: 'inline-block',
        width: '100%',
        height: 'auto',
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
class Login extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(checkLogin());
    }

    emailOnChange = e => {
        const { dispatch } = this.props;
        dispatch(setEmail(e.target.value));
    };

    passwordOnChange = e => {
        const { dispatch } = this.props;
        dispatch(setPassword(e.target.value));
    };

    loginOnClick = () => {
        const { dispatch, login } = this.props;
        dispatch(doLogin({ email: login.email, password: login.password }));
    };

    render() {
        const { classes, login } = this.props;

        return (
            <Paper className={classes.root} elevation={1}>
                <div className={classes.imgDiv}>
                    <img className={classes.img} src="/img/logo.png" />
                </div>
                <FormControl component="fieldset">
                    <TextField
                        id="email-input"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        value={login.email}
                        onChange={this.emailOnChange}
                    />
                    <TextField
                        id="password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="password"
                        margin="normal"
                        variant="outlined"
                        value={login.password}
                        onChange={this.passwordOnChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.loginOnClick}
                    >
                        Login
                    </Button>
                </FormControl>
            </Paper>
        );
    }
}

export default Login;
