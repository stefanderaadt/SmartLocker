import React, { Component } from 'react';

// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = theme => ({ icon: { float: 'right' } });

@withStyles(styles)
class UserDropDown extends Component {
    render() {
        const {
            classes,
            anchorEl,
            handleLogout,
            open,
            closeTopBarMenu,
            user,
        } = this.props;

        return (
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={closeTopBarMenu}
            >
                <MenuItem>{user.email}</MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon className={classes.icon} />
                    Uitloggen
                </MenuItem>
            </Menu>
        );
    }
}

export default UserDropDown;
