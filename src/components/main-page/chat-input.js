import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMessageMutation } from '../../graphql/message/graphql';

const ENTER_KEY = 13;

@createMessageMutation
class ChatInput extends Component {
  static propTypes = {
    createMessage: PropTypes.func,
    channelId: PropTypes.number,
    userId: PropTypes.number,
  };

  state = {
    input: '',
  };

  handleChange = e => {
    this.setState({
      input: e.target.value,
    });
  };

  sendMessage = async () => {
    try {
      await this.props.createMessage({
        channelId: this.props.channelId,
        text: this.state.input,
        userId: this.props.userId,
      });
      this.input.value = '';
    } catch (err) {
      console.log(err)
    }
  };

  render() {
    return (
      <div className="chat__input input">
        <div className="input__wrapper">
          <input
            onKeyDown={(e) => {
              if (e.keyCode === ENTER_KEY) {
                this.sendMessage();
              }
            }}
            ref={e => this.input = e}
            type="textarea"
            className="input__area"
            onChange={this.handleChange}
          />
          <button className="input__send" onClick={this.sendMessage}>
            Отправить
          </button>
        </div>
      </div>
    );
  }
}

export default ChatInput;
