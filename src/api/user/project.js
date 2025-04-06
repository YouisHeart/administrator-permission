import { get,post } from "@/http/request";

// 用户列表
export const getProjectList = async (data) => {
    const res = await post("/m1/5601205-5279553-default/projects", data);
    return res; 
  }

