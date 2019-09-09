import Base from "./base";

export default class Orders extends Base {
  addOrder(data) {
    return this.apiClient.post("addOrder", data);
  }
  list() {
    return this.apiClient.get("orders");
  }
  exportNew() {
    return this.apiClient.get("exportNew");
  }
  delete(uid) {
    return this.apiClient.delete(`deleteOrder/${uid}`);
  }
}
