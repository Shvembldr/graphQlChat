import gql from 'graphql-tag';

export const CREATE_INVITE_MUTATION = gql`
  mutation createInviteMutation($teamId: Int!) {
    createInvite(teamId: $teamId) {
      id
      token
    }
  }
`;

export const INVITES_QUERY = gql`
  query userQuery {
    me {
      invites {
        id
        token
      }
    }
  }
`;




