import { graphql } from 'react-apollo';
import { CREATE_INVITE_MUTATION } from './gql';

export const CreateInvite = graphql(CREATE_INVITE_MUTATION, {
  props: ({ mutate }) => ({
    createInvite: ({ teamId }) => {
      return mutate({
        variables: { teamId },
      })
    }
  }),
});

