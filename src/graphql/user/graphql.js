import {graphql} from "react-apollo";
import {LOGIN_MUTATION, REGISTER_USER_MUTATION, USER_QUERY} from "./gql";

export const RegisterUserMutation = graphql(REGISTER_USER_MUTATION, {
  props: ({ mutate }) => ({
    createUser: ({ name, email, password }) =>
      mutate({
        variables: { input: { name, email, password }},
      }),
  }),
});

export const LoginMutation = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    login: ({ email, password }) =>
      mutate({
        variables: { input: { email, password }},
      }),
  }),
});

export const UserQuery = graphql(USER_QUERY, {
  props: ({ data }) => {
    const { error, loading, me } = data;
    return {
      loading: loading,
      error: error,
      user: me ? me : null,
    };
  },
});