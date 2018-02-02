import gql from "graphql-tag";

export const REMOVE_ALERTS_MUTATION = gql`
  mutation removeAlertsMutation($channelId: Int!) {
    removeAlerts(channelId: $channelId)
  }
`;