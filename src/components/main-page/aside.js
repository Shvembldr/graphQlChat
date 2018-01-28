import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { showModal } from '../../redux/actions/modal';
import AddChannel from '../modal-components/add-channel';
import CreateTeam from '../modal-components/create-team';
import Invites from '../modal-components/invites';
import UseInvite from '../modal-components/use-invite';
import { UsersQuery } from '../../graphql/user/graphql';

@UsersQuery
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

  render() {
    const {
      user,
      users,
      selectedTeam,
      selectedChannel,
      selectTeam,
      selectChannel,
    } = this.props;
    return (
      users && (
        <Fragment>
          <aside className="aside">
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
                    <div className="team">{team.name.substr(0, 1)}</div>
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
                <p className="sidebar-main__members">{users.length} members</p>
              </div>
              <div className="sidebar-main__user-container">
                <div className="sidebar-main__user">{user.name}</div>
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
                  <h3>Каналы</h3>
                  <div
                    className="channels__add-channel"
                    onClick={this.addChannel}
                  >
                    +
                  </div>
                </div>
                {selectedTeam.channels
                  .concat(
                    user.channels.filter(
                      channel => channel.team.id === selectedTeam.id,
                    ),
                  )
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

export default connect(null, { showModal })(Aside);
