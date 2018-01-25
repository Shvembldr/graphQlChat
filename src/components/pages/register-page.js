import React, { Component, Fragment } from 'react';
import RegistrationForm from '../registration-form';
import PropTypes from 'prop-types';
import { RegisterUserMutation } from '../../graphql/user/graphql';
import history from './../../history';

@RegisterUserMutation
class RegisterPage extends Component {
  static propTypes = {
    createUser: PropTypes.func,
  };

  onSubmit = async ({ name, email, password }) => {
    try {
      await this.props.createUser({name, email, password});
      history.push('/login')
    } catch (err) {
      console.log(err)
    }
  };

  render() {
    return (
      <Fragment>
        <RegistrationForm onSubmit={this.onSubmit} />
      </Fragment>
    );
  }
}

export default RegisterPage;
