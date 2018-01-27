import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AddChannelModal from './add-channel-modal';

class Aside extends Component {
  static propTypes = {
    user: PropTypes.object,
    selectedTeam: PropTypes.object,
    selectedChannel: PropTypes.object,
    selectTeam: PropTypes.func,
    selectChannel: PropTypes.func,
    publicChannels: PropTypes.arrayOf(PropTypes.object),
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
    });
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
              <li key={team.id}>
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
          </ul>
          <div className="aside__main sidebar-main">
            <h1 className="sidebar-main__title">{selectedTeam.name}</h1>
            <h3 className="sidebar-main__user">{user.name}</h3>
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
