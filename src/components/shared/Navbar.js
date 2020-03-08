import React from 'react'
import { Link } from 'react-router-dom';
import {
  Segment,
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
              <Link to='/dashboard'>
                <Icon name='home' title='Dashboard' color='blue' style={{fontSize: 22, marginRight: '.5em', cursor: 'pointer'}} />
              </Link>
              <Link to='/new-snippet'>
                <Icon name='plus' title='New Snippet' color='blue' style={{fontSize: 22, marginRight: '.5em', cursor: 'pointer'}} />
              </Link>
              <Icon name='sign-out' title='Log Out' color='blue' onClick={logout} style={{fontSize: 22, cursor: 'pointer'}} />
            </Menu.Item>
          )}
          {!currentUser.isLoggedIn && (
            <Menu.Item position='right'>
              <Link to='/login'>
                <Icon name='sign-in' title='Login' color='blue' style={{fontSize: 26, marginRight: '.5em', cursor: 'pointer'}} />
              </Link>
              <Link to='/register'>
                <Icon name='signup' title='register' color='blue' style={{fontSize: 22, marginRight: '.5em', cursor: 'pointer'}} />
              </Link>
            </Menu.Item>
          )}
        </Container>
      </Menu>
      <Divider />
    </Segment>
  )
};

export default Navbar;
