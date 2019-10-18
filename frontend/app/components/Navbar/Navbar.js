import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getUser } from 'my-actions/userActions';
import { makeSelectEmail } from 'my-selectors/userSelectors';

import { withStyles } from '@material-ui/core/styles';
import styles from './Navbar-jss';
import ProfileDropButton from '../ProfileDropMenu/ProfileDropButton';

class Navbar extends Component {
  state = {
    email: null,
  };

  static getDerivedStateFromProps(props) {
    return {
      email: props.email,
    };
  }

  componentDidMount() {
    const { onGetUser } = this.props;
    onGetUser();
  }

  render() {
    const { classes } = this.props;
    const { email } = this.state;
    return (
      <header className={classes.navbar}>
        <nav className={classes.navbar_nav}>
          <div className={classes.navbar_title}>
            <a href="/groups">Django Mango</a>
          </div>
          <div className={classes.navbar_buttons}>
            <ul>
              <li>
                <a href="/groups">Home</a>
              </li>
              <li>
                <a href="/groups">Dashboard</a>
              </li>
              <li>
                <a href="/groups">Groups</a>
              </li>
            </ul>
          </div>
          <div className={classes.empty}> </div>
          <div className={classes.ProfileButton}>
            <ProfileDropButton />
          </div>
          <div className={classes.navbar_email}>{email}</div>
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  onGetUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
});

const mapDispatchToProps = dispatch => ({
  onGetUser: () => dispatch(getUser()),
});

const NavbarMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);

export default withStyles(styles)(NavbarMapped);
