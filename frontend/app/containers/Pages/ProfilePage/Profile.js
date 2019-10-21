import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, updateUser } from 'my-actions/userActions';
import { createStructuredSelector } from 'reselect';

import ProfileCard from 'my-components/ProfileCard/ProfileCard';
import Loading from 'my-components/Loading';
import Navbar from 'my-components/Navbar/Navbar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  makeSelectEmail,
  makeSelectName,
  makeSelectLanguages,
} from '../../../store/selectors/userSelectors';
import styles from './Profile-jss';

class Profile extends Component {
  state = {
    email: null,
    name: null,
    languages: null,
    updated: false,
    loading: true,
  };

  static getDerivedStateFromProps(props, prevState) {
    if (props.email.length < 1) {
      return {
        loading: true,
      };
    }
    if (prevState.email !== props.email) {
      return {
        email: props.email,
        name: props.name,
        languages: props.languages,
        loading: false,
      };
    }
    return null;
  }

  componentDidMount() {
    const { onGetUser } = this.props;
    onGetUser();
  }

  handleLanguagesChange = languages => {
    this.setState({
      languages,
      updated: true,
    });
  };

  handleUpdate = () => {
    const { onUpdateUser } = this.props;
    const payload = {
      languages: this.state.languages,
    };
    onUpdateUser(payload);
    this.setState({
      updated: false,
    });
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;
    const { email, name, languages } = this.state;
    return (
      <div className={classes.root}>
        <Navbar />
        <div className={classes.card}>
          <ProfileCard
            email={email}
            name={name}
            languages={languages}
            onLanguagesChange={this.handleLanguagesChange}
          />
        </div>
        <div className={classes.button}>
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
