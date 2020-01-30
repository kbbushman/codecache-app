import React from 'react';
import { Header } from 'semantic-ui-react';
import Navbar from './Navbar';

const MainLayout = ({ children, currentUser, logout }) => (
  <>
    <Header as='header'>
      <Navbar currentUser={currentUser} logout={logout} />
    </Header>
    {children}
  </>
);

export default MainLayout;
