import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { commonStyles } from '../Assets/styles/common';

export default function UserNavIcon(props){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = commonStyles();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    setAnchorEl(null);
    props.handleLogout();
  }

  return(
    <div className={classes.marginNav}>
      <Button
        color="inherit"
        startIcon={<AccountCircle />}
        onClick={handleMenu}
        className={classes.noTextTransform}
      >
        {props.user.first_name + " " + props.user.last_name}
      </Button>
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
        onClose={handleClose}
        >
        <MenuItem disabled onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={logoutUser}>Logout</MenuItem>
      </Menu>
    </div>);

}