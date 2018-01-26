import gql from 'graphql-tag';

export const CREATE_PUBLIC_CHANNEL_MUTATION = gql`
  mutation createPublicChannelMutation($input: PublicChannelInput!){
    createPublicChannel(input: $input) {
      id
      name
      isPublic
    }
  }
`;

export const CREATE_PRIVATE_CHANNEL_MUTATION = gql`
  mutation createPrivateChannelMutation($input: PrivateChannelInput!){
    createPrivateChannel(input: $input) {
      id
      name
      isPublic
    }
  }
`;
