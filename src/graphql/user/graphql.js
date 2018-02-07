import { graphql } from 'react-apollo';
import {
  LOGIN_MUTATION,
  NEW_CHANNEL_SUBSCRIPTION,
  NEW_MESSAGE_ALERTS_SUBSCRIPTION,
  NEW_TEAM_SUBSCRIPTION,
  REGISTER_USER_MUTATION,
  UPDATE_USER_AVATAR_MUTATION,
  UPDATE_USER_NAME_MUTATION,
  USER_AVATAR_QUERY,
  USER_QUERY,
  USERS_QUERY,
} from './gql';

export const RegisterUserMutation = graphql(REGISTER_USER_MUTATION, {
  props: ({ mutate }) => ({
    createUser: ({ name, email, password, invite }) =>
      mutate({
        variables: { input: { name, email, password, invite } },
      }),
  }),
});

export const LoginMutation = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    login: ({ email, password }) =>
      mutate({
        variables: { input: { email, password } },
      }),
  }),
});

export const UserQuery = graphql(USER_QUERY, {
  name: 'user',
  props: props => {
    const { error, loading, me } = props.user;
    return {
      loading: loading,
      error: error,
      user: me ? me : null,
      subscribeToNewChannels: () => {
        return props.user.subscribeToMore({
          document: NEW_CHANNEL_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
              return prev;
            }
            return {
              ...prev,
              me: {
                ...prev.me,
                channels: [
                  ...prev.me.channels,
                  subscriptionData.data.newChannel,
                ],
              },
            };
          },
        });
      },
      subscribeToNewTeams: () => {
        return props.user.subscribeToMore({
          document: NEW_TEAM_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
              return prev;
            }
            return {
              ...prev,
              me: {
                ...prev.me,
                teams: [...prev.me.teams, subscriptionData.data.newTeam],
              },
            };
          },
        });
      },
      subscribeToNewMessageAlerts: () => {
        return props.user.subscribeToMore({
          document: NEW_MESSAGE_ALERTS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
              return prev;
            }
            return {
              ...prev,
              me: {
                ...prev.me,
                messageAlerts: [
                  ...prev.me.messageAlerts,
                  subscriptionData.data.newAlert,
                ],
              },
            };
          },
        });
      },
    };
  },
});

export const UserAvatarQuery = graphql(USER_AVATAR_QUERY, {
  props: ({ data }) => {
    const { error, loading, me } = data;
    return {
      loading: loading,
      error: error,
      user: me ? me : null,
    };
  },
});

export const UsersQuery = graphql(USERS_QUERY, {
  options: ({ selectedTeam }) => ({
    variables: { teamId: selectedTeam.id },
  }),
  props: ({ data }) => {
    const { error, loading, users } = data;
    return {
      loading: loading,
      error: error,
      users: users ? users : null,
    };
  },
});

export const UpdateUserNameMutation = graphql(UPDATE_USER_NAME_MUTATION, {
  props: ({ mutate }) => ({
    updateUserName: ({ name }) =>
      mutate({
        variables: { name },
      }),
  }),
  options: {
    update: (proxy, { data: { updateUserName } }) => {
      const data = proxy.readQuery({
        query: USER_QUERY,
      });
      data.me = {
        ...data.me,
        name: updateUserName.name,
      };
      proxy.writeQuery({
        query: USER_QUERY,
        data,
      });
    },
  },
});

export const UpdateUserAvatarMutation = graphql(UPDATE_USER_AVATAR_MUTATION, {
  props: ({ mutate }) => ({
    updateUserAvatar: ({ file }) =>
      mutate({
        variables: { file },
      }),
  }),
  options: {
    update: (proxy, { data: { updateUserAvatar } }) => {
      const data = proxy.readQuery({
        query: USER_QUERY,
      });
      data.me = {
        ...data.me,
        avatar: updateUserAvatar.avatar,
      };
      proxy.writeQuery({
        query: USER_QUERY,
        data,
      });
    },
  },
});
