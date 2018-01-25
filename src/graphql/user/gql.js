import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query userQuery {
    me {
      id
      name
      email
      teams {
        id
        name
      }
      channels {
        id
        name
        team {
          id
        }
      }
      messages {
        id
        text
      }
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation register($input: UserInput!) {
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