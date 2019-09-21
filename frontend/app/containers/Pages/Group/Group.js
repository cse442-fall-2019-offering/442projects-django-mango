import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';

import { getGroup, joinGroup, leaveGroup } from 'my-actions/groupActions';
import Loading from 'my-components/Loading';
import Navbar from 'my-components/Navbar/Navbar';
import { makeSelectGroup } from 'my-selectors/groupSelectors';
import styles from './group-jss';

class Group extends Component {
  state = {
    group: [],
    loading: true,
  };

  static getDerivedStateFromProps(props) {
    if (props.group.length < 1) {
      return {
        loading: true,
      };
    }
    return {
      group: props.group,
      loading: false,
    };
  }

  componentDidMount() {
    const { onGetGroup } = this.props;
    const payload = { groupId: this.props.match.params.groupId };
    onGetGroup(payload);
  }

  handleJoinGroup = () => {
    const { onJoinGroup } = this.props;
    const payload = { groupId: this.props.match.params.groupId };
    onJoinGroup(payload);
  };

  handleLeaveGroup = () => {
    const { onLeaveGroup } = this.props;
    const payload = { groupId: this.props.match.params.groupId };
    onLeaveGroup(payload);
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
                onClick={this.handleJoinGroup}
              >
                Join
              </Button>
            </div>
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <div className={classes.group}>
              <div className={classes.title}>{this.state.group[1]}</div>
              <div className={classes.languages}>
                <div className={classes.languageTitle}>
                  <p>Languages</p>
                </div>
                {this.state.group[2].map(language => (
                  <div className={classes.language}>
                    <p>{`${language}\n`}</p>
                  </div>
                ))}
              </div>
              <div className={classes.members}>
                {this.state.group[3].map(member => (
                  <div className={classes.member}>
                    <p>
                      <AccountCircle />
                      {` ${member}\n`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  onGetGroup: PropTypes.func.isRequired,
  onJoinGroup: PropTypes.func.isRequired,
  onLeaveGroup: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      groupId: PropTypes.string.isRequired,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  group: makeSelectGroup(),
});

const mapDispatchToProps = dispatch => ({
  onGetGroup: payload => dispatch(getGroup(payload)),
  onJoinGroup: payload => dispatch(joinGroup(payload)),
  onLeaveGroup: payload => dispatch(leaveGroup(payload)),
});

const GroupMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Group);

export default withStyles(styles)(GroupMapped);
