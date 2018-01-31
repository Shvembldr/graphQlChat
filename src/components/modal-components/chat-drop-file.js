import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../form-elements/input';
import { Form, Field } from 'react-final-form';
import Loader from '../common/loader';
import { hideModal } from '../../redux/actions/modal';
import { connect } from 'react-redux';
import { FORM_ERROR } from 'final-form';
import { createMessageMutation } from '../../graphql/message/graphql';

@createMessageMutation
class ChatDropFile extends Component {
  static propTypes = {
    channelId: PropTypes.number,
    userId: PropTypes.number,
    createMessage: PropTypes.func,
    file: PropTypes.object,
  };

  onSubmit = async values => {
    if (this.props.file.size > 5000000) {
      return { [FORM_ERROR]: 'you can not upload files more than 5 mb' };
    }

    if (!this.props.file.type.startsWith('image/')) {
      return {
        [FORM_ERROR]: 'Sorry, only image files for now',
      };
    }
    try {
      await this.props.createMessage(
        {
          channelId: this.props.channelId,
          userId: this.props.userId,
          text: values.comment,
        },
        this.props.file,
      );
      this.props.hideModal();
    } catch (err) {
      switch (err.toString()) {
        default:
          return { [FORM_ERROR]: 'Something went wrong...' };
      }
    }
  };

  render() {
    const { file } = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, reset, submitting, submitError }) => (
          <form className="form__add-channel" onSubmit={handleSubmit}>
            <div className="form__file-name">{file.name}</div>

            {file.size > 5000000 ? (
              <div className="form__error form__error--full">
                you can't upload files more than 5 mb
              </div>
            ) : (
              <Field name="comment" component={Input} label={'your comment'} />
            )}

            <div className="form__error form__error--full">{submitError}</div>
            <div className="form__button-container">
              {submitting ? (
                <Loader />
              ) : (
                <button
                  disabled={file.size > 5000000}
                  type="submit"
                  className="form__submit"
                >
                  Upload File
                </button>
              )}
            </div>
          </form>
        )}
      />
    );
  }
}

export default connect(null, { hideModal })(ChatDropFile);
