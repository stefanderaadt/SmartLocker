import React, { Component } from 'react';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({});

@withStyles(styles)
class Home extends Component {
    render() {
        return (
            <Typography component="h2" variant="h5" gutterBottom>
                Home
            </Typography>
        );
    }
}

export default Home;
