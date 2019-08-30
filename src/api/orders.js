import Base from "./base";

export default class Orders extends Base {
  addOrder(data) {
    return this.apiClient.post("addOrder", data);
  }
  list() {
    return this.apiClient.get("orders");
  }
}
