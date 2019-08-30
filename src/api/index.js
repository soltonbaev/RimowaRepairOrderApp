import ApiClient from "./client";

import Customers from "./customers";
import Orders from "./orders";

const apiClient = new ApiClient();

export default {
  customers: new Customers(apiClient),
  orders: new Orders(apiClient)
};
