import React from 'react';
import PropTypes from 'prop-types';

const Aside = ({
  user,
  selectedTeam,
  selectedChannel,
  selectTeam,
  selectChannel,
}) => {
  return (
    <aside className="aside">
      <ul className="aside__teams sidebar-teams">
        {user.teams.map(team => (
          <li key={team.id}>
            <input
              className="team__select"
              id={team.id}
              name="team"
              type="radio"
              defaultChecked={team.id === selectedTeam}
            />
            <label htmlFor={team.id} onClick={() => selectTeam(team.id)}>
              <div className="team">a</div>
            </label>
          </li>
        ))}
      </ul>
      <div className="aside__main sidebar-main">
        <h1 className="sidebar-main__title">{user.teams[0].name}</h1>
        <h3 className="sidebar-main__user">{user.name}</h3>
        <ul className="sidebar-main__channels">
          <h3>Каналы</h3>
          {user.channels
            .filter(channel => channel.team.id === selectedTeam)
            .map(channel => (
            <li key={channel.id}>
              <input
                className="channel__select"
                id={channel.id}
                name="channel"
                type="radio"
                defaultChecked={channel.id === selectedChannel}
              />
              <label
                className="channel"
                htmlFor={channel.id}
                onClick={() => selectChannel(channel.id)}
              >
                {channel.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

Aside.propTypes = {
  user: PropTypes.object,
  selectedTeam: PropTypes.number,
  selectedChannel: PropTypes.number,
  selectTeam: PropTypes.func,
  selectChannel: PropTypes.func,
};

export default Aside;
