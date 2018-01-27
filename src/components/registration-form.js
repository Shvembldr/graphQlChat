import React, { Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import Input from './form-elements/input';
import { Link } from 'react-router-dom';
import Loader from './common/loader';

const RegistrationForm = ({ onSubmit, user }) => {
  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Обязательно';
    }
    if (values.name && values.name.length < 3) {
      errors.name = 'Имя должно быть больше 3 символов';
    }
    if (!values.password) {
      errors.password = 'Обязательно';
    }
    if (values.password && values.password.length < 8) {
      errors.password = 'Пароль должен быть больше 8 символов';
    }
    if (!values.password2) {
      errors.password2 = 'Обязательно';
    }

    if (values.password !== values.password2) {
      errors.password2 = 'Пароли не совпадают';
    }

    if (!values.email) {
      errors.email = 'Обязательно';
    }

    if (!values.invite) {
      errors.invite = 'Обязательно';
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
            render={({ handleSubmit, reset, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Fragment>
                  <Field name="name" component={Input} placeholder={'Имя'} />
                  <Field name="email" component={Input} placeholder={'Email'} />
                  <Field
                    type="password"
                    name="password"
                    component={Input}
                    placeholder={'Пароль'}
                  />
                  <Field
                    type="password"
                    name="password2"
                    component={Input}
                    placeholder={'Подтвердите пароль'}
                  />
                  <Field
                    name="invite"
                    component={Input}
                    placeholder={'Invite'}
                  />
                </Fragment>
                {submitting ? (
                  <Loader />
                ) : (
                  <button type="submit" className="form__submit">
                    Регистрация
                  </button>
                )}
              </form>
            )}
          />
          {!user && <Link to="/login">Войти</Link>}
        </div>
      </div>
    </div>
  );
};

RegistrationForm.propTypes = {};

export default RegistrationForm;
