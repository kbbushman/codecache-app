import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import DashboardContainer from '../pages/Dashboard';


export default ({ currentUser, handleLogin }) => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route path='/register' component={Register} />
    <Route path='/login' render={() => <Login handleLogin={handleLogin} />} />
    <Route path='/dashboard' render={() => 
      currentUser.isLoggedIn ? <DashboardContainer /> : <Redirect to='/login' />
    } />
  </Switch>
);
