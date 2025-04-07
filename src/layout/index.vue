<template>
    <el-container>
        <el-header class="w-full">
            <Header />
        </el-header>
        <el-container>

            <el-aside width="200px">
                <el-menu :default-active="activeMenu" router>
                    <template v-for="item in menuList" :key="item.path">
                    <el-menu-item v-if="!item.children" :index="item.path">
                        <span>{{ item.meta.title }}</span>
                    </el-menu-item>
                    <el-submenu v-else index="item.path">
                       <template #title>
                        <span>{{ item.meta.title }}</span>
                       </template>
                    </el-submenu>
                    </template>
                </el-menu>
            </el-aside>

            <el-main>
                <el-breadcrumb :separator-icon="ArrowRight" class="mb-5">
                    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                    <el-breadcrumb-item></el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router'
import Header from './components/Header.vue'
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

console.log('route.getRoutes()',router.options.routes[0]);
// console.log(router.getRoutes());

// const menuList = router.getRoutes().filter((route) => {
//     return route.meta.isShow;
// })

const menuList = router.options.routes[0].children.filter((route) => {
    return route.meta.isShow;
})


const activeMenu = route.path;

</script>

<style lang="less" scoped>


</style>