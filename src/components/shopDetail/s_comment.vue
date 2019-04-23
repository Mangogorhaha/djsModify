<template>
  <section>
    <el-col :span="24" class="dialog_title">店铺评论列表</el-col>
    <el-radio-group v-model="radio" @change="changeLabel(radio)">
			<el-radio label="1">差评（{{dataList.count_negative_cmt}}）</el-radio>
			<el-radio label="2">一般（{{dataList.count_medium_cmt}}）</el-radio>
			<el-radio label="3">好评（{{dataList.count_good_cmt}}）</el-radio>
		</el-radio-group>
    <el-table :data="tableList.slice((page-1)*item,page*item)" border highlight-current-row max-height="560">
      <el-table-column prop="tme_cmt" key="0" label="评论日期" min-width="100">
      </el-table-column>
      <el-table-column prop="account_cmt" key="1" label="评论账号" min-width="100">
      </el-table-column>
      <el-table-column prop="text_cmt" key="2" label="评论内容" min-width="300">
      </el-table-column>
      <el-table-column key="3" label="类型" min-width="80">
        {{radio=='1'?'差评':radio=='2'?'中评':'好评'}}
      </el-table-column>
      <el-table-column key="7" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button size="small" @click="showDetail(scope.$index, scope.row)">查看</el-button>
				</template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { ShopComment } from '../../api/api'

export default {
  data() {
    return {
      radio: '1',
      dataList: [],
      tableList: [],
      sideBar: [],
      page: 1,
      item: 20,
      total: 0
    }
  },
  props: {
    shpSqn: {
      type: String
    }
  },
  methods: {
    changeLabel: function(e){
      this.radio = e
    },
    getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "shp_sqn": this.shpSqn,
        "cmt_type": this.radio,
        "page": this.page.toString(),
        "item": this.item.toString()
      };
      ShopComment(param).then(res => {
        if(res.data.result == 0){
          this.dataList = res.data;
          this.sideBar = res.data.count;
          this.tableList = res.data.list;
          this.tableList = res.data.list;
          this.total = parseInt(res.data.total);
          this.$emit('sideBar', this.sideBar)
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    //改变每页显示条数
    handleSizeChange(val) {
      this.item = val
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
.el-radio-group {
  margin: 20px 0;
}
.el-radio {
  width: 150px;
}
</style>
