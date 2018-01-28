import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/loader';
import { hideModal } from '../../redux/actions/modal';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import {CreateInvite, InviteQuery} from '../../graphql/invite/graphql';

@compose(CreateInvite, InviteQuery)
class Invites extends Component {
  static propTypes = {
    hideModal: PropTypes.func,
    createInvite: PropTypes.func,
    currentUserId: PropTypes.number,
    invites: PropTypes.arrayOf(PropTypes.object),
    selectedTeam: PropTypes.object,
  };

  state = {
    loading: false,
  };

  CreateInvite = async () => {
    this.setState({
      loading: true,
    });
    await this.props.createInvite({
      teamId: this.props.selectedTeam.id,
    });
    this.setState({
      loading: false,
    });
  };

  render() {
    const { invites } = this.props;
    return (invites &&
      <Fragment>
        <ul className="invites">
          {invites.map(invite => (<li key={invite.id} className="invite">
            {invite.token}
          </li>))}

        </ul>
        <div className="form__button-container">
          {this.state.loading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="form__submit"
              onClick={this.CreateInvite}
            >
              Add New Invite
            </button>
          )}
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { hideModal })(Invites);
