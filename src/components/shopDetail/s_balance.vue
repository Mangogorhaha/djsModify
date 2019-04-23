<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="12">提现明细列表</el-col>
      <el-col :span="6">累计提现金额：{{dataList.accumulate_amount_withdraw}}</el-col>
      <el-col :span="6">可提现余额：<span class="FF3300">{{dataList.amount_can_withdraw}}</span></el-col>
    </el-row>
    <el-table :data="tableList.slice((page-1)*item,page*item)" border highlight-current-row max-height="560">
      <el-table-column prop="tme_withdraw" key="0" label="提现时间" min-width="110">
      </el-table-column>
      <el-table-column prop="amount_withdraw" key="1" label="提现金额" min-width="80">
      </el-table-column>
      <el-table-column prop="account_balance" key="2" label="账户余额" min-width="80">
      </el-table-column>
      <el-table-column prop="type_withdraw" key="3" label="提现方式" min-width="80">
      </el-table-column>
      <el-table-column prop="remark" key="4" label="备注" min-width="160">
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
import { ShopBalance } from '../../api/api'

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
        "page": this.page.toString(),
        "item": this.item.toString()
      };
      ShopBalance(param).then(res => {
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
