<template>
    <div>
        <el-tree 
        ref="treeRef"
        :data="authList"
        show-checkbox
        :default-checked-keys="checkedNode"
        node-key="roleId"
        :props="{label:'name',children:'roleList'}"
        >
        </el-tree>
        <el-button type="primary" @click="onChangeAuth">修改权限</el-button>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import {useRoute} from 'vue-router'
import { getAuthList } from "@/api/admin/auth"

const route = useRoute()

const treeRef = ref()
let authList = ref([])

let checkedNode = ref([])
const { query } = route;
if (query.auth) {
    checkedNode.value = query.auth
}

onMounted(() => {
    getAuthList().then((res) => {
        authList.value = res.data
    })
})

const onChangeAuth = () => {
    // console.log(treeRef.value);
    // 获取选中的节点
    const selectedTreeNode = treeRef.value.getCheckedNodes();
    console.log(selectedTreeNode);
    // 获取key
    console.log(treeRef.value.getCheckedKeys());
}

</script>