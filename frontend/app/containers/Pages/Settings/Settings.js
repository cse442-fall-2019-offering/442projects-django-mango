import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from 'my-actions/userActions';
import Button from '@material-ui/core/Button';
// import Loading from 'my-components/Loading';

import './style.css';

class Login extends Component {
  state = {
    // isAuthenticating: true,
    group_limit: 50,
    group_size: 5,
  };

  handleLimitChange = event => {
    this.setState({ group_limit: event.target.value });
  };

  handleSizeChange = event => {
    this.setState({ group_size: event.target.value });
  };

  handleCreateGroup = () => {
    console.log('limit: ', this.state.group_limit);
    console.log('size: ', this.state.group_size);
  };

  render() {
    return (
      <span>
        <div className="background">
          <div className="centerbox">
            <h1>Django Mango</h1>
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
              onClick={this.handleCreateGroup}
              disabled={this.state.created || this.state.name === ''}
            >
              Done
            </Button>
          </div>
        </div>
      </span>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: payload => dispatch(login(payload)),
});

const LoginMapped = connect(
  null,
  mapDispatchToProps,
)(Login);

export default LoginMapped;
