import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MessagesQuery } from '../../graphql/message/graphql';
import format from 'date-fns/format';

@MessagesQuery
class ChatWindow extends Component {
  static propTypes = {
    channelId: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.object,
    messages: PropTypes.arrayOf(PropTypes.object),
    subscribeToNewMessages: PropTypes.func,
  };

  componentWillMount() {
    this.unsubscribe = this.props.subscribeToNewMessages(this.props.channelId);
  }

  componentWillReceiveProps({ channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {

        this.unsubscribe();
      }
      this.unsubscribe = this.props.subscribeToNewMessages(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { messages } = this.props;
    return (
      messages && (
        <div className="chat__window">
          <div className="chat__window-wrapper">
            {messages.map(message => (
              <div key={`message-${message.id}`} className="message">
                <div className="message__title">
                  <div className="message__user">{message.user.name}</div>
                  <div className="message__time">{format(new Date(message.createdAt), 'HH:mm' )}</div>
                </div>
                <div className="message__text">{message.text}</div>
              </div>
            ))}
          </div>
        </div>
      )
    );
  }
}

export default ChatWindow;
