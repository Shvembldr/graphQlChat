import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query userQuery {
    me {
      id
      name
      email
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
          name
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
