import ApiClient from "./client";

import Customers from "./customers";

const apiClient = new ApiClient();

export default {
  customers: new Customers(apiClient)
};
