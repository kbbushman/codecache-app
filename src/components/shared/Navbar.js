import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {
  Segment,
  Button,
  Container,
  Menu,
  Divider,
  Icon,
} from 'semantic-ui-react';


const Navbar = ({ currentUser, logout }) => {
  return (
    <Segment textAlign='center' style={{maxWidth: 780, padding: '.7em 0em .4em', margin: '0 auto'}} vertical>
      <Menu as='nav' inverted secondary size='large'>
        <Container>
          <Menu.Item as={Link} to='/' header style={{fontSize: 20, position: 'absolute', bottom: 25}}>
            CodeCache
          </Menu.Item>
          {currentUser.isLoggedIn && (
            <Menu.Item position='right'>
              {/* <Button as={NavLink} to='/dashboard' basic compact color='teal' style={{fontSize: 15, marginRight: '.5em'}}>
                Dashboard
              </Button>
              <Button as={NavLink} to='/dashboard' basic compact color='pink' style={{fontSize: 15, marginRight: '.5em'}}>
                +
              </Button>
              <Button onClick={logout} basic compact color='grey' style={{fontSize: 15}}>
                Logout
              </Button> */}
              <Link to='/dashboard'>
                <Icon name='home' color='blue' style={{fontSize: 25, marginRight: '.5em', cursor: 'pointer'}} />
              </Link>
              <Link to='/new-snippet'>
                <Icon name='plus' color='blue' style={{fontSize: 25, marginRight: '.5em', cursor: 'pointer'}} />
              </Link>
              <Icon name='sign-out' color='blue' onClick={logout} style={{fontSize: 25, cursor: 'pointer'}} />
            </Menu.Item>
          )}
          {!currentUser.isLoggedIn && (
            <Menu.Item position='right'>
              <Button as={NavLink} to='/login' inverted>
                Log in
              </Button>
              <Button as={NavLink} to='/register' inverted style={{ marginLeft: '0.5em' }}>
                Register
              </Button>
            </Menu.Item>
          )}
        </Container>
      </Menu>
      <Divider />
    </Segment>
  )
};

export default Navbar;
