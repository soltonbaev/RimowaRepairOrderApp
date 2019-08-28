import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
