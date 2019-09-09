import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { SET_ORDERS_LIST, GET_ORDERS, SET_CUSTOMERS_LIST } from "./actionTypes";
import { setCustomers, setOrders } from "./actions";
import api from "../api";

export default combineReducers({
  ordersLoading: (state = true, action) => {
    switch (action.type) {
      case GET_ORDERS: {
        return true;
      }
      case SET_ORDERS_LIST: {
        return false;
      }
      default: {
        return state;
      }
    }
  },
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
  return function(dispatch) {
    api.customers.list().then(data => {
      dispatch(setCustomers(data));
    });
  };
}

export function deleteOrders(uid) {
  return function(dispatch) {
    dispatch({ type: GET_ORDERS });
    api.orders.delete(uid).then(res => {
      dispatch(getOrders());
    });
  };
}

export function getOrders() {
  return function(dispatch) {
    dispatch({ type: GET_ORDERS });
    api.orders.list().then(data => {
      dispatch(setOrders(data));
    });
  };
}
