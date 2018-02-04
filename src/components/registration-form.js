import React, { Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import Input from './form-elements/input';
import { Link } from 'react-router-dom';
import Loader from './common/loader';
import LoginLayout from './common/login-layout';

const RegistrationForm = ({ onSubmit, user }) => {
  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    if (values.name && values.name.length < 3) {
      errors.name = 'Name length must be more than 3 symbols';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (values.password && values.password.length < 8) {
      errors.password = 'Password length must be more than 8 symbols';
    }
    if (!values.password2) {
      errors.password2 = 'Required';
    }

    if (values.password !== values.password2) {
      errors.password2 = 'Does not match!';
    }

    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.invite) {
      errors.invite = 'Required';
    }

    return errors;
  };

  return (
    <LoginLayout>
      <div className="form-container">
        <div className="form__content">
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, reset, submitting, submitError }) => (
              <form onSubmit={handleSubmit}>
                <Fragment>
                  <Field name="name" component={Input} label={'name'} />
                  <Field name="email" type='email' component={Input} label={'email'} />
                  <Field
                    type="password"
                    name="password"
                    component={Input}
                    label={'password'}
                  />
                  <Field
                    type="password"
                    name="password2"
                    component={Input}
                    label={'confirm password'}
                  />
                  <Field
                    name="invite"
                    component={Input}
                    label={'your invite'}
                  />
                </Fragment>
                {submitError && (
                  <div className="form__error form__error--full">
                    {submitError}
                  </div>
                )}
                <div className="form__button-container">
                  {submitting ? (
                    <Loader />
                  ) : (
                    <button type="submit" className="form__submit">
                      Register
                    </button>
                  )}
                </div>
              </form>
            )}
          />
          {!user && (
            <Link to="/login">
              <div className="form__link">Login</div>
            </Link>
          )}
        </div>
      </div>
    </LoginLayout>
  );
};

RegistrationForm.propTypes = {};

export default RegistrationForm;
