import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import ReactTooltip from 'react-tooltip';

import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { createGroup } from 'my-actions/groupActions';
import ReactMediumEditor from 'my-components/Editor/ReactMediumEditor';
import LangMenu from 'my-components/LangMenu/LangMenu';
import Navbar from 'my-components/Navbar/Navbar';
import styles from './groupCreation-jss';

class GroupCreation extends Component {
  state = {
    name: '',
    description: '<p></p>',
    contact: '<p></p>',
    languages: [],
    public: false,
    created: false,
  };

  handleNameChange = event => {
    this.setState({
      name: event.target.value,
    });
  };

  handleDescriptionChange = description => {
    this.setState({
      description,
    });
  };

  handleContactChange = contact => {
    this.setState({
      contact,
    });
  };

  handleLanguagesChange = languages => {
    this.setState({
      languages,
    });
  };

  handlePublicChange = () => {
    this.setState(prevState => ({
      public: !prevState.public,
    }));
  };

  handleCreateGroup = () => {
    const { onCreateGroup } = this.props;
    const payload = {
      name: this.state.name,
      description: this.state.description,
      contact: this.state.contact,
      languages: this.state.languages,
      public: this.state.public,
    };
    onCreateGroup(payload);
    this.setState({
      created: true,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Navbar />
        <Grid container spacing={2}>
          <Grid item md={3} sm={10} xs={12}>
            <TextField
              className={classes.name}
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="Group Name"
              margin="normal"
              variant="outlined"
            />
            <ReactMediumEditor
              className={classes.description}
              text={this.state.description}
              onChange={this.handleDescriptionChange}
              placeholder="Group Description - Try Highlighting Your Text!"
            />
            <div className={classes.languages}>
              <LangMenu
                selectedLanguages={this.state.languages}
                onLanguagesChange={this.handleLanguagesChange}
              />
            </div>
            <div className={classes.submitButton}>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={this.handleCreateGroup}
                disabled={this.state.created || this.state.name === ''}
              >
                Submit
              </Button>
            </div>
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
                placeholder="Group Contact - Try Highlighting Your Text!"
              />
            </Popup>
            {this.state.public ? (
              <div className={classes.publicButton}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={this.handlePublicChange}
                  data-tip
                  data-for="publicButton"
                >
                  Public
                </Button>
                <ReactTooltip id="publicButton">
                  <span>Change to Private</span>
                </ReactTooltip>
              </div>
            ) : (
              <div className={classes.publicButton}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={this.handlePublicChange}
                  data-tip
                  data-for="privateButton"
                >
                  Private
                </Button>
                <ReactTooltip id="privateButton">
                  <span>Change to Public</span>
                </ReactTooltip>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

GroupCreation.propTypes = {
  classes: PropTypes.object.isRequired,
  onCreateGroup: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCreateGroup: payload => dispatch(createGroup(payload)),
});

const GroupCreationMapped = connect(
  null,
  mapDispatchToProps,
)(GroupCreation);

export default withStyles(styles)(GroupCreationMapped);
