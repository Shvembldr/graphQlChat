import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Aside from './aside';
import ChatWindow from './chat-window';
import ChatInput from './chat-input';
import ChatHeader from './chat-header';
import { RemoveAlertsMutation } from '../../graphql/alerts/graphql';

@RemoveAlertsMutation
class Layout extends Component {
  static propTypes = {
    user: PropTypes.object,
    removeAlerts: PropTypes.func,
  };

  state = {
    selectedTeam: this.props.user.teams[0],
    selectedChannel: this.props.user.channels.filter(
      channel => channel.team.id === this.props.user.teams[0].id,
    )[0],
  };

  selectTeam = team => {
    this.setState({
      selectedTeam: team,
      selectedChannel: this.props.user.channels.filter(
        channel => channel.team.id === team.id,
      )[0],
    });
  };

  selectChannel = async channel => {
    await this.props.removeAlerts({channelId: channel.id});
    this.setState({
      selectedChannel: channel,
    });
  };

  render() {
    const { user } = this.props;
    const { selectedTeam, selectedChannel } = this.state;
    const alerts = _.countBy(user.messageAlerts, alert => alert.channelId);
    return (
      <main className="main-page">
        <Aside
          user={user}
          selectedTeam={selectedTeam}
          selectedChannel={selectedChannel}
          selectTeam={this.selectTeam}
          selectChannel={this.selectChannel}
          alerts={alerts}
        />
        <section className="chat">
          <ChatHeader
            user={user}
            channel={selectedChannel}
            userId={user.id}
            team={selectedTeam}
          />
          <ChatWindow channelId={selectedChannel.id} user={user} />
          <ChatInput channel={selectedChannel} userId={user.id} />
        </section>
      </main>
    );
  }
}

export default Layout;
