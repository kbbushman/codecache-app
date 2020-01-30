import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Snippet from '../pages/Snippet';


export default ({ currentUser, handleLogin }) => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route path='/register' component={Register} />
    <Route path='/login' render={() => <Login handleLogin={handleLogin} />} />
    <Route path='/dashboard' render={() => 
      currentUser.isLoggedIn ? <Dashboard /> : <Redirect to='/login' />
    } />
    <Route path={'/categories/:category/:snippet'} render={() => 
      currentUser.isLoggedIn ? <Snippet /> : <Redirect to='/login' />
    } />
  </Switch>
);
