import { graphql } from 'react-apollo';
import { CREATE_INVITE_MUTATION, INVITES_QUERY } from './gql';
import { USER_QUERY } from '../user/gql';

export const CreateInvite = graphql(CREATE_INVITE_MUTATION, {
  props: ({ mutate }) => ({
    createInvite: ({ teamId }) => {
      return mutate({
        variables: { teamId },
      });
    },
  }),
  options: {
    update: (proxy, { data: { createInvite } }) => {
      const data = proxy.readQuery({
        query: USER_QUERY,
      });
      data.me.invites.push(createInvite);
      proxy.writeQuery({
        query: USER_QUERY,
        data,
      });
    },
  },
});

export const InviteQuery = graphql(INVITES_QUERY, {
  props: ({ data }) => {
    const { error, loading, me: { invites } } = data;
    return {
      loading: loading,
      error: error,
      invites: invites ? invites : null,
    };
  },
});
