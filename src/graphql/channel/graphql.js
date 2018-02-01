import { graphql } from 'react-apollo';
import { CREATE_PRIVATE_CHANNEL_MUTATION } from './gql';

export const CreatePrivateChannel = graphql(CREATE_PRIVATE_CHANNEL_MUTATION, {
  props: ({ mutate }) => ({
    createPrivateChannel: ({ name, users, teamId }) =>
      mutate({
        variables: { input: { name, users, teamId } },
      }),
  }),
  // options: {
  //   update: (proxy, { data: { createPrivateChannel } }) => {
  //     const data = proxy.readQuery({
  //       query: USER_QUERY,
  //     });
  //     data.me.channels.push(createPrivateChannel);
  //     proxy.writeQuery({
  //       query: USER_QUERY,
  //       data,
  //     });
  //   },
  // },
});
