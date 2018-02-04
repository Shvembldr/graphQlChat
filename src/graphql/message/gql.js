import gql from 'graphql-tag';

export const MESSAGES_QUERY = gql`
  query messagesQuery($cursor: String, $channelId: Int!) {
    messagesFeed(cursor: $cursor, channelId: $channelId) {
      messages {
        id
        text
        url
        fileType
        createdAt
        user {
          name
          avatar
        }
      }
      hasNextPage
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessageMutation($input: MessageInput!, $file: File) {
    createMessage(input: $input, file: $file) {
      id
      text
      createdAt
      url
      fileType
      user {
        name
        avatar
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
      url
      fileType
      user {
        name
        avatar
      }
    }
  }
`;


