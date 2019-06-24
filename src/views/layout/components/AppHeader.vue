<template>
  <el-row >
    <el-col :span="12">
      <i class="el-icon-tickets"></i>&nbsp;
      江苏传智播客教育科技股份有限公司
    </el-col>
    <el-col :span="5">
      <el-input
        placeholder="请输入内容"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
    <el-col :span="5">
      <img src="" alt="">
      <el-dropdown>
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户设置</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col :span="2">
      {{mobileNum}}
    </el-col>
  </el-row>
</template>

<script>
export default {
  created () {
    this.mobileNum = window.sessionStorage.getItem('mobileNum');
  },
  data () {
    return {
      mobileNum: '请先登录'
    };
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
el-row {
  line-height: 1.4;
}
.el-input__inner {
    width: 100px;   // 为什么我不能写在单独的组件里面呢???? 在组件里面使用
}
</style>
