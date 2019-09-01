import superagent from "superagent";
import { API_URL } from "../config";

export default class ApiClient {
  get(url, params = {}) {
    return this._request({ url, method: "get", params });
  }

  post(url, body) {
    return this._request({ url, method: "post", body });
  }

  patch(url, body) {
    return this._request({ url, method: "patch", body });
  }

  put(url, body) {
    return this._request({ url, method: "put", body });
  }

  delete(url, body) {
    return this._request({ url, method: "delete", body });
  }

  _request({ url, method, params, body }) {
    const req = superagent[method](`${API_URL}/${url}`);

    if (params) req.query(params);
    if (body) req.send(body);

    return req.then(res => {
      if (!res.body) return res;
      if (!res.body.status) throw res.body.error;
      return res.body.data;
    });
  }
}
