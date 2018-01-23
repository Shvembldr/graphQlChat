import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import Input from './form-elements/input';
import {
  Button,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RegistrationForm = ({ onSubmit, user }) => {
  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Обязательно';
    }
    if (values.name && values.name.length < 3) {
      errors.name = 'Имя должно быть больше 3 символов'
    }
    if (!values.password) {
      errors.password = 'Обязательно';
    }
    if (values.password && values.password.length < 8) {
      errors.password = 'Пароль должен быть больше 8 символов'
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

    return errors;
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" centered>
      <Grid.Column width={4}>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, reset, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Segment secondary padded loading={submitting}>
                {!user ? (
                  <Fragment>
                    <Field
                      icon="user"
                      fluid
                      name="name"
                      component={Input}
                      placeholder={'Имя'}
                    />
                    <br />
                    <Field
                      icon="mail outline"
                      fluid
                      name="email"
                      component={Input}
                      placeholder={'Email'}
                    />
                    <br />
                    <Field
                      icon="lock"
                      fluid
                      type="password"
                      name="password"
                      component={Input}
                      placeholder={'Пароль'}
                    />
                    <Field
                      icon="lock"
                      fluid
                      type="password"
                      name="password2"
                      component={Input}
                      placeholder={'Пароль еще раз'}
                    />
                  </Fragment>
                ) : (
                  <Header textAlign="center">Спасибо за регистрацию!</Header>
                )}
              </Segment>
              {!user ? (
                <Button fluid size="large" color="teal" type="submit">
                  Отправить
                </Button>
              ) : (
                <Link to="/login">
                  {' '}
                  <Button fluid size="large" color="teal" type="submit">
                    Войти
                  </Button>
                </Link>
              )}
            </form>
          )}
        />
        {!user && (
          <Message>
            <Link to="/login">Войти</Link>
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

RegistrationForm.propTypes = {};

export default RegistrationForm;
