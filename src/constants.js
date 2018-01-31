export const socketUri =
  process.env.NODE_ENV === 'development'
    ? 'ws://localhost:4000/subscriptions'
    : 'wss://graphql-chat-server.herokuapp.com/subscriptions';

export const serverUriGraphQl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/graphql'
    : 'https://graphql-chat-server.herokuapp.com/graphql';

export const serverUri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/'
    : 'https://graphql-chat-server.herokuapp.com/';