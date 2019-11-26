import React from "react";

import Router from "./routes";

import { Provider } from "react-redux";
import { Store } from "./store";

function App() {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
}

export default App;
