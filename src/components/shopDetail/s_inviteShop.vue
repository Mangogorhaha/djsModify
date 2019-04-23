<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="12">邀请店铺列表</el-col>
      <el-col :span="6">数量：<span class="FF6600">{{dataList.count_ivt}}</span></el-col>
      <el-col :span="6">获取Token奖励总额：{{dataList.amount_token_award}}</el-col>
    </el-row>
    <el-table :data="tableList.slice((page-1)*item,page*item)" border highlight-current-row max-height="560" @selection-change="selsChange">
      <el-table-column prop="tme_register" key="0" label="注册日期" min-width="140">
      </el-table-column>
      <el-table-column prop="shp_sqn" key="1" label="店铺编号" min-width="140">
      </el-table-column>
      <el-table-column prop="shp_phone" key="2" label="手机账号" min-width="140">
      </el-table-column>
      <el-table-column prop="shp_name" key="3" label="店铺名称" min-width="140">
      </el-table-column>
      <el-table-column prop="shp_status" key="4" label="店铺wozhi状态" min-width="140">
      </el-table-column>
      <el-table-column prop="token_award" key="5" label="token奖励" min-width="140">
      </el-table-column>
    </el-table>

    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="20" :page-sizes="[20,50,100]" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  </section>
</template>

<script>
import { ShopInvite } from '../../api/api'

export default {
  data() {
    return {
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
    getList: function(){
      let param = {
        "cnckey": this.$store.state.user.userInfo.cnckey,
        "shp_sqn": this.shpSqn,
        "ivt_type": "1",
        "page": this.page.toString(),
        "item": this.item.toString()
      };
      ShopInvite(param).then(res => {
        if(res.data.result == 0){
          this.dataList = res.data;
          this.sideBar = res.data.count;
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
</style>
