<template>
  <el-container>
    <el-aside width="200px"><AppAside/></el-aside>
    <el-container>
      <el-header><AppHeader/></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/AppAside';
import AppHeader from './components/AppHeader';
export default {
  name: 'layout',
  components: {
    AppAside,
    AppHeader
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  // background-color: #ccc;
}
.el-aside {
  background-color: #515b63;
}
.el-header {
  background-color: #ccc;
}
.el-main {
  background-color: rgb(221, 221, 221);
}
// .el-input__inner {
//     width: 100px;   // 为什么我不能写在单独的组件里面呢???? 在组件里面使用
// }
</style>
