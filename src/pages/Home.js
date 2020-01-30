import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react';

const Home = () => {
  return (
    <Container textAlign='center' text>
    <Header
      as='h1'
      content='CodeCache'
      inverted
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '2em',
      }}
    />
    <Header
      as='h2'
      content='Save code, save time'
      inverted
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '.5em',
        marginBottom: '1.5em'
      }}
    />
    <Button as={Link} to='/register' primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
  )
};

export default Home;
