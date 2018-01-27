import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserQuery } from '../../graphql/user/graphql';
import Layout from '../main-page/layout';

@UserQuery
class MainPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    publicChannels: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { user } = this.props;
    return (
      user && (
        <div>
          <Layout user={user} />
        </div>
      )
    );
  }
}

export default MainPage;
