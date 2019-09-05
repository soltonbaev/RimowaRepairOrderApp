import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import reducer from "./reducer";
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["repairOrders", "customers"]
};
const persistedReducer = persistReducer(persistConfig, reducer);
export default createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
