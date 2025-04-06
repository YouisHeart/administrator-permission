<template>
    <div class="pagination-container">
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        layout="total,sizes,prev, pager, next" 
        :total="total" 
        size="default"
        @current-change="handleCurrentChange" 
        @size-change="handleSizeChange"
        :page-sizes="pageSizes"
         >
        </el-pagination>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    total: {
        type: Number,
        default: 0
    },
    page: {
        type: Number,
        default: 1
    },
    limit: {  // Add this prop since you're using it in pageSize computed property
        type: Number,
        default: 10
    },
    pageSizes: {
        type: Array,
        default() {
            return [5, 10, 15, 20]
        }
    },
    layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
    },
    size: {
        type: String,
        default:'small'
    }
})

const emit = defineEmits(['update:page', 'update:limit', 'pagination'])


const currentPage = ref(props.page)
const pageSize = ref(props.limit)

watch([() => props.page,() => props.limit], ([newPage,newLimit]) => {
    currentPage.value = newPage;
    pageSize.value = newLimit;
})


const handleCurrentChange = (val) => {
    emit('update:page', val)
    emit('pagination', { page: val, limit: pageSize.value })
}

const handleSizeChange = (val) => {
    emit('update:limit', val)
    emit('pagination', { page: currentPage.value, limit: val })
}
</script>