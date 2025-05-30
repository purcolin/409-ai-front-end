<template>
  <div class="login-page-container">
    <!-- Left Section: Branding -->
    <div class="login-branding">
      <div class="branding-content">
          <img src="@/assets/logo.png" alt="Logo" class="branding-logo" />
          <h1 class="branding-title">{{ config.project.name }}</h1>
          <p class="branding-subtitle">连接知识，驱动未来</p>
          <img src="@/assets/login-illustration.svg" alt="Login Illustration" class="branding-illustration" />
      </div>
    </div>

    <!-- Right Section: Login Form -->
    <div class="login-form-section">
      <a-card class="login-card" :bordered="false">
        <!-- Remove card title slot -->
        <div class="login-form-top">
            <img src="@/assets/logo.png" alt="Logo" class="login-form-logo" />
            <h2 class="login-welcome-text">欢迎回来！</h2>
            <p class="login-welcome-subtext">请登录您的账户</p>
        </div>

        <a-form
          name="login"
          autocomplete="off"
          :model="formState"
          @finish="handleLogin"
          layout="vertical"
          class="login-form"
        >
           <!-- Tenant ID Select -->
           <a-form-item
            name="tenantId"
            :rules="[{ required: true, message: '请选择租户!' }]"
          >
             <template #label>
              <span class="form-item-label">租户</span>
            </template>
            <a-select
              placeholder="请选择租户"
              v-model:value="formState.tenantId"
              :options="tenantList"
              :field-names="{
                label: 'name',
                value: 'tenantId'
              }"
              size="large"
            >
             <template #prefix>
                <TeamOutlined /> <!-- Example icon -->
              </template>
            </a-select>
          </a-form-item>

          <!-- Username Input -->
          <a-form-item
            name="username"
            :rules="[{ required: true, message: '请输入用户名!' }]"
          >
            <template #label>
              <span class="form-item-label">用户名</span>
            </template>
            <a-input size="large" v-model:value="formState.username" placeholder="请输入用户名">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <!-- Password Input -->
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
             <template #label>
                <span class="form-item-label">密码</span>
            </template>
            <a-input-password size="large" v-model:value="formState.password" placeholder="请输入密码">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <!-- Forgot Password Link -->
           <a-form-item class="forgot-password-item">
             <a href="#" class="forgot-password-link">忘记密码?</a>
          </a-form-item>

          <!-- Login Button -->
          <a-form-item>
            <a-button size="large" type="primary" html-type="submit" block :loading="loading">
              登 录
            </a-button>
          </a-form-item>

           <!-- Create Account Link -->
           <div class="create-account-section">
             <span>还没有账户? <a href="#" class="create-account-link">立即创建</a></span>
           </div>

        </a-form>
      </a-card>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

import { listTenants } from '@/api/system/tenant'

import { UserOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

import config from '@/config'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const tenantList = ref([])
const formState = reactive({
  tenantId: '',
  username: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  try {
    await userStore.login(formState)
    message.success('登录成功')
    router.push('/')
  } catch (error) {
    console.error(`登录失败: ${error?.response?.data?.message || error.message || '请检查您的凭据或联系管理员'}`)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    const res = await listTenants()
    tenantList.value = res.data || []
    if (tenantList.value.length > 0) {
      formState.tenantId = tenantList.value[0].tenantId
    }
  } catch (error) {
    console.error('获取租户列表失败：' + error.message)
  }
})
</script>

<style scoped>
.login-page-container {
  display: flex;
  min-height: 100vh;
  background-color: #f7f8fa; /* Light grey background like reference */
}

/* Left Branding Section */
.login-branding {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  /* Slightly off-white/blueish background for the branding area */
  background-color: #ffffff;
  /* Reference has a subtle gradient, could add later */
  /* background: linear-gradient(135deg, #eef2f7 0%, #ffffff 100%); */
}

.branding-content {
    text-align: left;
    max-width: 450px;
}

.branding-logo {
    height: 40px; /* Adjust size as needed */
    margin-bottom: 20px;
}

.branding-title {
  font-size: 32px;
  font-weight: 600;
  color: #1d2a39; /* Darker text */
  margin-bottom: 10px;
}

.branding-subtitle {
  font-size: 16px;
  color: #5a6a7b; /* Grey text */
  margin-bottom: 40px;
}

.branding-illustration {
  display: block;
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}

/* Right Login Form Section */
.login-form-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px; /* Add some horizontal padding */
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 30px 40px; /* Increased padding */
  background: #ffffff;
  border-radius: 12px; /* More rounded corners */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08); /* Softer shadow */
  border: none; /* Remove default border */
}

