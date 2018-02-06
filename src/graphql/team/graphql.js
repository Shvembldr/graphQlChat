import { graphql } from 'react-apollo';
import { USER_QUERY } from '../user/gql';
import {ADD_USER_TO_TEAM_MUTATION, CREATE_TEAM_MUTATION} from "./gql";

export const AddUserToTeam = graphql(ADD_USER_TO_TEAM_MUTATION, {
  props: ({ mutate }) => ({
    addUserToTeam: ({ userId, invite }) =>
      mutate({
        variables: { input: { userId, invite } },
      }),
  }),
  options: {
    update: (proxy, { data: { addUserToTeam } }) => {
      const data = proxy.readQuery({
        query: USER_QUERY,
      });

      data.me.teams.push(addUserToTeam);
      data.me.channels.push(...addUserToTeam.channels);
      proxy.writeQuery({
        query: USER_QUERY,
        data,
      });
    },
  },
});

export const CreateTeamMutation = graphql(CREATE_TEAM_MUTATION, {
  props: ({ mutate }) => ({
    createTeam: ({ name, owner, members }) =>
      mutate({
        variables: { input: { name, owner, members}},
      }),
  }),
  options: {
    update: (proxy, { data: { createTeam } }) => {
      const data = proxy.readQuery({
        query: USER_QUERY,
      });
      data.me.teams.push(createTeam);
      proxy.writeQuery({
        query: USER_QUERY,
        data,
      });
    },
  },
});