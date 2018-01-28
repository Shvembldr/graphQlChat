import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormSelect from '../form-elements/select';
import Input from '../form-elements/input';
import { UsersQuery } from '../../graphql/user/graphql';
import { compose } from 'react-apollo/index';
import { CreatePrivateChannel } from '../../graphql/channel/graphql';
import { Form, Field } from 'react-final-form';
import Loader from '../common/loader';
import { hideModal } from '../../redux/actions/modal';
import {connect} from "react-redux";

const validate = values => {
  const errors = {};
  if (!values.channelName) {
    errors.channelName = 'Required';
  }
  if (!values.users) {
    errors.users = 'Required';
  }
  return errors;
};

@compose(UsersQuery, CreatePrivateChannel)
class AddChannel extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    createPrivateChannel: PropTypes.func,
    currentUserId: PropTypes.number,
    teamId: PropTypes.number,
    hideModal: PropTypes.func,
  };

  onSubmit = async values => {
    await this.props.createPrivateChannel({
      name: values.channelName,
      users: [...values.users, this.props.currentUserId],
      teamId: this.props.teamId,
    });
    this.props.hideModal();
  };

  render() {
    const { users, currentUserId } = this.props;
    const options =
      users &&
      users
        .filter(user => user.id !== currentUserId)
        .map(user => ({ label: user.name, value: user.id }));
    return (
      users && (
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form className="form__add-channel" onSubmit={handleSubmit}>
              <Field
                name="channelName"
                component={Input}
                placeholder={'name'}
              />
              <Field
                name="users"
                component={FormSelect}
                options={options}
                placeholder={'add users'}
              />
              {submitting ? (
                <Loader />
              ) : (
                <button type="submit" className="form__submit">
                  Create Channel
                </button>
              )}
            </form>
          )}
        />
      )
    );
  }
}

export default connect(null, { hideModal })(AddChannel);
