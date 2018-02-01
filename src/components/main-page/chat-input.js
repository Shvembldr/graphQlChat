import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMessageMutation } from '../../graphql/message/graphql';

const ENTER_KEY = 13;

@createMessageMutation
class ChatInput extends Component {
  static propTypes = {
    createMessage: PropTypes.func,
    channel: PropTypes.object,
    userId: PropTypes.number,
  };

  state = {
    input: '',
    submitting: false,
  };

  onKeyDown = e => {
    if (e.keyCode === ENTER_KEY && !this.state.submitting) {
      e.preventDefault();
      this.sendMessage();
    }
  };

  handleChange = e => {
    this.setState({
      input: e.target.value,
    });
  };

  sendMessage = async () => {
    if (this.state.input) {
      try {
        this.setState({
          submitting: true,
        });
        await this.props.createMessage({
          channelId: this.props.channel.id,
          text: this.state.input,
          userId: this.props.userId,
        });
        this.input.value = '';
        this.setState({
          input: '',
          submitting: false
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    return (
      <div className="chat__input input">
        <div className="input__wrapper">
          <textarea
            onKeyDown={this.onKeyDown}
            ref={e => (this.input = e)}
            className="input__area"
            rows="1"
            maxLength="1000"
            placeholder={`Write a message to: #${this.props.channel.name}`}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default ChatInput;
