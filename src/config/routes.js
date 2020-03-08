import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Snippet from '../pages/Snippet';
import NewSnippet from '../pages/NewSnippet';


export default ({ currentUser, handleLogin }) => (
  <Switch>
    <Route exact path='/' render={() => 
      !currentUser.isLoggedIn ? <HomePage /> : <Redirect to='/dashboard' />
    } />
    <Route path='/register' render={() => 
      !currentUser.isLoggedIn ? <Register /> : <Redirect to='/dashboard' />
    } />
    <Route path='/login' render={() =>
      !currentUser.isLoggedIn ? <Login handleLogin={handleLogin} /> : <Redirect to='/dashboard' />
    } />
    <Route path='/dashboard' render={() => 
      currentUser.isLoggedIn ? <Dashboard /> : <Redirect to='/login' />
    } />
    <Route path='/new-snippet' render={() => 
      currentUser.isLoggedIn ? <NewSnippet /> : <Redirect to='/login' />
    } />
    <Route path={'/:category/:snippet'} render={() => 
      currentUser.isLoggedIn ? <Snippet /> : <Redirect to='/login' />
    } />
  </Switch>
);
