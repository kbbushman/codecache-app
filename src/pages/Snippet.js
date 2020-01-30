import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
} from 'semantic-ui-react';

const Snippet = ({ match }) => {
  

  return (
    <Container>
      <h1>Snippet Page</h1>
      <h2>{match.params.snippet}</h2>
    </Container>
  )
}

export default withRouter(Snippet);
