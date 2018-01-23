import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../login-form';
import { LoginMutation } from '../../graphql';
import history from './../../history';

class LoginPage extends Component {
  static propTypes = {};

  state = {
    error: null,
  };

  onSubmit = async ({ email, password }) => {
    try {
      const {
        data: { login: { token, refreshToken } },
      } = await this.props.login({
        email,
        password,
      });
      localStorage.setItem('x-token', token);
      localStorage.setItem('x-refresh-token', refreshToken);
      history.push('/');
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  };

  render() {
    return (
      <Fragment>
        <LoginForm onSubmit={this.onSubmit} />
        {this.state.error && <h3>{this.state.error}</h3>}
      </Fragment>
    );
  }
}

export default LoginMutation(LoginPage);
