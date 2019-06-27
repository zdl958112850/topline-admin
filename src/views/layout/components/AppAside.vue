<template>
  <div class="left">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      router
      @close="handleClose"
    >
      <el-menu-item index="/">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/articles"><i class="el-icon-service"></i>发布文章</el-menu-item>
          <el-menu-item index="/"><i class="el-icon-printer"></i>内容列表</el-menu-item>
          <el-menu-item index="/"><i class="el-icon-more-outline"></i>评论列表</el-menu-item>
          <el-menu-item index="1-4"><i class="el-icon-news"></i>素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><i class="el-icon-message"></i>图文数据</el-menu-item>
          <el-menu-item index="2-2"><i class="el-icon-d-caret"></i>粉丝概况</el-menu-item>
          <el-menu-item index="2-3"><i class="el-icon-circle-check"></i>粉丝画像</el-menu-item>
          <el-menu-item index="2-4"><i class="el-icon-info"></i>粉丝列表</el-menu-item>
          <el-menu-item index="2-4"><i class="el-icon-question"></i>账户设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">账户设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};

/**
 * 基于极验的验证码验证
 * 1. 调用接口, 将手机号码携带着去请求极验的验证接口
 * 2. 极验收到信息, 确认手机号码无误后, 给用户返回一些参数, 表示人机验证成功
 * 3. 然后用户才可以通过这些参数去请求发送
 */
</script>

<style lang="less" scoped>

.el-menu-vertical-demo, .el-menu {
  background-color: #515b63;
}
</style>
