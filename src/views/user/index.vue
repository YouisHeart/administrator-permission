<template>
    <div>
        <el-form :inline="true" class="flex gap-x-4 justify-end" :model="searchData">
            <el-form-item label="姓名" prop="nickName">
                <el-input v-model="searchData.nickName" placeholder="请输入姓名"></el-input>
            </el-form-item>
             <el-form-item label="角色" prop="role" style="width:160px">
                <el-select v-model="searchData.role" placeholder="请选择角色" size="large">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option
                    v-for="item in roleWidthAuthList"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table 
        :data="dataList" 
        style="width: 100%" 
        border
        :header-cell-style="{'background': '#d8fce9', 'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        v-loading="loading"
        >
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="nickName" label="姓名"></el-table-column>
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-tag 
                    v-for="item in scope.row.role" 
                    :key="item.role"
                    type="primary" 
                    size="small"
                    style="margin-right: 5px;"
                    >{{ item.roleName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
                    </template> 
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <Pagination
        :total="searchData.dataCount"
        v-model:page="searchData.currentPage"
        v-model:limit="searchData.pageSize"
        @pagination="handlePagination"
        >
        </Pagination>

        <!--  点击编辑之后的弹出(默认隐藏) -->
        <el-dialog v-model="editShow" title="编辑用户信息" width="30%">
            <el-form :model="editUser">
                <el-form-item label="用户昵称" label-width="120px">
                    <el-input v-model="editUser.nickName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" label-width="120px">
                    <el-select v-model="editUser.role" multiple placeholder="请选择角色" size="large">
                         <el-option
                            v-for="item in roleWidthAuthList"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId"
                            ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span>
                    <el-button @click="editShow = false">取 消</el-button>
                    <el-button @click="ensureEditUser">确 定</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch, computed } from 'vue'
import { getUserList } from '@/api/user/user' 
import { getRoleList } from '@/api/role'
import Pagination from '@/components/pagination.vue'

const loading=ref(true)

// 原始用户列表（用于搜索恢复）
let originalUserList = ref([])
let userList = ref([])

const fetchUserList = () => {
    getUserList().then(res => {
        originalUserList.value = res.data;
        userList.value = res.data;
        searchData.dataCount = res.data.length;
    })
}

// 用户分页列表
let searchData = reactive({
    nickName: '',
    role: 0,
    currentPage: 1,
    dataCount: 0,
    pageSize: 5
})

// 计算当前页数据
let dataList = computed(() => {
    return userList.value.slice(
        (searchData.currentPage - 1) * searchData.pageSize,
        searchData.currentPage * searchData.pageSize
    )
})

const handlePagination = ({ page, limit }) => {
    searchData.currentPage = page;
    searchData.pageSize = limit;
}

// 权限列表
let roleWidthAuthList = ref([])
const fetchRoleList = () => {
    getRoleList().then(res => {
        roleWidthAuthList.value = res.data;
    })
}

// 搜索功能
const onSearch = () => {
    let filteredList = originalUserList.value;
    if (searchData.nickName) {
        filteredList = filteredList.filter(item => item.nickName.includes(searchData.nickName));
    }
    if (searchData.role && searchData.role !== 0) {
        filteredList = filteredList.filter(item => item.role.some(r => r.role === searchData.role));
    }
    userList.value = filteredList;
    searchData.currentPage = 1;
    searchData.dataCount = userList.value.length;
}

// 编辑功能
let editShow = ref(false);
let editUser = reactive({ id: 0, nickName: '', role: [] });

const handleEditUser = (row) => {
    editShow.value = true;
    Object.assign(editUser, {
        id: row.id,
        nickName: row.nickName,
        role: row.role.map(r => r.role)
    });
}

const ensureEditUser = () => {
    editShow.value = false;
    let user = userList.value.find(item => item.id === editUser.id);
    if (user) {
        user.nickName = editUser.nickName;
        user.role = editUser.role.map(roleId => {
            let roleObj = roleWidthAuthList.value.find(r => r.roleId === roleId);
            return roleObj ? { role: roleId, roleName: roleObj.roleName } : null;
        }).filter(Boolean);
    }
}

onMounted(() => {
    fetchUserList();
    fetchRoleList();
    loading.value = false;
})

watch([() => searchData.nickName, () => searchData.role], () => {
    if (searchData.nickName === '' && searchData.role === 0) {
        userList.value = [...originalUserList.value];
        searchData.dataCount = userList.value.length;
    }
})
</script>