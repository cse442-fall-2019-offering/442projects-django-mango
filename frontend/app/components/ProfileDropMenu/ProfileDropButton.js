import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { logout } from 'my-actions/userActions';

function ProfileDropButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function signOut() {
    const { onLogout } = props;
    onLogout();
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

ProfileDropButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

const ProfileDropButtonMapped = connect(mapDispatchToProps)(ProfileDropButton);

export default ProfileDropButtonMapped;
