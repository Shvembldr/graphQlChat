import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import Input from '../form-elements/input';
import Loader from '../common/loader';
import {AddUserToTeam} from "../../graphql/team/graphql";


@AddUserToTeam
class AddChannelModal extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    currentUserId: PropTypes.number,
    addUserToTeam: PropTypes.func
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

  onSubmit = async ({invite}) => {
    await this.props.addUserToTeam({
      invite,
      userId: this.props.currentUserId,
    });
    this.props.onClose();
  };

  render() {
    const { open, currentUserId } = this.props;
    return (
      open && (
        <div>
          <div className="modal__overlay" onClick={this.onOverlayClick} />
          <div className="modal__content">
            <Form
              onSubmit={this.onSubmit}
              render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <form className="form__add-channel" onSubmit={handleSubmit}>
                  <Field name="invite" component={Input} placeholder={'Enter your invite'} />
                  {submitting ? (
                    <Loader />
                  ) : (
                    <button type="submit" className="form__submit">
                      Add Team
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
