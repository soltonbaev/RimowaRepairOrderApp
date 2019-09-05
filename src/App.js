import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store";
import Routes from "./routes";

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}
