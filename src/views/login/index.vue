<template>
  <div class="flex justify-center items-center h-full w-screen bg-mygreen-400">
    <div class="flex justify-center items-center bg-white rounded-2xl overflow-hidden" style="width: 800px; height: 500px;">
      <!-- 左侧图片 -->
      <div class="flex-1 h-full overflow-hidden">
        <img src="@/assets/images/pexels-athena-1586795.jpg" class="h-full w-full object-cover" loading="lazy" decoding="async" />
      </div>

      <!-- 右侧表单 -->
      <div class="flex-1 flex h-full justify-center items-center">
        <el-form
          ref="loginForm"
          :model="userInfo"
          :rules="rules"
          class="w-70 space-y-3"
        >
          <div class="text-xl font-bold text-center">欢迎登录后台管理系统</div>

          <el-form-item prop="username">
            <el-input v-model.trim="userInfo.username" :prefix-icon="User" placeholder="请输入账号"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model.trim="userInfo.password" :prefix-icon="Lock" placeholder="请输入密码" show-password></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <div class="flex w-full gap-2">
              <el-input v-model.trim="userInfo.code" class="flex-1" :prefix-icon="CircleCheck" placeholder="验证码"></el-input>
              <div class="h-9 w-20">
                <valid-code ref="validCodeRef" @update:value="getCode" />
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
             color="#42b883" 
             class="w-full"
             style="color: white;" 
             :loading="loading"
             :disabled="loading"
             @click="userLogin(userInfo)"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中</span>
            </el-button>
          </el-form-item>

          <div class="flex justify-between text-sm text-gray-600">
            <div>还没有账号？请<span class="text-mygreen-400 cursor-pointer" @click="$router.push('/register')">注册</span></div>
            <div><span class="text-mygreen-400 cursor-pointer">忘记密码</span></div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/module/user'
import { User, Lock, CircleCheck } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ValidCode from './VaildCode.vue'

const router = useRouter()
const userStore = useUserStore()

const loginForm = ref(null)
const loading = ref(false)

const validCode = ref('') // 验证码组件传递的真实验证码

const userInfo = reactive({
  username: '',
  password: '',
  code: ''
})

// 添加刷新验证码的方法
const validCodeRef = ref(null)
const refreshValidCode = () => {
    validCodeRef.value?.refreshCode()
}

// 验证码组件回调
const getCode = (code) => {
    validCode.value = code.toLowerCase();
}


// 验证码自定义校验
const validateCode = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入验证码'))
    } else if (value.toLowerCase() !== validCode.value.trim().toLowerCase()) {
        refreshValidCode()
        callback(new Error('验证码错误'))
    } else {
        callback()
    }
}

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
    code: [
    {required:true,message:'请输入验证码',trigger:'blur'},
    { validator:validateCode,trigger:'blur' }
  ]
})

// 登录函数
const userLogin = async () => {
  if (!loginForm.value) return

  await loginForm.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      const success = await userStore.storeUserLogin(userInfo)
      if (success) {
        ElMessage.success('登录成功')
        router.push('/')
      }
    } catch (err) {
        refreshValidCode()
      ElMessage.error(err?.message || '登录失败')
    } finally{
      loading.value = false
    }
  })
}

</script>


