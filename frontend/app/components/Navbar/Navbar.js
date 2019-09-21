import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './Navbar-jss';
import ProfileDropButton from '../ProfileDropMenu/ProfileDropButton';

const Navbar = props => (
  <header className={props.classes.navbar}>
    <nav className={props.classes.navbar_nav}>
      <div className={props.classes.navbar_title}>
        <a href="/">Django Mango</a>
      </div>
      <div className={props.classes.navbar_buttons}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/">Groups</a>
          </li>
        </ul>
      </div>
      <div className={props.classes.empty}> </div>
      <div className={props.classes.ProfileButton}>
        <ProfileDropButton />
      </div>
      <div className={props.classes.navbar_email}>
        <a href="/">Email</a>
      </div>
    </nav>
  </header>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
