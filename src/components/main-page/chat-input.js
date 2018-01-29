import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMessageMutation } from '../../graphql/message/graphql';
import debounce from 'lodash/debounce';

const ENTER_KEY = 13;

@createMessageMutation
class ChatInput extends Component {
  static propTypes = {
    createMessage: PropTypes.func,
    channelId: PropTypes.number,
    userId: PropTypes.number,
  };

  componentWillMount = () => {
    this.sendMessage = debounce(this.sendMessage, 200);
  };

  state = {
    input: '',
  };

  onKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
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
        await this.props.createMessage({
          channelId: this.props.channelId,
          text: this.state.input,
          userId: this.props.userId,
        });
        this.input.value = '';
        this.setState({
          input: '',
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
          <input
            onKeyDown={this.onKeyDown}
            ref={e => (this.input = e)}
            type="textarea"
            className="input__area"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default ChatInput;
