<template>
<div>
  <el-card class="filter-card">
    <div slot="header" class="clearfix">
      <span>全部图文</span>
    </div>
    <div class="block">
      <span>文章状态: </span>
    </div>
    <span>频道列表: &nbsp; &nbsp;</span>
    <el-select class="pindao" v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div class="block">
      <span class="demonstration">时间选择:&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <el-date-picker
        v-model="value6"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
  </el-card>

  <el-card v-loading="isLoading" class="list-box">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="封面"
        width="180">
        <!-- <template slot-scope="scope">
          <img :src="scope.row.cover.images[0]">
        </template> -->
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click="handleDelete(scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-pagination
    background
    layout="prev, pager, next"
    :total="100"
    :disabled="isLoading"
    @current-change="handleCurrent"
  >
  </el-pagination>

</div>
</template>

<script>
export default {
  name: 'article',
  data () {
    return {
      pickerOptions3: {
        shortcuts: [{
          text: '本月',
          onClick (picker) {
            picker.$emit('pick', [new Date(), new Date()]);
          }
        }, {
          text: '今年至今',
          onClick (picker) {
            const end = new Date();
            const start = new Date(new Date().getFullYear(), 0);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近六个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 6);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value6: '',
      tableData: [],
      value: '',
      isLoading: false,
      page: 1
    };
  },
  created () {
    this.loadingArticle();
  },
  methods: {
    loadingArticle (page = 1) {
      this.isLoading = true; // 这里表示禁用分页组件
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: page
        }
      }).then(res => {
        this.tableData = res.results;
        // console.dir(this.tableData);
        this.isLoading = false;
        this.page = page;
      });
    },
    handleDelete (article) {
      this.$http({
        method: 'DELETE',
        url: `/articles/${article.id}`
      }).then(data => {
        this.$message({
          type: 'success',
          message: '删除成功!'
          // 删除成功后, 加载列表
        });
        this.loadingArticle();
      });
      // console.log(article);
    },

    handleCurrent (page) {
      // console.log(page); // 这里要通过page的页码数, 再发起不同的axios请求
      // 在这里, 当发起请求的时候让该页面loading
      this.loadingArticle(page);
    }
  }
};
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 30px;
}
.list-box {
  margin-bottom: 20px;
}
.block {
  margin-bottom: 20px;
}
.pindao {
  margin-bottom: 20px;
}
.el-table td, .el-table th {
  text-align: center;
}
</style>
