import React from 'react';
import { Form, Field } from 'react-final-form';
import Input from './form-elements/input';
import { Link } from 'react-router-dom';
import Loader from "./common/loader";

const LoginForm = ({ onSubmit }) => {
  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Обязательно';
    }
    if (!values.password) {
      errors.password = 'Обязательно';
    }
    return errors;
  };

  return (
    <div className="form">
      <div className="form-container">
        <div className="form__content">
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                  <Field
                    name="email"
                    component={Input}
                    placeholder={'email'}
                  />
                  <Field
                    type="password"
                    name="password"
                    component={Input}
                    placeholder={'Пароль'}
                  />

                {submitting ? (
                  <Loader />
                ) : (
                  <button type="submit" className="form__submit">
                    Войти
                  </button>
                )}
              </form>
            )}
          />
            <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
