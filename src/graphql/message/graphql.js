import { graphql } from 'react-apollo';
import {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  NEW_MESSAGE_SUBSCRIPTION,
} from './gql';

export const MessagesQuery = graphql(MESSAGES_QUERY, {
  name: 'messagesQuery',
  options: ({ channelId }) => ({
    variables: { channelId },
    fetchPolicy: 'network-only',
  }),
  props: ({ messagesQuery }) => {
    const { error, loading, messagesFeed } = messagesQuery;
    return {
      loading: loading,
      error: error,
      messages: messagesFeed ? messagesFeed.messages : null,
      subscribeToNewMessages: channelId => {
        return messagesQuery.subscribeToMore({
          document: NEW_MESSAGE_SUBSCRIPTION,
          variables: {
            channelId,
          },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
              return prev;
            }

            return {
              ...prev,
              messagesFeed: {
                ...prev.messagesFeed,
                messages: [
                  subscriptionData.data.newMessage,
                  ...prev.messagesFeed.messages,
                ],
              },
            };
          },
        });
      },
      fetchMoreMessages: ({ cursor, channelId }) => {
        if (messagesQuery.messagesFeed.hasNextPage) {
          return messagesQuery.fetchMore({
            variables: {
              channelId,
              cursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }

              const messages = [
                ...previousResult.messagesFeed.messages,
                ...fetchMoreResult.messagesFeed.messages,
              ];

              return {
                ...previousResult,
                messagesFeed: {
                  ...previousResult.messagesFeed,
                  messages,
                  hasNextPage: fetchMoreResult.messagesFeed.hasNextPage,
                },
              };
            },
          });
        }
      },
    };
  },
});

export const createMessageMutation = graphql(CREATE_MESSAGE_MUTATION, {
  props: ({ mutate }) => ({
    createMessage: ({ channelId, text, userId }, file) =>
      file
        ? mutate({
            variables: { input: { channelId, text, userId }, file },
          })
        : mutate({
            variables: { input: { channelId, text, userId } },
          }),
  }),
});
