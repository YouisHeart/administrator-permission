<template>
  <div class="flex justify-center items-center h-full w-screen bg-mygreen-400">
    <div class="flex justify-center items-center bg-white rounded-2xl overflow-hidden" style="width: 800px; height: 500px;">
      <!-- 左侧图片 -->
      <div class="flex-1 h-full overflow-hidden">
        <img src="@/assets/images/register.jpg" class="h-full w-full object-cover" />
      </div>

      <!-- 右侧表单 -->
      <div class="flex-1 flex h-full justify-center items-center">
        <el-form
          ref="registerForm"
          :model="userInfo"
          :rules="rules"
          class="w-70 space-y-3"
        >
          <div class="text-xl font-bold text-center">欢迎注册后台管理系统</div>

          <el-form-item prop="username">
            <el-input v-model.trim="userInfo.username" :prefix-icon="User" placeholder="请输入账号"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model.trim="userInfo.password" :prefix-icon="Lock" placeholder="请输入密码" show-password></el-input>
          </el-form-item>

          <el-form-item prop="confirmPass">
              <el-input v-model.trim="userInfo.confirmPass" class="flex-1" :prefix-icon="CircleCheck" placeholder="请确认密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button color="#42b883" class="w-full" style="color: white;" @click="useRegister">
                <span>注册</span>
            </el-button>
          </el-form-item>

          <div class="flex justify-between text-sm text-gray-600">
            <div>已有账号？请<span class="text-mygreen-400 cursor-pointer" @click="router.push('/login')">登录</span></div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { userRegister } from '@/api/user/user'
import { User, Lock, CircleCheck } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()

const registerForm = ref(null)

const userInfo = reactive({
  username: '',
  password: '',
  confirmPass: ''
})

const validatePassword = (rule, confirmPass, callback) => { 
  if (confirmPass === '') {
    callback(new Error('请确认密码'))
  } else if (confirmPass !== userInfo.password) { 
    callback(new Error('两次输入密码不一致'))
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
  confirmPass:[
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ]
})

// 注册函数
const useRegister = async () => {
  if (!registerForm.value) return

  await registerForm.value.validate(async (valid) => {
    if (!valid) return
    try {
      const res = await userRegister(userInfo)
      if (res.status === 200 || res.status === '200') {
        ElMessage.success('注册成功')
        router.push('/login')
      } else {
        ElMessage.error(res.message  || '注册失败')
      }
    } catch (err) {
      console.log(err);
       ElMessage.error('注册失败')
    } 
  })
}

</script>


