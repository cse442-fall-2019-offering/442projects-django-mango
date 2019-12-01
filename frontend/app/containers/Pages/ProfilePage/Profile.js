import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Popup from 'reactjs-popup';

import { getUser, updateUser } from 'my-actions/userActions';
import Group from 'my-components/Dashboard/Group';
import LangMenu from 'my-components/LangMenu/LangMenu';
import Loading from 'my-components/Loading';
import Navbar from 'my-components/Navbar/Navbar';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {
  makeSelectEmail,
  makeSelectName,
  makeSelectLanguages,
  makeSelectUserGroups,
} from '../../../store/selectors/userSelectors';
import styles from './Profile-jss';

class Profile extends Component {
  state = {
    email: null,
    name: null,
    languages: null,
    groups: [],
    updated: false,
    loading: true,
  };

  static getDerivedStateFromProps(props, prevState) {
    if (props.groups == null) {
      return {
        loading: true,
      };
    }
    if (prevState.email !== props.email) {
      return {
        email: props.email,
        name: props.name,
        languages: props.languages,
        groups: props.groups,
        loading: false,
      };
    }
    return null;
  }

  componentDidMount() {
    const { onGetUser } = this.props;
    onGetUser();
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value,
      updated: true,
    });
  };

  handleLanguagesChange = languages => {
    this.setState({
      languages,
      updated: true,
    });
  };

  handleUpdate = () => {
    const { onUpdateUser } = this.props;
    const payload = {
      name: this.state.name,
      languages: this.state.languages,
    };
    onUpdateUser(payload);
    this.setState({
      updated: false,
    });
  };

  handleGroupClick = id => {
    window.location.href = `/groups/${id}`;
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;
    const { name, languages } = this.state;
    return (
      <div className={classes.root}>
        <Navbar />
        <Grid container spacing={2} justify="center">
          <Grid item md={3} sm={12} xs={12}>
            <div className={classes.update}>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={this.handleUpdate}
                disabled={!this.state.updated}
              >
                Update
              </Button>
            </div>
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <TextField
              className={classes.name}
              value={name}
              onChange={this.handleNameChange}
              placeholder="name"
              margin="normal"
              variant="outlined"
            />
            <div className={classes.languages}>
              <LangMenu
                selectedLanguages={languages}
                onLanguagesChange={this.handleLanguagesChange}
              />
            </div>
            <Popup
              trigger={
                <div className={classes.groups}>
                  <Button variant="contained" color="primary" type="button">
                    Groups
                  </Button>
                </div>
              }
              modal
              closeOnDocumentClick
            >
              <div className={classes.groupList}>
                {this.state.groups.length > 0 ? (
                  this.state.groups.map(group => (
                    <Grid item lg={4} md={5} sm={4} xs={5} key={group[0]}>
                      <div
                        className={classes.group}
                        onClick={() => this.handleGroupClick(group[0])}
                        role="presentation"
                      >
                        <Group group={group} />
                      </div>
                    </Grid>
                  ))
                ) : (
                  <p> No groups joined. </p>
                )}
              </div>
            </Popup>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  onGetUser: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};
// in
const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  name: makeSelectName(),
  languages: makeSelectLanguages(),
  groups: makeSelectUserGroups(),
});
// out
const mapDispatchToProps = dispatch => ({
  onGetUser: () => dispatch(getUser()),
  onUpdateUser: payload => dispatch(updateUser(payload)),
});

const ProfileMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default withStyles(styles)(ProfileMapped);
