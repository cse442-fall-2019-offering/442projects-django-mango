import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { getGroups, createGroup } from 'my-actions/groupActions';
import Group from 'my-components/Dashboard/Group';
import Loading from 'my-components/Loading';
import Navbar from 'my-components/Navbar/Navbar';
import { makeSelectGroups } from 'my-selectors/groupSelectors';
import styles from './dashboard-jss';

var currentUser;

import firebase from "firebase"

firebase.initializeApp({
  apiKey:" AIzaSyDyQlqoOHI2Af0dzNswbZ4T-B9qicu4ByU",
  authDomain:"django-mango.firebaseapp.com"
})



class Dashboard extends Component {
  state = {
    groups: [],
    loading: false,
    isAuthenticating: true,
  };

  authUser() {
    return new Promise(function (resolve, reject) {
       firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            resolve(user);
            currentUser = user;
          } else {
            reject('User not logged in');
            window.location.href = '/';
          }             
       });
    });
  }

  static getDerivedStateFromProps(props) {
    if (props.groups.length < 1) {
      return {
        loading: true,
      };
    }
    return {
      groups: props.groups,
      loading: false,
    };
  }

  componentDidMount() {
    this.authUser().then((user) => {
       this.setState({ isAuthenticating: false });
    }, (error) => {
       this.setState({ isAuthenticating: false });
       alert(e);
    });
    
    const { onGetGroups } = this.props;
    onGetGroups();
  }

  handleGroupClick = id => {
    window.location.href = `/groups/${id}`;
  };

  handleCreateGroup = () => {
    const { onCreateGroup } = this.props;
    const payload = { groupId: 'not_yet_implemented' };
    onCreateGroup(payload);
  };

  render() {
    if (this.state.loading || this.state.isAuthenticating) {
      return <Loading />;
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Navbar email={currentUser.email} />
        <Grid container spacing={2} justify="center">
          <Grid item md={3} sm={12} xs={12}>
            <div className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={this.handleCreateGroup}
              >
                + Create a group
              </Button>
            </div>
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <div className={classes.groupList}>
              {this.state.groups.map(group => (
                <Grid item lg={4} md={5} sm={4} xs={5} key={group[0]}>
                  {group[3].length < 5 ? (
                    <div
                      className={classes.openGroup}
                      onClick={() => this.handleGroupClick(group[0])}
                      role="presentation"
                    >
                      <Group className={classes.open} group={group} />
                    </div>
                  ) : (
                    <div
                      className={classes.closedGroup}
                      onClick={() => this.handleGroupClick(group[0])}
                      role="presentation"
                    >
                      <Group className={classes.closed} group={group} />
                    </div>
                  )}
                </Grid>
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  onGetGroups: PropTypes.func.isRequired,
  onCreateGroup: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  groups: makeSelectGroups(),
});

const mapDispatchToProps = dispatch => ({
  onGetGroups: () => dispatch(getGroups()),
  onCreateGroup: payload => dispatch(createGroup(payload)),
});

const DashboardMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default withStyles(styles)(DashboardMapped);
