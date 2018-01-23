import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/pages/login-page';
import MainPage from './components/pages/main-page';
import RegisterPage from "./components/pages/register-page";
import history from './history';
import {AuthRoute} from "./components/authRoute";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <AuthRoute exact path="/" component={MainPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
