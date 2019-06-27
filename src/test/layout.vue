<template>
  <div class="test">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header><topHeader></topHeader></el-header>
        <el-main><router-view/></el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import topHeader from '@/test/top';
export default {
  data () {
    return {

    };
  },
  components: {
    topHeader
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
</style>
