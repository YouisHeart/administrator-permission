import axios from "axios";
import { ElMessage } from "element-plus";
import { getMessageInfo } from "./status";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 5000,
});

// 下面还没有配置请求头信息(请求时携带token)
service.interceptors.request.use(
  (config) => {
    // 这里可以全局添加token全局请求头
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


service.interceptors.response.use((response) => {
  if (response.status === 200) {
      return response.data;
    }
    ElMessage({
      message: getMessageInfo(response.status),
      type: "success",
    });
    return Promise.reject(new Error("请求失败"));
  },(error) => {
    const { response } = error;
    if (response) {
      ElMessage({
        message: getMessageInfo(response.status),
        type: "error",
      });
      return Promise.reject(error);
    }
   
  }
);

export function get(url, params) {
  return service({ url, method: "GET", params });
}

export function post(url, data) {
  return service({ url, method: "POST", data });
}

export function put(url, data) {
  return service({ url, method: "PUT", data });
}

export function del(url, params) {
  return service({ url, method: "DELETE", params });
}
