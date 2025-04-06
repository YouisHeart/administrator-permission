<template>
    <div>
        <el-form label-width="100px">
            <el-form-item>
                <el-button type="primary" @click="onAddRole">新增角色</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="roleList" v-loading="loading" style="width: 100%">
            <el-table-column prop="roleId" label="id" width="180px"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="180px"></el-table-column>
            <el-table-column  label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="onChangeAuth(scope.row)">修改权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {useRouter} from 'vue-router'
import { getRoleList } from '@/api/role'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

const loading = ref(true)

const roleList = ref([])

// 新增角色
const onAddRole = () => {
    ElMessageBox.prompt('请输入角色名称', '添加角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(({value,action}) => {
        if (value) {
            roleList.value.push({
                roleId: roleList.value.length + 1,
                roleName: value,
                authority: []
            });
            ElMessage({
                type: 'success',
                message: `${value}添加成功`,
            })
        }
    })
        .catch((err) => {
            ElMessage({
            type: 'info',
            message:'已取消添加'
        })
    })
}

onMounted(() => {
    getRoleList().then(res => {
        roleList.value = res.data
        loading.value = false;
    })
})

const onChangeAuth = (row) => {
    router.push({
        path: 'auth',
        query: {
            id: row.roleId,
            auth:row.authority
        }
    })
}

</script>