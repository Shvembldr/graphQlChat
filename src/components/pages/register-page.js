import React, { Component, Fragment } from 'react';
import RegistrationForm from '../registration-form';
import PropTypes from 'prop-types';
import {RegisterUserMutation} from '../../graphql';

class RegisterPage extends Component {
  static propTypes = {
    createUser: PropTypes.func,
  };

  onSubmit = async ({ name, email, password }) => {
    const result = await this.props.createUser({
      name,
      email,
      password
    });
  };

  render() {
    return (
      <Fragment>
        <RegistrationForm onSubmit={this.onSubmit}/>
      </Fragment>
    );
  }
}

export default RegisterUserMutation(RegisterPage);
