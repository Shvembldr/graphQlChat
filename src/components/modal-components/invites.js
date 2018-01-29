import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/loader';
import { hideModal } from '../../redux/actions/modal';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { CreateInvite, InviteQuery } from '../../graphql/invite/graphql';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
    copied: false,
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

  onClick = () => {
    this.setState({
      copied: true,
    });
    setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 500);
  };

  render() {
    const { invites } = this.props;
    return (
      invites && (
        <Fragment>
          <ul className="invites">
            {invites.map((invite, i) => (
              <CopyToClipboard key={invite.id} text={invite.token}>
                <li
                  className="invite"
                  onClick={this.onClick}
                >{`Click to copy Invite-${i + 1}`}</li>
              </CopyToClipboard>
            ))}
          </ul>
          <div
            className={
              !this.state.copied
                ? 'invite__copied'
                : 'invite__copied invite__copied--visible'
            }
          >
            Copied
          </div>
          <div className="form__button-container">
            {this.state.loading ? (
              <Loader />
            ) : (
              <button
                disabled={invites.length > 9}
                type="submit"
                className="form__submit"
                onClick={this.CreateInvite}
              >
                Add New Invite
              </button>
            )}
          </div>
          {invites.length > 9 && <div className="invite__limit">Invites are limited to 10</div>}
        </Fragment>
      )
    );
  }
}

export default connect(null, { hideModal })(Invites);
