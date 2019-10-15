import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import firebase from 'firebase';

import {
  getGroup,
  updateGroup,
  joinGroup,
  leaveGroup,
} from 'my-actions/groupActions';
import Loading from 'my-components/Loading';
import ReactMediumEditor from 'my-components/Editor/ReactMediumEditor';
import Navbar from 'my-components/Navbar/Navbar';
import { makeSelectGroup } from 'my-selectors/groupSelectors';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import styles from './group-jss';

let currentUser;

function containsObject(obj, list) {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
}

class Group extends Component {
  state = {
    name: '',
    description: '',
    languages: [],
    members: [],
    changed: [],
    edit: false,
    loading: true,
    error: false,
    isAuthenticating: true,
  };

  static getDerivedStateFromProps(props) {
    if (props.group.length < 1) {
      return {
        loading: true,
      };
    }
    if (props.group.error) {
      return {
        loading: false,
        error: true,
      };
    }
    return {
      name: props.group.name,
      description: props.group.description,
      languages: props.group.languages,
      members: props.group.members,
      loading: false,
    };
  }

  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDyQlqoOHI2Af0dzNswbZ4T-B9qicu4ByU',
      authDomain: 'django-mango.firebaseapp.com',
    });

    this.authUser().then(
      () => {
        this.setState({ isAuthenticating: false });
      },
      () => {
        this.setState({ isAuthenticating: false });
        // alert(e);
      },
    );

    const { onGetGroup } = this.props;
    const payload = { groupId: this.props.match.params.groupId };
    onGetGroup(payload);
  }

  authUser() {
    return new Promise(function auth(resolve, reject) {
      firebase.auth().onAuthStateChanged(function authStateChanged(user) {
        if (user) {
          resolve(user);
          if (user.email.includes('@buffalo.edu')) {
            currentUser = user;
          } else {
            alert('You must sign-in with an @buffalo.edu email address.');
            firebase.auth().signOut();
            window.location.href = '/';
          }
        } else {
          reject(new Error('User not logged in'));
          window.location.href = '/';
        }
      });
    });
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

  handleUpdateGroup = () => {
    const { onUpdateGroup } = this.props;
    const payload = {
      groupId: this.props.match.params.groupId,
      name: this.state.name,
      description: this.state.description,
      languages: this.state.languages,
    };
    onUpdateGroup(payload);
    this.setState({
      changed: [],
    });
  };

  handleNameChange = event => {
    this.setState({
      name: event.target.value,
    });
    if (!containsObject('name', this.state.changed))
      this.setState(previousState => ({
        changed: [...previousState.changed, 'name'],
      }));
  };

  handleDescriptionChange = description => {
    this.setState({
      description,
    });
    if (!containsObject('description', this.state.changed))
      this.setState(previousState => ({
        changed: [...previousState.changed, 'description'],
      }));
  };

  handleLanguagesChange = languages => {
    this.setState({
      languages,
    });
    if (!containsObject('languages', this.state.changed))
      this.setState(previousState => ({
        changed: [...previousState.changed, 'languages'],
      }));
  };

  editGroup = () => {
    this.setState(previousState => ({
      edit: !previousState.edit,
    }));
  };

  render() {
    if (this.state.loading || this.state.isAuthenticating) {
      return <Loading />;
    }
    if (this.state.error) {
      return <NotFoundPage />;
    }
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Prompt
            when={this.state.changed.length > 0}
            message="You have unsaved changes, are you sure you want to leave?"
          />
          <Navbar email={currentUser.email} />
          <Grid container spacing={2} justify="center">
            <Grid item md={3} sm={10} xs={12}>
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
              <div className={classes.name}>{this.state.name}</div>
              <ReactMediumEditor
                className={classes.description}
                text={this.state.description}
                onChange={this.handleDescriptionChange}
                placeholder="Group Description"
              />
              <div className={classes.languages}>
                <div className={classes.languageTitle}>
                  <p>Languages</p>
                </div>
                {this.state.languages.map(language => (
                  <p key={language}>{`${language}\n`}</p>
                ))}
              </div>
              <div className={classes.members}>
                {this.state.members.map(member => (
                  <p key={member}>
                    <AccountCircle />
                    {` ${member}\n`}
                  </p>
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  onGetGroup: PropTypes.func.isRequired,
  onUpdateGroup: PropTypes.func,
  onJoinGroup: PropTypes.func,
  onLeaveGroup: PropTypes.func,
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
  onUpdateGroup: payload => dispatch(updateGroup(payload)),
  onJoinGroup: payload => dispatch(joinGroup(payload)),
  onLeaveGroup: payload => dispatch(leaveGroup(payload)),
});

const GroupMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Group);

export default withStyles(styles)(GroupMapped);
