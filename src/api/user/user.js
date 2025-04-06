import {post,get} from '@/http/request'

// 用户登录
export const userLogin = async (data) => {
  try {
    const res = await post("/m1/5601205-5279553-default/user/login", data);
    console.log("后端返回的数据:", res); // 确保你访问的是返回数据中的 `data` 部分,已调式通
    return res; // 返回数据中的实际内容
  } catch (error) {
    console.error("请求失败:", error);
    throw error;
  }
};


// 用户注册
export const userRegister = async (data) => {
    return await post("/m1/5601205-5279553-default/register", data);
}

// 用户刷新
export const refreshUserInfo = async (data) => {
  return post("/getUserInfo", data);
};

// 获取所有的用户
export const getUserList = () => {
  return get("/m1/5601205-5279553-default/getUserList");
}

