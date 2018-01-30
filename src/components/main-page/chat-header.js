import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showSidebar } from '../../redux/actions/sidebar';
import { NotificationsQuery } from '../../graphql/notifications/graphql';
import Typist from 'react-typist';

@NotificationsQuery
class ChatHeader extends Component {
  static propTypes = {
    showSidebar: PropTypes.func,
    user: PropTypes.object,
    userId: PropTypes.number,
    channel: PropTypes.object,
    notifications: PropTypes.arrayOf(PropTypes.object),
    subscribeToNewNotifications: PropTypes.func,
  };

  componentWillMount() {
    this.unsubscribe = this.props.subscribeToNewNotifications(
      this.props.userId,
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.props.subscribeToNewNotifications(
        nextProps.userId,
      );
    }

    if (
      this.props.notifications &&
      this.props.notifications.length !== nextProps.notifications.length
    ) {
      this.setState({
        show: false,
      });
      setTimeout(() => {
        this.setState({
          show: true,
          blurredOut: false,
        });
      }, 1);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  state = {
    show: true,
    blurredOut: false,
  };

  onTypingDone = () => {
    setTimeout(() => {
      this.setState({
        blurredOut: true,
      });
    }, 5000);
  };

  render() {
    const { showSidebar, user, channel, notifications } = this.props;
    return (
      (
        <header className="chat__header header" onClick={this.onClick}>
          <div className="hamburger" onClick={showSidebar}>
            <div className="hamburger__stripe" />
            <div className="hamburger__stripe" />
            <div className="hamburger__stripe" />
          </div>
          <div className="header__channel-name">{channel.name}</div>
          <div  className={
            !this.state.blurredOut
              ? 'header__notifications'
              : 'header__notifications--blur-out'
          }>
            {this.state.show && (
              <Typist
                onTypingDone={this.onTypingDone}
                avgTypingDelay={30}
                cursor={{
                  show: true,
                  blink: true,
                  element: '_',
                }}
              >
                {notifications && notifications.length > 0
                  ? notifications[notifications.length - 1].text
                  : `Hello, ${user.name}!`}
              </Typist>
            )}
          </div>
        </header>
      )
    );
  }
}

export default connect(null, { showSidebar })(ChatHeader);
