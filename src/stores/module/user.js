import { defineStore } from "pinia";
import { userLogin, refreshUserInfo } from "@/api/user/user";

export const useUserStoreHook = defineStore("userInfo", {
  state() {
    return {
      username: "",
      accessToken: "",
      roles:''
    };
  },
  getters: {},
  actions: {

  storeUserLogin(data) {
      return userLogin(data).then((res) => {
        this.username = res.data.user.username;
        this.accessToken = res.data.token;
        this.roles = res.data.user.roles;
        return res;
      }).catch((error) => {
      this.$reset()
        sessionStorage.removeItem("userInfo")
        return Promise.reject(error)
    });
  },

  storeRefreshUserInfo(data) {
      if (this.username === "admin" && this.accessToken !== "") {
        refreshUserInfo({
          accessToken: this.accessToken,
        })
          .then((res) => {
            this.username = res.username;
            this.accessToken = res.accessToken;
            this.roles = res.roles;
          })
          .catch(() => {
            this.$reset();
            this.accessToken = "";
          });
      }
  }
},

  // 开启数据缓存
  persist: {
    key:"userInfo",
    storage: sessionStorage,
    paths: ["username", "accessToken", "roles"],
  },
})

export function useUserStore() {
  return useUserStoreHook();
}
