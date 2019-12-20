import React from 'react';
import { Provider } from 'react-redux';

import Router from './routes';
import { Store } from './store';

function App() {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
}

export default App;
