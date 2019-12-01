import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { getGroups } from 'my-actions/groupActions';
import Group from 'my-components/Dashboard/Group';
import Loading from 'my-components/Loading';
import Navbar from 'my-components/Navbar/Navbar';
import { makeSelectGroups } from 'my-selectors/groupSelectors';
import styles from './dashboard-jss';

class Dashboard extends Component {
  state = {
    groups: null,
    loading: false,
  };

  static getDerivedStateFromProps(props) {
    if (props.groups === null) {
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
    const { onGetGroups } = this.props;
    onGetGroups();
  }

  handleGroupClick = id => {
    window.location.href = `/groups/${id}`;
  };

  handleCreateGroup = () => {
    window.location.href = 'groups/new';
  };

  handleAutoGroup = () => {
    window.location.href = 'auto_join_group';
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Navbar />
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
              <div className={classes.empty}> </div>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={this.handleAutoGroup}
              >
                Auto Group Assign
              </Button>
            </div>
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <div className={classes.groupList}>
              {this.state.groups.map(group => (
                <Grid item lg={4} md={5} sm={4} xs={5} key={group[0]}>
                  {group[4] === 'free' ? (
                    <div
                      className={classes.openGroup}
                      onClick={() => this.handleGroupClick(group[0])}
                      role="presentation"
                    >
                      <Group group={group} />
                    </div>
                  ) : (
                    <div
                      className={classes.closedGroup}
                      onClick={() => this.handleGroupClick(group[0])}
                      role="presentation"
                    >
                      <Group group={group} />
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
};

const mapStateToProps = createStructuredSelector({
  groups: makeSelectGroups(),
});

const mapDispatchToProps = dispatch => ({
  onGetGroups: () => dispatch(getGroups()),
});

const DashboardMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default withStyles(styles)(DashboardMapped);
