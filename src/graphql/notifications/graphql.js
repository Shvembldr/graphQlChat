import { graphql } from 'react-apollo';
import {
  NEW_NOTIFICATION_SUBSCRIPTION,
  NOTIFICATIONS_QUERY,
} from '../notifications/gql';

export const NotificationsQuery = graphql(NOTIFICATIONS_QUERY, {
  name: 'notifications',
  options: ({ userId }) => ({
    variables: { userId },
  }),
  props: props => {
    const { error, loading, notifications } = props.notifications;
    return {
      loading: loading,
      error: error,
      notifications: notifications ? notifications : null,
      subscribeToNewNotifications: userId => {
        return props.notifications.subscribeToMore({
          document: NEW_NOTIFICATION_SUBSCRIPTION,
          variables: {
            userId,
          },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
              return prev;
            }
            return {
              ...prev,
              notifications: [
                ...prev.notifications,
                subscriptionData.data.newNotification,
              ],
            };
          },
        });
      },
    };
  },
});
