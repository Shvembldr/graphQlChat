import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormSelect from '../form-elements/select';
import Input from '../form-elements/input';
import { Form, Field } from 'react-final-form';
import Loader from '../common/loader';
import { hideModal } from '../../redux/actions/modal';
import {connect} from "react-redux";
import {CreateTeamMutation} from "../../graphql/team/graphql";

const validate = values => {
  const errors = {};
  if (!values.teamName) {
    errors.teamName = 'Required';
  }
  return errors;
};

@CreateTeamMutation
class CreateTeam extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    createTeam: PropTypes.func,
    currentUserId: PropTypes.number,
    hideModal: PropTypes.func,
  };

  onSubmit = async values => {
    await this.props.createTeam({
      name: values.teamName,
      members: [...values.users],
      owner: this.props.currentUserId,
    });
    this.props.hideModal();
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
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form className="form__add-channel" onSubmit={handleSubmit}>
            <Field name="teamName" component={Input} label={'team name'} />
            <Field
              name="users"
              component={FormSelect}
              options={options}
              placeholder={'add users'}
            />
            <div className="form__button-container">
              {submitting ? (
                <Loader />
              ) : (
                <button type="submit" className="form__submit">
                  Add Team
                </button>
              )}
            </div>
          </form>
        )}
      />
    );
  }
}

export default connect(null, { hideModal })(CreateTeam);
