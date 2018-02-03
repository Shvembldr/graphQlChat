import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import _ from 'lodash';

import { connect } from 'react-redux';
import { showModal } from '../../redux/actions/modal';
import AddChannel from '../modal-components/add-channel';
import CreateTeam from '../modal-components/create-team';
import Invites from '../modal-components/invites';
import UseInvite from '../modal-components/use-invite';
import Profile from '../modal-components/profile';
import { UsersQuery } from '../../graphql/user/graphql';
import { hideSidebar } from '../../redux/actions/sidebar';
import { RemoveAlertsMutation } from '../../graphql/alerts/graphql';

@compose(UsersQuery, RemoveAlertsMutation)
class Aside extends Component {
  static propTypes = {
    user: PropTypes.object,
    selectedTeam: PropTypes.object,
    selectedChannel: PropTypes.object,
    selectTeam: PropTypes.func,
    selectChannel: PropTypes.func,
    publicChannels: PropTypes.arrayOf(PropTypes.object),
    addUserToTeam: PropTypes.func,
    showModal: PropTypes.func,
    users: PropTypes.arrayOf(PropTypes.object),
    isVisible: PropTypes.bool,
    hideSidebar: PropTypes.func,
    removeAlerts: PropTypes.func,
  };

  componentDidMount = async () => {
    if (this.props.alerts[this.props.selectedChannel.id]) {
      await this.props.removeAlerts({
        channelId: this.props.selectedChannel.id,
      });
    }
  };

  componentWillReceiveProps = async nextProps => {
    if (nextProps.alerts[this.props.selectedChannel.id]) {
      await this.props.removeAlerts({
        channelId: this.props.selectedChannel.id,
      });
    }
  };

  addChannel = () => {
    const modalComponent = (
      <AddChannel
        teamId={this.props.selectedTeam.id}
        currentUserId={this.props.user.id}
        users={this.props.users}
      />
    );
    this.props.showModal(modalComponent);
  };

  useInvite = () => {
    const modalComponent = <UseInvite currentUserId={this.props.user.id} />;
    this.props.showModal(modalComponent);
  };

  createTeam = () => {
    const modalComponent = (
      <CreateTeam currentUserId={this.props.user.id} users={this.props.users} />
    );
    this.props.showModal(modalComponent);
  };

  showInvites = () => {
    const modalComponent = (
      <Invites
        currentUserId={this.props.user.id}
        selectedTeam={this.props.selectedTeam}
      />
    );
    this.props.showModal(modalComponent);
  };

  showProfile = () => {
    this.props.showModal(<Profile />);
  };

  render() {
    const {
      user,
      users,
      selectedTeam,
      selectedChannel,
      selectTeam,
      selectChannel,
      isVisible,
      hideSidebar,
      alerts,
    } = this.props;
    // console.log(alerts[selectedChannel.id]);
    return (
      users && (
        <Fragment>
          <aside className={isVisible ? 'aside' : 'aside aside-hidden'}>
            <ul className="aside__teams sidebar-teams">
              {user.teams.map(team => (
                <li key={`team-${team.id}`}>
                  <input
                    className="team__select"
                    id={`team-${team.id}`}
                    name="team"
                    type="radio"
                    defaultChecked={team.id === selectedTeam.id}
                  />
                  <label
                    htmlFor={`team-${team.id}`}
                    onClick={() => selectTeam(team)}
                  >
                    <div
                      className={
                        _.intersection(
                          team.channels.map(channel => channel.id),
                          Object.keys(alerts).map(key => parseInt(key, 10)),
                        ).length === 0
                          ? 'team'
                          : 'team team--unread'
                      }
                    >
                      {team.name.substr(0, 1)}
                    </div>
                  </label>
                </li>
              ))}
              <li
                key="new_team"
                className="team__new"
                onClick={this.createTeam}
              />
            </ul>
            <div className="aside__main sidebar-main">
              <div className="sidebar-main__team-container">
                <h1 className="sidebar-main__title">{selectedTeam.name}</h1>
                <div
                  className="sidebar-main__hide-sidebar"
                  onClick={hideSidebar}
                />
              </div>
              {/*{<div className="sidebar-main__users-count">{`users: ${users.length}`}</div>}*/}

              <div className="sidebar-main__user-container">
                <div className="sidebar-main__user" onClick={this.showProfile}>
                  {user.name}
                </div>
                {user.id === selectedTeam.owner.id && (
                  <div
                    className="sidebar-main__invite-button"
                    onClick={this.showInvites}
                  >
                    invites
                  </div>
                )}
              </div>
              <ul className="sidebar-main__channels channels">
                <div className="channels__title">
                  <h3>Channels</h3>
                  <div
                    className="channels__add-channel"
                    onClick={this.addChannel}
                  >
                    +
                  </div>
                </div>
                {user.channels
                  .filter(channel => channel.team.id === selectedTeam.id)
                  .map(channel => (
                    <li key={channel.id}>
                      <input
                        className="channel__select"
                        id={`channel-${channel.id}`}
                        name="channel"
                        type="radio"
                        defaultChecked={channel.id === selectedChannel.id}
                      />
                      <label
                        className="channel__item"
                        htmlFor={`channel-${channel.id}`}
                        onClick={() => selectChannel(channel)}
                      >
                        {channel.name}
                        <div
                          className={
                            alerts[channel.id] === 0 ||
                            !alerts[channel.id] ||
                            selectedChannel.id === channel.id
                              ? 'channel__message-count'
                              : 'channel__message-count channel__message-count--visible'
                          }
                        >
                          {alerts[channel.id] < 99 ? alerts[channel.id] : '!!'}
                        </div>
                      </label>
                    </li>
                  ))}
              </ul>
              <div
                className="sidebar-main__use-invite"
                onClick={this.useInvite}
              >
                Use Invite
              </div>
            </div>
          </aside>
        </Fragment>
      )
    );
  }
}

export default connect(
  state => ({
    isVisible: state.sidebar.isVisible,
  }),
  { showModal, hideSidebar },
)(Aside);
