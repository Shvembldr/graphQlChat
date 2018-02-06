import {graphql} from "react-apollo/index";
import {VERIFY_TOKENS_MUTATION} from "./gql";

export const VerifyTokens = graphql(VERIFY_TOKENS_MUTATION, {
  props: ({ mutate }) => ({
    verifyTokens: ({ token, refreshToken }) => {
      return mutate({
        variables: { token, refreshToken },
      });
    },
  }),
});