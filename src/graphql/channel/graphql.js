import { graphql } from 'react-apollo';
import {CREATE_PRIVATE_CHANNEL_MUTATION, PUBLIC_CHANNELS_QUERY} from './gql';

export const CreatePrivateChannel = graphql(
  CREATE_PRIVATE_CHANNEL_MUTATION,
  {
    props: ({ mutate }) => ({
      createPrivateChannel: ({ name, users, teamId }) =>
        mutate({
          variables: { input: { name, users, teamId } },
        }),
    }),
    // options: {
    //   update: (proxy, { data: { createPrivateChannel } }) => {
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
  },
);

export const getPublicChannels = graphql(PUBLIC_CHANNELS_QUERY, {
  props: ({ data }) => {
    const { error, loading, publicChannels } = data;
    return {
      loading: loading,
      error: error,
      publicChannels: publicChannels ? publicChannels : null,
    };
  },

});
