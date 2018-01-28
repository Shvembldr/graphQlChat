import React, { Component, Fragment } from 'react';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';

import LoginPage from './components/pages/login-page';
import MainPage from './components/pages/main-page';
import RegisterPage from "./components/pages/register-page";
import history from './history';
import {AuthRoute} from "./components/authRoute";
import Modal from './components/common/modal';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Fragment>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <AuthRoute exact path="/" component={MainPage} />
            </Switch>
            <Modal />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
