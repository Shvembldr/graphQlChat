import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { compose } from 'react-apollo';

import Input from '../form-elements/input';
import Loader from '../common/loader';
import {UsersQuery} from "../../graphql/user/graphql";
import FormSelect from "../form-elements/select";
import {CreatePrivateChannel} from "../../graphql/channel/graphql";


@compose(UsersQuery, CreatePrivateChannel)
class AddChannelModal extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    teamId: PropTypes.number,
    users: PropTypes.arrayOf(PropTypes.object),
    createPrivateChannel: PropTypes.func,
    currentUserId: PropTypes.number
  };

  componentDidMount = () => {
    if (this.props.onClose) {
      window.addEventListener('keydown', this.listenKeyboard, true);
    }
  };

  componentWillUnmount = () => {
    if (this.props.onClose) {
      window.removeEventListener('keydown', this.listenKeyboard, true);
    }
  };

  onOverlayClick = () => {
    this.props.onClose();
  };

  listenKeyboard = event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.onClose();
    }
  };

   onSubmit = async (values) => {
    await this.props.createPrivateChannel({
      name: values.channelName,
      users: [...values.users, this.props.currentUserId],
      teamId: this.props.teamId
    });
    this.props.onClose();
  };

  render() {
    const { open, users, currentUserId } = this.props;
    const options = users && users
      .filter(user => user.id !== currentUserId)
      .map(user => ({label: user.name, value: user.id}));
    return (
      open && users && (
        <div>
          <div className="modal__overlay" onClick={this.onOverlayClick} />
          <div className="modal__content">
            <Form
              onSubmit={this.onSubmit}
              // validate={validate}
              render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <form className="form__add-channel" onSubmit={handleSubmit}>
                  <Field name="channelName" component={Input} placeholder={'name'} />
                  <Field name="users" component={FormSelect} options={options} placeholder={'add users'} />
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
          </div>
        </div>
      )
    );
  }
}

export default AddChannelModal;
