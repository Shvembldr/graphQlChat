import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Input from './form-elements/input';
import Loader from './common/loader';
import LoginLayout from './common/login-layout';

const LoginForm = ({ onSubmit }) => {
  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
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
                <Field name="email" type='email' component={Input} label={'email'} />
                <Field
                  type="password"
                  name="password"
                  component={Input}
                  label={'password'}
                />
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
                      Login
                    </button>
                  )}
                </div>
              </form>
            )}
          />
          <Link to="/register">
            <div className="form__link">Registration</div>
          </Link>
        </div>
      </div>
    </LoginLayout>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
