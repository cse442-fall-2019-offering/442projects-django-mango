import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from 'my-actions/userActions';
import { createStructuredSelector } from 'reselect';

import ProfileCard from 'my-components/ProfilePage/ProfileCard';
import Loading from 'my-components/Loading';
import Navbar from 'my-components/Navbar/Navbar';
import { withStyles } from '@material-ui/core/styles';
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
  };

  static getDerivedStateFromProps(props) {
    return {
      email: props.email,
      name: props.name,
      languages: props.languages,
    };
  }

  componentDidMount() {
    const { onGetUser } = this.props;
    onGetUser();
  }

  handleLanguagesChange = languages => {
    this.setState({
      languages,
    });
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;
    const { email } = this.state;
    const { name } = this.state;
    const { languages } = this.state;
    return (
      <div className={classes.root}>
        <Navbar />
        <ProfileCard email={email} name={name} languages={languages} />
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  onGetUser: PropTypes.func.isRequired,
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
});

const ProfileMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default withStyles(styles)(ProfileMapped);
