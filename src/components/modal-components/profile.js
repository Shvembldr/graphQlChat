import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../form-elements/input';
import { Form, Field } from 'react-final-form';
import Dropzone from 'react-dropzone';
import Loader from '../common/loader';
import { hideModal } from '../../redux/actions/modal';
import { connect } from 'react-redux';
import { FORM_ERROR } from 'final-form';
import {
  UpdateUserAvatarMutation,
  UpdateUserNameMutation,
  UserAvatarQuery,
} from '../../graphql/user/graphql';
import { compose } from 'react-apollo';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (values.name && values.name.length > 10) {
    errors.name = 'name is too long';
  }

  return errors;
};

@compose(UpdateUserNameMutation, UpdateUserAvatarMutation, UserAvatarQuery)
class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    hideModal: PropTypes.func,
    updateUserName: PropTypes.func,
    updateUserAvatar: PropTypes.func,
  };

  state = {
    dropError: null,
    loading: false,
  };

  onSubmit = async values => {
    try {
      await this.props.updateUserName({
        name: values.name,
      });
      this.props.hideModal();
    } catch (err) {
      switch (err.toString()) {
        default:
          return { [FORM_ERROR]: 'Something went wrong...' };
      }
    }
  };

  onDrop = async ([file]) => {
    if (!file.type.startsWith('image/')) {
      this.setState({
        dropError: 'Sorry, only image files',
      });
    }

    if (file.size > 5000000) {
      this.setState({
        dropError: 'Image must be less 5 mb',
      });
    }

    try {
      this.setState({
        loading: true,
      });
      await this.props.updateUserAvatar({
        file,
      });
      this.setState({
        dropError: null,
        loading: false,
      });
    } catch (err) {
      switch (err.toString()) {
        default:
          return { [FORM_ERROR]: 'Something went wrong...' };
      }
    }
  };

  render() {
    const { user } = this.props;
    const { loading, dropError } = this.state;
    return (
      user && (
        <Form
          onSubmit={this.onSubmit}
          validate={validate}
          initialValues={{ name: user.name }}
          render={({
            handleSubmit,
            reset,
            submitting,
            submitError,
            values,
          }) => (
            <form className="form__add-channel" onSubmit={handleSubmit}>
              <Dropzone className="ignore" onDrop={this.onDrop}>
                <div className="form__drop-image-container">
                  <div className="form__drop-image-mask">
                    {loading ? (
                      <Loader />
                    ) : (
                      <p>
                        Drag or Click to <br /> Upload your photo
                      </p>
                    )}
                  </div>
                  {!user.avatar ? (
                    <div className="form__drop-image" />
                  ) : (
                    <img src={user.avatar} alt={user.name} />
                  )}

                  <div
                    className={
                      !dropError
                        ? 'form__error'
                        : 'form__error form__error--visible'
                    }
                  >
                    {dropError}
                  </div>
                </div>
              </Dropzone>
              <Field
                name="name"
                component={Input}
                label={'your name'}
                defaultValue={user.name}
              />
              <div className="form__error form__error--full">{submitError}</div>
              <div className="form__button-container">
                {submitting ? (
                  <Loader />
                ) : (
                  <button
                    type="submit"
                    disabled={values.name === user.name}
                    className="form__submit"
                  >
                    Save Name
                  </button>
                )}
              </div>
            </form>
          )}
        />
      )
    );
  }
}

export default connect(null, { hideModal })(Profile);
