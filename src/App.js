import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store";
import Routes from "./routes";

import "./App.css";
import { unauthenticate } from "./store/actions";
import { AUTH_INTERVAL } from "./config";

export default class App extends React.Component {
  componentDidMount() {
    function activityWatcher() {
      var secondsSinceLastActivity = 0;
      var maxInactivity = AUTH_INTERVAL;
      setInterval(function() {
        secondsSinceLastActivity++;
        if (secondsSinceLastActivity > maxInactivity) {
          store.dispatch(unauthenticate());
        }
      }, 1000);
      function activity() {
        if (
          window.location.pathname === "/repair-orders" ||
          window.location.pathname === "/"
        )
          secondsSinceLastActivity = 0;
      }
      var activityEvents = [
        "mousedown",
        "mousemove",
        "keydown",
        "scroll",
        "touchstart"
      ];
      activityEvents.forEach(function(eventName) {
        document.addEventListener(eventName, activity, true);
      });
    }
    activityWatcher();
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
