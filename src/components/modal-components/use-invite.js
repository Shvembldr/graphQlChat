import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AddUserToTeam } from '../../graphql/team/graphql';
import Input from '../form-elements/input';
import { connect } from 'react-redux';
import { hideModal } from '../../redux/actions/modal';
import { Form, Field } from 'react-final-form';
import Loader from '../common/loader';


const validate = values => {
  const errors = {};
  if (!values.invite) {
    errors.invite = 'Required';
  }
  return errors;
};

@AddUserToTeam
class UseInvite extends Component {
  static propTypes = {
    addUserToTeam: PropTypes.func,
    hideModal: PropTypes.func,
    currentUserId: PropTypes.number,
  };

  onSubmit = async ({ invite }) => {
    await this.props.addUserToTeam({
      invite,
      userId: this.props.currentUserId,
    });
    this.props.hideModal();
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form className="form__add-team" onSubmit={handleSubmit}>
            <Field
              name="invite"
              component={Input}
              label={'Enter your invite'}
            />
            <div className="form__button-container">
              {submitting ? (
                <Loader />
              ) : (
                <button type="submit" className="form__submit">
                  Use It
                </button>
              )}
            </div>
          </form>
        )}
      />
    );
  }
}

export default connect(null, { hideModal })(UseInvite);
