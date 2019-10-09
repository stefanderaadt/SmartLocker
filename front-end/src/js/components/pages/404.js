import React, { Component } from 'react';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({});

@withStyles(styles)
class Error404 extends Component {
    render() {
        return (
            <Typography component="h2" variant="h5" gutterBottom>
                Error 404
            </Typography>
        );
    }
}

export default Error404;
