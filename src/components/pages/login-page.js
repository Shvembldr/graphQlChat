import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../login-form';
import { LoginMutation } from '../../graphql/user/graphql';
import history from './../../history';
import { FORM_ERROR } from 'final-form';
import { wsLink } from '../../apollo';

@LoginMutation
class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func,
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
      wsLink.subscriptionClient.tryReconnect();
      history.push('/');
    } catch (err) {
      switch (err.toString()) {
        case 'Error: GraphQL error: User does not exist':
          return { email: 'User does not exist' };
        case 'Error: GraphQL error: Wrong password':
          return { password: 'Wrong password' };
        default:
          return { [FORM_ERROR]: 'Login failed' };
      }
    }
  };

  render() {
    return (
      <Fragment>
        <LoginForm onSubmit={this.onSubmit} />
      </Fragment>
    );
  }
}

export default LoginPage;
