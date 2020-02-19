import axios from "axios";

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers['access-token'] = token;
      config.headers['uid'] = localStorage.getItem('uid');
      config.headers['client'] = localStorage.getItem('client');
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

axios.interceptors.response.use(
  data => {
    if (data.config.url.includes("auth/")) {
      updateLocalStorage(data.headers);
    }
    return data;
  },
  error => {
    return error;
  }
);

function updateLocalStorage(res) {
  localStorage.setItem("access-token", res["access-token"] ? res["access-token"] : '');
  localStorage.setItem("token-type", res["token-type"]? res["token-type"] : '');
  localStorage.setItem("client", res["client"] ? res["client"] : '');
  localStorage.setItem("uid", res["uid"] ? res["uid"] : '');
  localStorage.setItem("expiry", res["expiry"] ? res["expiry"] : '');
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
