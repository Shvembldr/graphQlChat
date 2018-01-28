import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import AddChannelModal from './add-channel-modal';
import AddUserToTeamModal from './add-user-to-team-modal';
import { CreateInvite } from '../../graphql/invite/graphql';

@CreateInvite
class Aside extends Component {
  static propTypes = {
    user: PropTypes.object,
    selectedTeam: PropTypes.object,
    selectedChannel: PropTypes.object,
    selectTeam: PropTypes.func,
    selectChannel: PropTypes.func,
    publicChannels: PropTypes.arrayOf(PropTypes.object),
    createInvite: PropTypes.func,
    addUserToTeam: PropTypes.func
  };

  state = {
    modalOpen: false,
  };

  openModal = () => {
    this.setState({
      modalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      invite: null,
    });
  };

  getInvite = async () => {
    const { data: { createInvite: { token }}} = await this.props.createInvite({
      teamId: this.props.selectedTeam.id,
    });
    this.setState({
      invite: token
    });
    setTimeout(() => {
      this.setState({
        invite: null
      })
    }, 5000)
  };

  render() {
    const {
      user,
      selectedTeam,
      selectedChannel,
      selectTeam,
      selectChannel,
    } = this.props;
    return (
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
                  <div className="team">a</div>
                </label>
              </li>
            ))}
            <li key="new_team" className="team__new"/>
          </ul>
          <div className="aside__main sidebar-main">
            <h1 className="sidebar-main__title">{selectedTeam.name}</h1>
            <div className="sidebar-main__user-container">
              <div className="sidebar-main__user">{user.name}</div>
              {user.id === selectedTeam.owner.id && (
                <div
                  className="sidebar-main__invite-button"
                  onClick={this.getInvite}
                >
                  invite
                </div>
              )}
              {this.state.invite && (
                <div className="sidebar-main__invite">{this.state.invite}</div>
              )}
            </div>
            <ul className="sidebar-main__channels channels">
              <div className="channels__title">
                <h3>Каналы</h3>
                <div className="channels__add-channel" onClick={this.openModal}>
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
          </div>
        </aside>
        <AddChannelModal
          open={this.state.modalOpen}
          teamId={selectedTeam.id}
          onClose={this.closeModal}
          currentUserId={user.id}
        />
      </Fragment>
    );
  }
}

export default Aside;
