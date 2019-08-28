import Base from "./base";

export default class Customers extends Base {
  list() {
    return this.apiClient.get("getCustomers");
  }
}
