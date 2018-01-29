import gql from 'graphql-tag';

export const NOTIFICATIONS_QUERY = gql`
  query notificationsQuery($userId: Int!) {
    notifications(userId: $userId) {
      id
      text
    }
  }
`;

export const NEW_NOTIFICATION_SUBSCRIPTION = gql`
  subscription($userId: Int!) {
    newNotification(userId: $userId) {
      id
      text
    }
  }
`;
