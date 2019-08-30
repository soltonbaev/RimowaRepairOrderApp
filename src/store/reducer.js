import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { SET_ORDERS_LIST, SET_CUSTOMERS_LIST } from "./actionTypes";
import { setCustomers, setOrders } from "./actions";
import api from "../api";

export default combineReducers({
  customers: (state = [], action) => {
    switch (action.type) {
      case SET_CUSTOMERS_LIST: {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  },
  repairOrders: (state = [], action) => {
    switch (action.type) {
      case SET_ORDERS_LIST: {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  },
  form: formReducer
});

export function getCustomers() {
  return function(dispatch, getState) {
    api.customers.list().then(data => {
      dispatch(setCustomers(data));
    });
  };
}

export function getOrders() {
  return function(dispatch, getState) {
    api.orders.list().then(data => {
      dispatch(setOrders(data));
    });
  };
}
