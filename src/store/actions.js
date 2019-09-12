import {
  SET_CUSTOMERS_LIST,
  SET_ORDERS_LIST,
  AUTH_FALSE,
  AUTH_TRUE
} from "./actionTypes";

export const setCustomers = payload => ({
  type: SET_CUSTOMERS_LIST,
  payload
});

export const setOrders = payload => ({
  type: SET_ORDERS_LIST,
  payload
});

export const authenticate = () => ({ type: AUTH_TRUE });
export const unauthenticate = () => ({ type: AUTH_FALSE });
