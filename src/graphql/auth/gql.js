import gql from 'graphql-tag';

export const VERIFY_TOKENS_MUTATION = gql`
  mutation verifyTokensMutation($token: String!, $refreshToken: String!) {
    verifyTokens(token: $token, refreshToken: $refreshToken) 
  }
`;