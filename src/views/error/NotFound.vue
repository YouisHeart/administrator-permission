<template>
  <div class="not-found">
    <h1>404 - 页面未找到</h1>
    <p>抱歉，您请求的页面不存在或已删除。</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}

.not-found h1 {
  font-size: 3em;
  color: #e74c3c;
}

.not-found p {
  font-size: 1.5em;
}
</style>
