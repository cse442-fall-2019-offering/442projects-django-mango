import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { getGroups, createGroup } from 'my-actions/dashboardActions';
import Group from 'my-components/Dashboard/Group';
import Loading from 'my-components/Loading';
import {
  makeSelectGroups,
  makeSelectLoading,
} from 'my-selectors/dashboardSelectors';
import styles from './dashboard-jss';

class Dashboard extends Component {
  state = {
    groups: [],
    loading: true,
  };

  static getDerivedStateFromProps(props) {
    if (props.loading) {
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
    this.props.history.push(`/groups/${id}`);
  };

  handleCreateGroup = () => {
    const { onCreateGroup } = this.props;
    const payload = { groupId: 'not_yet_implemented' };
    onCreateGroup(payload);
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
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
                <Grid item lg={3} md={4} sm={12} xs={12} key={group[0]}>
                  <div className={classes.group}>
                    <Group group={group} />
                  </div>
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
  history: PropTypes.object.isRequired,
  onGetGroups: PropTypes.func.isRequired,
  onCreateGroup: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  groups: makeSelectGroups(),
  loading: makeSelectLoading(),
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
