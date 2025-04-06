<template>
    <el-container>
        <el-header class="w-full">
            <Header />
        </el-header>
        <el-container>

            <el-aside width="200px">
                <el-menu :default-active="activeMenu" router>
                    <!-- <el-menu-item index="/">项目介绍</el-menu-item>
                    <el-menu-item index="/user">用户列表</el-menu-item>
                    <el-menu-item index="/role">角色管理</el-menu-item>
                    <el-menu-item index="/auth">权限列表</el-menu-item> -->
                    <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">{{ item.meta.title }}</el-menu-item>
                </el-menu>
            </el-aside>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router'
import Header from './components/Header.vue'

const router = useRouter()
const route = useRoute()

const menuList = router.getRoutes().filter((route) => {
    return route.meta.isShow;
})


const activeMenu = route.path;

</script>

<style lang="less" scoped>


</style>