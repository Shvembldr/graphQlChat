import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { UserQuery } from '../../graphql/user/graphql';
import Layout from '../main-page/layout';

@UserQuery
class MainPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    publicChannels: PropTypes.arrayOf(PropTypes.object),
    subscribeToNewChannels: PropTypes.func,
    subscribeToNewTeams: PropTypes.func,
    subscribeToNewMessageAlerts: PropTypes.func,
  };

  componentWillMount() {
    this.props.subscribeToNewChannels();
    this.props.subscribeToNewTeams();
    this.props.subscribeToNewMessageAlerts();
  }

  render() {
    const { user } = this.props;
    return (
      user && (
        <div>
          <Layout
            user={user}
            alerts={_.countBy(user.messageAlerts, alert => alert.channelId)}
          />
        </div>
      )
    );
  }
}

export default MainPage;
