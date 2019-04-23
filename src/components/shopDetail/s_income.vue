<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="8">营业收入明细列表</el-col>
      <el-col :span="6">获取Token奖励总额：{{dataList.accumulate_amount_token}}</el-col>
      <el-col :span="6">已消费优惠券：{{dataList.count_coupon_consumed}}</el-col>
      <el-col :span="4">累计营业收入：<span class="FF3300">{{dataList.accumulate_amount_income}}</span></el-col>
    </el-row>
    <el-table :data="tableList.slice((page-1)*item,page*item)" border highlight-current-row max-height="560">
      <el-table-column prop="tme_consume" key="0" label="消费时间" min-width="140">
      </el-table-column>
      <el-table-column prop="coupon_number" key="1" label="优惠券编码" min-width="140">
      </el-table-column>
      <el-table-column prop="coupon_name" key="2" label="优惠券名称" min-width="140">
      </el-table-column>
      <el-table-column prop="pay_price" key="3" label="消费金额" min-width="140">
      </el-table-column>
      <el-table-column prop="user_account" key="4" label="用户账号" min-width="140">
      </el-table-column>
      <el-table-column prop="token_price" key="5" label="token奖励" min-width="140">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { ShopIncome } from '../../api/api'

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
      ShopIncome(param).then(res => {
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
