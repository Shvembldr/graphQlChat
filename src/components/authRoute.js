import React from 'react';
import decode from 'jwt-decode';
import { Redirect, Route } from 'react-router-dom';

const checkAuth = () => {
  const token = localStorage.getItem('x-token');
  const refreshToken = localStorage.getItem('x-refresh-token');
  if (!token || !refreshToken) {
    return false;
  }

  try {
    const { exp } = decode(refreshToken);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};

export const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
  />
);
