import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { GET_CUSTOMERS, SET_CUSTOMERS_LIST } from "./actionTypes";
import { setCustomers } from "./actions";
import api from "../api";

export default combineReducers({
  customers: (state = [], action) => {
    switch (action.type) {
      // case GET_CUSTOMERS: {
      //   return getCustomers;
      // }
      case SET_CUSTOMERS_LIST: {
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
