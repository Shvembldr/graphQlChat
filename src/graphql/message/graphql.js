import { graphql } from 'react-apollo';
import {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  NEW_MESSAGE_SUBSCRIPTION,
} from './gql';

export const MessagesQuery = graphql(MESSAGES_QUERY, {
  name: 'messages',
  options: ({ channelId }) => ({
    variables: { channelId },
    fetchPolicy: 'network-only',
  }),
  props: props => {
    const { error, loading, messages } = props.messages;
    return {
      loading: loading,
      error: error,
      messages: messages ? messages : null,
      subscribeToNewMessages: channelId => {
        return props.messages.subscribeToMore({
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
              messages: [...prev.messages, subscriptionData.data.newMessage],
            };
          },
        });
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

  // options: {
  //   update: (proxy, { data: { createMessage } }) => {
  //     const data = proxy.readQuery({
  //       query: MESSAGES_QUERY,
  //       variables: {
  //         channelId: createMessage.channel.id,
  //       },
  //     });
  //     data.messages.push(createMessage);
  //     proxy.writeQuery({
  //       query: MESSAGES_QUERY,
  //       variables: {
  //         channelId: createMessage.channel.id,
  //       },
  //       data,
  //     });
  //   },
  // },
});
