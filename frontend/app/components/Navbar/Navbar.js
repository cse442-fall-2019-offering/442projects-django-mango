import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getEmail } from 'my-actions/userActions';
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
    const { onGetEmail } = this.props;
    onGetEmail();
  }

  render() {
    const { classes } = this.props;
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
          <div className={classes.navbar_email}>{this.state.email}</div>
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  onGetEmail: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
});

const mapDispatchToProps = dispatch => ({
  onGetEmail: () => dispatch(getEmail()),
});

const NavbarMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);

export default withStyles(styles)(NavbarMapped);
