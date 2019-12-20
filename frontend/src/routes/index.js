import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '~/pages/Dashboard';
import Login from '~/pages/Login';

import Route from './Route';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
