import gql from 'graphql-tag';

export const CREATE_INVITE_MUTATION = gql`
  mutation createInviteMutation($teamId: Int!) {
    createInvite(teamId: $teamId) {
      token
    }
  }
`;




