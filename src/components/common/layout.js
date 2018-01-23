import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Segment} from "semantic-ui-react";

const Layout = props => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column computer={2} mobile={6} tablet={9}>
          <Segment>asdf</Segment>
        </Grid.Column>
        <Grid.Column width={14}>
          <Segment>Content</Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Column computer={9} mobile={6} tablet={3}>
        <Segment>Content</Segment>
      </Grid.Column>
    </Grid>
  );
};

Layout.propTypes = {
  
};

export default Layout;
