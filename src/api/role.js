import { get } from '@/http/request'

export const getRoleList = async () => {
    return get("/m1/5601205-5279553-default/getRoleList");
}