.login-form-top {
    text-align: center;
    margin-bottom: 30px;
}

.login-form-logo {
    height: 50px; /* Adjust size */
    margin-bottom: 15px;
}

.login-welcome-text {
    font-size: 20px;
    font-weight: 600;
    color: #1d2a39;
    margin-bottom: 5px;
}

.login-welcome-subtext {
    font-size: 14px;
    color: #5a6a7b;
}

.login-form {
  /* Styles for the form itself if needed */
}

.form-item-label {
    font-size: 13px;
    color: #36414f; /* Slightly darker label */
    font-weight: 500;
}

/* --- Ant Design Component Overrides --- */

:deep(.ant-select-selector),
:deep(.ant-input-affix-wrapper) /* Targets both input and input-password */
 {
  background-color: #f7f8fa !important; /* Light input background */
  border: 1px solid #e1e5ea !important; /* Subtle border */
  border-radius: 8px !important;
  padding-top: 4px !important; /* Adjust vertical alignment */
  padding-bottom: 4px !important;
}

:deep(.ant-input) {
    background-color: transparent !important; /* Make inner input transparent */
    color: #1d2a39 !important;
}

:deep(.ant-select-selection-placeholder),
:deep(.ant-input::placeholder) {
  color: #9aa5b3 !important; /* Placeholder color */
}

:deep(.ant-input-prefix .anticon),
:deep(.ant-select-arrow .anticon) {
  color: #7b8a9a !important; /* Icon color */
}

/* Remove focus outline and use border color */
:deep(.ant-select-focused .ant-select-selector),
:deep(.ant-select:hover .ant-select-selector),
:deep(.ant-input-affix-wrapper-focused),
:deep(.ant-input-affix-wrapper:hover) {
  border-color: #4f46e5 !important; /* Use primary color for focus/hover */
  box-shadow: none !important;
}

:deep(.ant-form-item) {
  margin-bottom: 18px; /* Adjust spacing */
}

/* Align forgot password link to the right */
.forgot-password-item {
    margin-bottom: 15px; /* Space before button */
}
.forgot-password-item :deep(.ant-form-item-control-input-content) {
    text-align: right;
}

.forgot-password-link {
    font-size: 13px;
    color: #4f46e5; /* Primary color */
    text-decoration: none;
}
.forgot-password-link:hover {
    text-decoration: underline;
}

:deep(.ant-btn-primary) {
  border-radius: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 44px; /* Make button taller */
  font-size: 15px;
  background-color: #4f46e5; /* Primary blue */
  border-color: #4f46e5;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
  transition: all 0.3s ease;
}

:deep(.ant-btn-primary:hover) {
  background-color: #4338ca; /* Darker blue on hover */
  border-color: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.4);
}

.create-account-section {
    text-align: center;
    margin-top: 25px;
    font-size: 14px;
    color: #5a6a7b;
}

.create-account-link {
    color: #4f46e5; /* Primary color */
    font-weight: 500;
    text-decoration: none;
}
.create-account-link:hover {
    text-decoration: underline;
}

/* Remove default card header/body padding and borders */
:deep(.ant-card-head) {
  display: none; /* Hide the default header */
}
:deep(.ant-card-body) {
    padding: 0 !important; /* Handled by card's main padding */
}

/* Responsive Design */
@media (max-width: 992px) { /* Adjust breakpoint if needed */
  .login-branding {
    display: none; /* Hide branding section on smaller screens */
  }

  .login-form-section {
    flex: 1; /* Take full width */
    padding: 30px 15px;
  }

  .login-card {
    max-width: 420px; /* Allow card to be a bit wider */
    padding: 25px 30px; /* Adjust padding */
     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); /* Lighter shadow on mobile */
  }
}

@media (max-width: 480px) {
    .login-card {
        padding: 20px 25px;
    }
     .login-welcome-text {
        font-size: 18px;
    }
    :deep(.ant-btn-primary) {
        height: 40px;
        font-size: 14px;
    }
}
</style>