import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query userQuery {
    me {
      id
      name
      email
      avatar
      messageAlerts {
        channelId
      }
      invites {
        id
        token
      }
      teams {
        id
        name
        owner {
          id
        }
        channels {
          id
        }
      }
      channels {
        id
        name
        team {
          id
        }
      }
    }
  }
`;

export const USER_AVATAR_QUERY = gql`
  query userQuery {
    me {
      name
      avatar
    }
  }
`;

export const USERS_QUERY = gql`
  query usersQuery($teamId: Int!) {
    users(teamId: $teamId) {
      id
      name
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      name
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      token
      refreshToken
    }
  }
`;

export const UPDATE_USER_NAME_MUTATION = gql`
  mutation updateUserNameMutation($name: String!) {
    updateUserName(name: $name) {
      name
    }
  }
`;

export const UPDATE_USER_AVATAR_MUTATION = gql`
  mutation updateUserAvatarMutation($file: File!) {
    updateUserAvatar(file: $file) {
      avatar
    }
  }
`;

export const NEW_CHANNEL_SUBSCRIPTION = gql`
  subscription newChannelSubscription {
    newChannel {
      id
      name
      team {
        id
      }
    }
  }
`;

export const NEW_TEAM_SUBSCRIPTION = gql`
  subscription newTeamSubscription {
    newTeam {
      id
      name
      owner {
        id
      }
      channels {
        id
      }
    }
  }
`;

export const NEW_MESSAGE_ALERTS_SUBSCRIPTION = gql`
  subscription newMessageAlertsSubscription {
    newAlert {
      channelId
    }
  }
`;
