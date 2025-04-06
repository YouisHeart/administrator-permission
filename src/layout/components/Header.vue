<template>
    <div class="h-24 flex justify-between align-center gap-4 text-center leading-14 py-4">
        <div class="flex">
            <img src="../../assets/images/chenxi_logo.png" class="w-12 h-12 overflow-hidden">
        </div>
    
        <div class="flex space-x-4">
            <div class="mr-27">
            <el-popover
            width="200" 
            trigger="hover"
            placement="bottom"
                >
                <template #reference>
                    <span>{{ userName }}</span>
                </template>
                <template #default>
                    <div class="flex justify-center items-center flex-col">
                            <p class="w-full h-12 flex justify-center items-center gap-1 hover:bg-gray-300 rounded-xl cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <span>个人中心</span>
                            </p>
                            <p class="w-full h-12 flex justify-center items-center gap-1 hover:bg-gray-300 rounded-xl cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                     <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                <span>投稿管理</span>
                            </p>
                            <p class="w-full h-12 flex justify-center items-center gap-1 hover:bg-gray-300 rounded-xl cursor-pointer">
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                               </svg>

                                <span>推荐服务</span>
                            </p>
                            <el-divider />
                            <p class="w-full h-12 flex justify-center items-center gap-1 cursor-pointer" @click="logout" >
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                                <span>退出登录</span>
                            </p>
                    </div>
                </template>
             </el-popover>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";
import {useUserStoreHook} from "@/stores/module/user";

const router = useRouter();

const userStore = useUserStoreHook();
const userName = userStore.username;

const logout = () => {
    sessionStorage.removeItem('userInfo');
    userStore.$reset()
    router.push('/login');
}
</script>

<style lang="less" scoped>

</style>