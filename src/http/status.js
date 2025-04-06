
export const getMessageInfo = (status)=> {
  let msg = "";
  switch (status) {
    case 400:
      msg = "请求错误";
      break;
    case 401:
      msg = "未授权，请登录";
      break;
    case 403:
      msg = "拒绝访问";
      break;
    case 404:
      msg = "请求出错";
      break;
    case 408:
      msg = "请求超时";
      break;
    case 500:
      msg = "服务器内部错误";
      break;
    case 501:
      msg = "服务未实现";
      break;
    case 502:
      msg = "网关错误";
      break;
    case 503:
      msg = "服务不可用";
      break;
    case 504:
      msg = "网关超时";
      break;
    case 505:
      msg = "HTTP版本不受支持";
      break;
  }
  return msg; // return the message
};
