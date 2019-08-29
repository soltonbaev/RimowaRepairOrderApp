import { SET_CUSTOMERS_LIST, SET_ORDERS_LIST } from "./actionTypes";

export const setCustomers = payload => ({
  type: SET_CUSTOMERS_LIST,
  payload
});

export const setOrders = payload => ({
  type: SET_ORDERS_LIST,
  payload
});
