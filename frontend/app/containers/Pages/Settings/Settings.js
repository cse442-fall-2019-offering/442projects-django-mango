import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getSettings, updateSettings } from 'my-actions/groupActions';
import Loading from 'my-components/Loading';
import { makeSelectSettings } from 'my-selectors/groupSelectors';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import './style.css';

class Settings extends Component {
  state = {
    group_limit: null,
    group_size: null,
    loading: true,
    error: false,
    changed: false,
  };

  static getDerivedStateFromProps(props, prevState) {
    if (props.groups.group_limit === null) {
      return {
        loading: true,
      };
    }
    if (props.groups.error) {
      return {
        loading: false,
        error: true,
      };
    }
    if (
      (prevState.error && props.groups.error === undefined) ||
      !prevState.changed
    ) {
      return {
        group_limit: props.groups.group_limit,
        group_size: props.groups.group_size,
        loading: false,
        error: false,
      };
    }
    return null;
  }

  componentDidMount() {
    const { onGetSettings } = this.props;
    onGetSettings();
  }

  handleLimitChange = event => {
    this.setState({ group_limit: event.target.value, changed: true });
  };

  handleSizeChange = event => {
    this.setState({ group_size: event.target.value, changed: true });
  };

  handleDone = () => {
    const { onDone } = this.props;
    const payload = {
      group_limit: this.state.group_limit,
      group_size: this.state.group_size,
    };
    onDone(payload);
    window.location.href = '/groups';
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.error) {
      return <NotFoundPage />;
    }
    return (
      <span>
        <div className="background">
          <div className="centerbox">
            <h1>Group Settings</h1>
            <h2>Limit on total number of groups</h2>
            <select
              value={this.state.group_limit}
              onChange={this.handleLimitChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
              <option value="55">55</option>
              <option value="60">60</option>
              <option value="65">65</option>
              <option value="70">70</option>
              <option value="75">75</option>
              <option value="80">80</option>
              <option value="85">85</option>
              <option value="90">90</option>
              <option value="95">95</option>
              <option value="100">100</option>
            </select>
            <h2>Limit on group size</h2>
            <select
              value={this.state.group_size}
              onChange={this.handleSizeChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            <p> </p>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={this.handleDone}
              disabled={!this.state.changed}
            >
              Done
            </Button>
          </div>
        </div>
      </span>
    );
  }
}

Settings.propTypes = {
  onGetSettings: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  groups: makeSelectSettings(),
});

const mapDispatchToProps = dispatch => ({
  onGetSettings: () => dispatch(getSettings()),
  onDone: payload => dispatch(updateSettings(payload)),
});

const SettingsMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

export default SettingsMapped;
