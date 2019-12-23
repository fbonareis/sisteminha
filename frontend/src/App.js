import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';

import { history } from '~/services';

import Routes from './routes';
import { store, persistor } from './store';

import './config/ReactotronConfig';

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Routes />
      </Router>
    </PersistGate>
  </Provider>
);
