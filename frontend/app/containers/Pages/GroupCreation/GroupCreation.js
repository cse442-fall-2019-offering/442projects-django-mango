import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { createGroup } from 'my-actions/groupActions';
import ReactMediumEditor from 'my-components/Editor/ReactMediumEditor';
import LangMenu from 'my-components/LangMenu/LangMenu';
import Navbar from 'my-components/Navbar/Navbar';
import { TextField } from '@material-ui/core';
import styles from './groupCreation-jss';

class GroupCreation extends Component {
  state = {
    name: '',
    description: '<p></p>',
    languages: [],
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

  handleLanguagesChange = languages => {
    this.setState({
      languages,
    });
  };

  handleCreateGroup = () => {
    const { onCreateGroup } = this.props;
    const payload = {
      name: this.state.name,
      description: this.state.description,
      languages: this.state.languages,
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
              placeholder="Group Description"
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
                disabled={this.state.created}
              >
                Submit
              </Button>
            </div>
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
