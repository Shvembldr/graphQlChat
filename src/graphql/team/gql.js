import gql from 'graphql-tag';

export const ADD_USER_TO_TEAM_MUTATION = gql`
  mutation addUserToTeamMutation($input: AddUserInput!) {
    addUserToTeam(input: $input) {
      id
      name
      owner {
        id
      }
      channels {
        id
        name
      }
    }
  }
`;

export const CREATE_TEAM_MUTATION = gql`
  mutation createTeamMutation($input: TeamInput!) {
    createTeam(input: $input) {
      id
      name
      owner {
        id
      }
      channels {
        id
        name
      }
    }
  }
`;