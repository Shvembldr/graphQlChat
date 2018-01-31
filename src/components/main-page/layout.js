import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aside from './aside';
import ChatWindow from './chat-window';
import ChatInput from './chat-input';
import ChatHeader from "./chat-header";

class Layout extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  state = {
    selectedTeam: this.props.user.teams[0],
    selectedChannel: this.props.user.teams[0].channels[0],
  };

  selectTeam = team => {
    this.setState({
      selectedTeam: team,
      selectedChannel: team.channels[0],
    });
  };

  selectChannel = channel => {
    this.setState({
      selectedChannel: channel,
    });
  };

  render() {
    const { user } = this.props;
    const { selectedTeam, selectedChannel } = this.state;
    return (
      <main className="main-page">
        <Aside
          user={user}
          selectedTeam={selectedTeam}
          selectedChannel={selectedChannel}
          selectTeam={this.selectTeam}
          selectChannel={this.selectChannel}
        />
        <section className="chat">
          <ChatHeader user={user} channel={selectedChannel} userId={user.id}/>
          <ChatWindow channelId={selectedChannel.id} userId={user.id}/>
          <ChatInput channelId={selectedChannel.id} userId={user.id} />
        </section>
      </main>
    );
  }
}

export default Layout;
