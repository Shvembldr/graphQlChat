import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MessagesQuery } from '../../graphql/message/graphql';
import format from 'date-fns/format';
import ChatFileUpload from './chat-file-upload';
import Message from './message';
import _ from 'lodash';

@MessagesQuery
class ChatWindow extends Component {
  static propTypes = {
    channelId: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.object,
    messages: PropTypes.arrayOf(PropTypes.object),
    subscribeToNewMessages: PropTypes.func,
    user: PropTypes.object,
    fetchMoreMessages: PropTypes.func,
  };

  componentWillMount() {
    this.unsubscribe = this.props.subscribeToNewMessages(this.props.channelId);
  }

  componentWillReceiveProps({ messages, channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.props.subscribeToNewMessages(channelId);
    }

    if(messages) {
      setTimeout(() => this.scrollToBottom(), 200)
    }

    if (
      this.scroller &&
      this.scroller.scrollTop < 100 &&
      this.props.messages &&
      messages &&
      this.props.messages.length !== messages.length
    ) {
      const heightBeforeRender = this.scroller.scrollHeight;
      setTimeout(() => {
        if (this.scroller) {
          this.scroller.scrollTop =
            this.scroller.scrollHeight - heightBeforeRender;
        }
      }, 200);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  scrollToBottom = () => {
    this.scroller.scrollTop = this.scroller.scrollHeight;
  };

  handleScroll = () => {
    const { messages, fetchMoreMessages, channelId } = this.props;
    if (
      this.scroller &&
      this.scroller.scrollTop < 100 &&
      messages.length >= 35
    ) {
      fetchMoreMessages({
        channelId,
        cursor: messages[messages.length - 1].createdAt,
      });
    }
  };

  render() {
    const { messages, channelId, user } = this.props;
    return (
      <div className="chat__window">
        <div
          className="chat__window-wrapper"
          onScroll={_.debounce(() => this.handleScroll(), 100)}
          ref={scroller => {
            this.scroller = scroller;
          }}
        >
          {messages && (
            <ChatFileUpload channelId={channelId} userId={user.id}>
              {[...messages].reverse().map(message => (
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
            </ChatFileUpload>
          )}
        </div>
      </div>
    );
  }
}

export default ChatWindow;
