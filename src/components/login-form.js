import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import Input from './form-elements/input';
import { Button, Grid, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
    <Grid verticalAlign="middle" textAlign="center" centered>
      <Grid.Column width={4}>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Segment secondary padded>
                <Field
                  icon="mail outline"
                  fluid
                  name="email"
                  component={Input}
                  placeholder={'email'}
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
              </Segment>

              <Button
                fluid
                size="large"
                color="teal"
                type="submit"
                loading={submitting}
              >
                Войти
              </Button>
            </form>
          )}
        />
        <Message>
          <Link to="/register">Зарегистрироваться</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
