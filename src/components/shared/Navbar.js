import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {
  Segment,
  Button,
  Container,
  Menu,
  Divider,
} from 'semantic-ui-react';


const Navbar = ({ currentUser, logout }) => {
  return (
    <Segment textAlign='center' style={{ padding: '.7em 0em .4em' }} vertical>
      <Menu as='nav' inverted secondary size='large'>
        <Container>
          <Menu.Item as={Link} to='/' header style={{fontSize: 20, position: 'absolute', bottom: 25}}>
            CodeCache
          </Menu.Item>
          {currentUser.isLoggedIn && (
            <Menu.Item position='right'>
              <Button as={NavLink} to='/dashboard' inverted>
                Dashboard
              </Button>
              <Button inverted style={{ marginLeft: '0.5em' }} onClick={logout}>
                Logout
              </Button>
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
