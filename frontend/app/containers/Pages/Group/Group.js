import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Popup from 'reactjs-popup';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';

import {
  getGroup,
  updateGroup,
  joinGroup,
  leaveGroup,
} from 'my-actions/groupActions';
import Loading from 'my-components/Loading';
import ReactMediumEditor from 'my-components/Editor/ReactMediumEditor';
import LangMenu from 'my-components/LangMenu/LangMenu';
import Navbar from 'my-components/Navbar/Navbar';
import { makeSelectGroup } from 'my-selectors/groupSelectors';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import styles from './group-jss';

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
    description: '<p></p>',
    contact: '<p></p>',
    languages: [],
    members: [],
    changed: [],
    member: null,
    edit: false,
    loading: true,
    error: false,
  };

  static getDerivedStateFromProps(props, prevState) {
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
    if (prevState.members !== props.group.members) {
      return {
        name: props.group.name,
        description: props.group.description,
        contact: props.group.contact,
        languages: props.group.languages,
        members: props.group.members,
        member: props.group.member,
        loading: false,
      };
    }
    return null;
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

  handleUpdateGroup = () => {
    const { onUpdateGroup } = this.props;
    const payload = {
      groupId: this.props.match.params.groupId,
      name: this.state.name,
      description: this.state.description,
      contact: this.state.contact,
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

  handleDescriptionChange = desc => {
    this.setState({
      description: desc,
    });
    if (!containsObject('description', this.state.changed))
      this.setState(previousState => ({
        changed: [...previousState.changed, 'description'],
      }));
  };

  handleContactChange = contact => {
    this.setState({
      contact,
    });
    if (!containsObject('contact', this.state.changed))
      this.setState(previousState => ({
        changed: [...previousState.changed, 'contact'],
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
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <NotFoundPage />;
    }
    const { classes } = this.props;
    if (this.state.member) {
      if (this.state.edit) {
        return (
          <div className={classes.root}>
            <Navbar />
            <Grid container spacing={2}>
              <Grid item md={3} sm={10} xs={12}>
                <div className={classes.button}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={this.handleLeaveGroup}
                  >
                    Leave
                  </Button>
                </div>
                <div className={classes.name}>{this.state.name}</div>
                <ReactMediumEditor
                  className={classes.description}
                  text={this.state.description}
                  onChange={this.handleDescriptionChange}
                  placeholder="Group Description"
                />
                <div className={classes.languagesMenu}>
                  <LangMenu
                    selectedLanguages={this.state.languages}
                    onLanguagesChange={this.handleLanguagesChange}
                  />
                </div>
                <div className={classes.members}>
                  {this.state.members.map(member => (
                    <p key={member}>
                      <AccountCircle />
                      {` ${member}\n`}
                    </p>
                  ))}
                </div>
                <div className={classes.submitButton}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={this.handleUpdateGroup}
                    disabled={this.state.changed.length === 0}
                  >
                    Submit
                  </Button>
                </div>
                <IconButton className={classes.close} onClick={this.editGroup}>
                  <CloseIcon />
                </IconButton>
                <Popup
                  trigger={
                    <IconButton className={classes.contactEdit}>
                      <ChatIcon />
                    </IconButton>
                  }
                  modal
                  closeOnDocumentClick
                >
                  <ReactMediumEditor
                    className={classes.contactPopup}
                    text={this.state.contact}
                    onChange={this.handleContactChange}
                    placeholder="Group Contact"
                  />
                </Popup>
              </Grid>
            </Grid>
          </div>
        );
      }
      return (
        <div className={classes.root}>
          <Navbar />
          <Grid container spacing={2}>
            <Grid item md={3} sm={10} xs={12}>
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  disabled
                >
                  Join
                </Button>
              </div>
              <div className={classes.name}>{this.state.name}</div>
              <div
                className={classes.description}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: this.state.description }}
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
              <IconButton className={classes.edit} onClick={this.editGroup}>
                <EditIcon />
              </IconButton>
              <Popup
                trigger={
                  <IconButton className={classes.contact}>
                    <ChatIcon />
                  </IconButton>
                }
                modal
                closeOnDocumentClick
              >
                <div
                  className={classes.contactPopup}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: this.state.contact }}
                />
              </Popup>
            </Grid>
          </Grid>
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <Navbar />
        <Grid container spacing={2}>
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
            <div
              className={classes.description}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: this.state.description }}
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
