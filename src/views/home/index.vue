<template>
    <div class="wrap-content">

        <el-form :inline="true" class="flex gap-x-4 justify-end" :model="searchData">
            <el-form-item label="项目名称">
                <el-input v-model="searchData.title" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目详情">
                <el-input v-model="searchData.introduce" placeholder="请输入项目详情"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table
        :data="dataList"
        stripe
        highlight-current-row
        :header-cell-style = "{'text-align':'center'}"
        :cell-style = "{'text-align':'center'}"
        border
        style="width: 100%"
        v-loading="loading"
        >
            <!-- 第一列 -->
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="title" label="名称" width="180"></el-table-column>
            <el-table-column prop="introduce" label="详情"></el-table-column>
        </el-table>

        <!-- 分页 -->
        <Pagination
        :total="searchData.dataCount"
        v-model:page="searchData.currentPage"
        v-model:limit="searchData.pageSize"
        @pagination="handlePagination"
        >
        </Pagination>


    </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'
import { getProjectList } from '@/api/user/project'
import Pagination from '@/components/Pagination.vue'

const loading = ref(true)
let projectList = ref([])

let searchData = reactive({
    title:'',
    introduce:'',
    currentPage: 1, // 当前页
    dataCount: 0, // 总共多少条记录
    pageSize:5 // 每一页显示多少条数据
})


//计算第一页显示的数据
let dataList = computed(() => {
    return projectList.value.slice((searchData.currentPage - 1) * searchData.pageSize,
     searchData.currentPage * searchData.pageSize)
})

const handlePagination = ({ page, limit }) => {
    searchData.currentPage = page
    searchData.pageSize = limit
}

const fetchData = () => {
     getProjectList().then((res) => {
        searchData.dataCount = res.data.length
        projectList.value = res.data
    })
}

onMounted(() => {
    fetchData()
    loading.value = false
})

const onSearch = () => {
    let res = [];
    if (searchData.title || searchData.introduce) {
        if (searchData.title) {
            res = projectList.value.filter((item) => {
                return item.title.indexOf(searchData.title) > -1
            });
        }
         if (searchData.introduce) {
            res = projectList.value.filter((item) => {
                return item.introduce.indexOf(searchData.introduce) > -1
            });
        }
    } else {
        res = projectList.value;
    }
    projectList.value = res;
    searchData.currentPage = 1;
    searchData.dataCount = projectList.value.length;
}

watch(
    [() => searchData.title, () => searchData.introduce],
    () => {fetchData();}
)
</script>