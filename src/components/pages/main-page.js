import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserQuery } from '../../graphql';
import Layout from '../common/layout';

class MainPage extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    const { user } = this.props;
    return (
      user && (
        <div>
          <Layout />
        </div>
      )
    );
  }
}

export default UserQuery(MainPage);
