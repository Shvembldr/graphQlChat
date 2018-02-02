import { graphql } from 'react-apollo/index';
import { REMOVE_ALERTS_MUTATION } from './gql';
import { USER_QUERY } from '../user/gql';

export const RemoveAlertsMutation = graphql(REMOVE_ALERTS_MUTATION, {
  props: ({ mutate }) => ({
    removeAlerts: ({ channelId }) =>
      mutate({
        variables: { channelId },
      }),
  }),
  options: {
    update: (proxy, { data: { removeAlerts } }) => {
      const data = proxy.readQuery({
        query: USER_QUERY,
      });
      data.me = {
        ...data.me,
        messageAlerts: data.me.messageAlerts.filter(
          alert => alert.channelId !== removeAlerts,
        ),
      };
      proxy.writeQuery({
        query: USER_QUERY,
        data,
      });
    },
  },
});
