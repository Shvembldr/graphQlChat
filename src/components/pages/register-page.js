import React, { Component, Fragment } from 'react';
import RegistrationForm from '../registration-form';
import PropTypes from 'prop-types';
import { RegisterUserMutation } from '../../graphql/user/graphql';
import history from './../../history';
import { FORM_ERROR } from "final-form";

@RegisterUserMutation
class RegisterPage extends Component {
  static propTypes = {
    createUser: PropTypes.func,
  };

  onSubmit = async ({ name, email, password, invite }) => {
    try {
      await this.props.createUser({name, email, password, invite});
      history.push('/login')
    } catch (err) {
      switch(err.toString()) {
        case 'Error: GraphQL error: Username is taken':
          return { name: "Username is taken" };
        case 'Error: GraphQL error: Email is taken':
          return { email: "Email is taken" };
        case 'Error: GraphQL error: jwt malformed':
          return { invite: "Your invite is invalid" };
        case 'Error: GraphQL error: jwt expired':
          return { invite: "Your invite is expired" };
        default:
          return { [FORM_ERROR]: "Registration failed" };
      }
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
