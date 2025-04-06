import { get } from "@/http/request";

export const getAuthList = async (data) => {
  return get("/m1/5601205-5279553-default/getAuthList", data);
};
