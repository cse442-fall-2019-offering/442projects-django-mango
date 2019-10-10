import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import firebase from "firebase"



// import styles from './ProfileDropButton-jss';

export default function ProfileDropButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function signOut() {
    firebase.auth().signOut();
    //window.location.pathname = '/';
  }

  return (
    <div>
      <Button
        aria-controls="DropMenu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        =
      </Button>
      <Menu
        id="DropMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
