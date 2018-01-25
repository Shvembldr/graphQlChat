import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aside from './aside';
import ChatWindow from './chat-window';
import ChatInput from "./chat-input";

class Layout extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  state = {
    selectedTeam: this.props.user.teams[0].id,
    selectedChannel: this.props.user.channels[0].id,
  };

  selectTeam = id => {
    this.setState({
      selectedTeam: id,
    });
    console.log(this.state);
  };

  selectChannel = id => {
    this.setState({
      selectedChannel: id,
    });
    console.log(this.state);
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
          <header className="chat__header">.</header>
          <ChatWindow channelId={selectedChannel}/>
          <ChatInput channelId={selectedChannel} userId={user.id}/>
        </section>
      </main>
    );
  }
}

export default Layout;
