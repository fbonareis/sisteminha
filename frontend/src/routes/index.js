import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '~/pages/Dashboard';
import ForgotPassword from '~/pages/ForgotPassword';
import Login from '~/pages/Login';

import Route from './Route';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/forgot-password" component={ForgotPassword} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
