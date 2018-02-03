import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MessagesQuery } from '../../graphql/message/graphql';
import format from 'date-fns/format';
import ChatFileUpload from './chat-file-upload';
import Message from './message';

@MessagesQuery
class ChatWindow extends Component {
  static propTypes = {
    channelId: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.object,
    messages: PropTypes.arrayOf(PropTypes.object),
    subscribeToNewMessages: PropTypes.func,
    user: PropTypes.object,
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
    const { messages, channelId, user } = this.props;
    return (
      messages && (
        <ChatFileUpload channelId={channelId} userId={user.id}>
          <div className="chat__window-wrapper">
            {messages.map(message => (
              <div key={`message-${message.id}`} className="message">
                {!message.user.avatar ? (
                  <div className="message__avatar-mock">
                    {message.user.name.substr(0, 1)}
                  </div>
                ) : (
                  <img
                    className="message__avatar"
                    src={message.user.avatar}
                    alt={message.user.name}
                  />
                )}

                <div className="message__wrapper">
                  <div className="message__title">
                    <div className="message__user">{message.user.name}</div>
                    <div className="message__time">
                      {format(new Date(message.createdAt), 'HH:mm')}
                    </div>
                  </div>
                  <Message message={message} />
                </div>
              </div>
            ))}
          </div>
        </ChatFileUpload>
      )
    );
  }
}

export default ChatWindow;
