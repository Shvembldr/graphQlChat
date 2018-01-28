import gql from 'graphql-tag';

export const MESSAGES_QUERY = gql`
  query messagesQuery($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      createdAt
      user {
        name
      }
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessageMutation($input: MessageInput!) {
    createMessage(input: $input) {
      id
      text
      createdAt
      user {
        name
      }
      channel {
        id
      }
    }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription($channelId: Int!) {
    newMessage(channelId: $channelId) {
      id
      text
      createdAt
      user {
        name
      }
    }
  }
`;
