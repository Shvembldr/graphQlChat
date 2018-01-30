import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormSelect from '../form-elements/select';
import Input from '../form-elements/input';
import { CreatePrivateChannel } from '../../graphql/channel/graphql';
import { Form, Field } from 'react-final-form';
import Loader from '../common/loader';
import { hideModal } from '../../redux/actions/modal';
import {connect} from "react-redux";
import {FORM_ERROR} from "final-form";

const validate = values => {
  const errors = {};
  if (!values.channelName) {
    errors.channelName = 'Required';
  }
  if (values.channelName && values.channelName.length > 15) {
    errors.channelName = '15 symbols is max for channel name'
  }
  if (!values.users) {
    errors.users = 'Required';
  }
  return errors;
};

@CreatePrivateChannel
class AddChannel extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    createPrivateChannel: PropTypes.func,
    currentUserId: PropTypes.number,
    teamId: PropTypes.number,
    hideModal: PropTypes.func,
  };

  onSubmit = async values => {
    try {
      await this.props.createPrivateChannel({
        name: values.channelName,
        users: [...values.users, this.props.currentUserId],
        teamId: this.props.teamId,
      });
      this.props.hideModal();
    } catch (err) {
      switch(err.toString()) {
        default:
          return { [FORM_ERROR]: "Something goes wrong..." };
      }
    }
  };

  render() {
    const { users, currentUserId } = this.props;
    const options = users
      .filter(user => user.id !== currentUserId)
      .map(user => ({ label: user.name, value: user.id }));
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validate}
        render={({ handleSubmit, reset, submitting, submitError }) => (
          <form className="form__add-channel" onSubmit={handleSubmit}>
            <Field name="channelName" component={Input} label={'name'} />
            <Field
              name="users"
              component={FormSelect}
              options={options}
              placeholder={'add users'}
            />
            <div className="form__error form__error--full">
              {submitError}
            </div>
            <div className="form__button-container">
              {submitting ? (
                <Loader />
              ) : (
                <button type="submit" className="form__submit">
                  Add Channel
                </button>
              )}
            </div>
          </form>
        )}
      />
    );
  }
}

export default connect(null, { hideModal })(AddChannel);
